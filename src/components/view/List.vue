<template>
    <el-container class="bg-white">
        <el-header height="auto" ref="tableHeader">
            <el-row class="bg-white">
                <el-col :span="20" class="table-action flex-row flex-wrap ">
                    <slot name="filters">
                        <template v-if="searchFiled && searchFiled.length">
                            <template v-for="item in searchFiled" class="">
                                <el-select
                                    v-model="filter[item.key]"
                                    :key="item.key"
                                    v-if="item.options && item.options.length"
                                >
                                    <el-option :label="'全部'+item.name" :value="null">全部{{item.name}}</el-option>
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.key"
                                        :value="option.key"
                                        :label="option.name"
                                    ></el-option>
                                </el-select>
                                <el-date-picker
                                    v-else-if="item.type ==='TIMESTAMP'"
                                    :key="item.key"
                                    v-model="filter[item.key]"
                                    value-format="timestamp"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                                <el-input
                                    :placeholder="item.name"
                                    v-model="filter[item.key]"
                                    clearable
                                    :key="item.key"
                                    v-else
                                ></el-input>
                            </template>
                            <slot name="filter"></slot>
                            <el-button type="primary btn_click" @click="search()">查询</el-button>
                        </template>
                    </slot>
                </el-col>
                <el-col :span="4" class="flex-row end table-action" v-if="!disableAction">
                    <slot name="actions">
                        <slot name="addition-actions"></slot>
                        <el-button type="primary" v-if="printable" @click="$emit('print')">打印</el-button>
                        <el-button type="primary" v-if="exportable" @click="$emit('export')">导出</el-button>
                        <el-button
                            type="primary"
                            v-if="insertable"
                            @click="$emit('create')"
                            size='123'
                        >{{actionName?actionName:'创建'}}</el-button>
                    </slot>
                </el-col>
            </el-row>
        </el-header>
        <el-main :style="'height:'+tablePadding+'px;overflow:scroll'">
            <div class="bg-white" style="height:100%">
                <template v-if="tableData">
                    <el-table
                        :data="tableData.content"
                        label="更新"
                        border
                        height="100%"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column label type="selection" v-if="batchAction"></el-table-column>

                        <template v-for="item in tableHeader">

                            <el-table-column
                                align='center'
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-if="item.type==='IMAGE'">

                                <template slot-scope="scope"   align='center'>
                                    <el-image
                                        :src="scope.row[item.key]"
                                        :preview-src-list="[scope.row[item.key]]"
                                        style="width:4rem;height:4rem;"
                                    ></el-image>
                                </template>
                            </el-table-column>

                            <el-table-column
                              align='center'
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else-if="item.type ==='TIMESTAMP'"
                            >
                                <template slot-scope="scope">{{getTimestamp(scope.row[item.key])}}</template>
                            </el-table-column>
                            
                            <el-table-column
                              align='center'
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                sortable
                                v-else
                                 :show-overflow-tooltip='true'
                            >
                                <template slot-scope="scope">
                                    <div :style="'color:'+scope.row.color">{{ scope.row[item.key]  }}</div>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column
                            width='240'
                            align='center'
                            label="操作"
                            v-if="!disableTableAction && tableData && tableData.content"
                        >
                            <template slot-scope="scope">
                                <div class="table-action flex-row flex-wrap flex_center">
                                    <slot name="addition-table-actions" :item="scope"></slot>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        v-if="editable"
                                        @click="$emit('edit',[scope.row])"
                                    >编辑</el-button>
                                    <delete-button
                                        :tip="'是否删除?'"
                                        v-if="deletetable"
                                        :loading="scope.row.loading"
                                        @delete="$emit('delete',[scope.row])"
                                    ></delete-button>
                                </div>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
            </div>
        </el-main>
        <el-footer ref="tableFooter" class="flex-row between flex-center">
            <div style="height:100%;" class="flex-row flex-center">
                <template v-if="selected && selected.length">
                    <el-button type="primary" @click="doBatch('edit')" v-if="batchEditable">编辑</el-button>
                    <el-button type="primary" @click="doBatch('export')" v-if="batchExportable">导出</el-button>
                    <el-button type="primary" @click="doBatch('print')" v-if="batchPrintable">打印</el-button>
                    <el-button type="danger" @click="doBatch('delete')" v-if="batchDeleteable">删除</el-button>
                </template>
            </div>
            <div class="pagination" v-if="tableData">
                <el-pagination
                    background
                    layout="sizes,total, prev, pager, next"
                    :current-page="tableData.number+1"
                    :page-sizes="[20, 50, 80, 100]"
                    :page-size="tableData.size"
                    :total="tableData.totalElements"
                    @size-change="onPageSizeChange"
                    @current-change="onPageChange"
                ></el-pagination>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
import DeleteButton from './DeleteButton';
import moment from 'moment';
import Vue from 'vue';
import { log } from 'util';
import bus from '../common/bus'
export default {
    props: [
        'data',
        'disableFilter',
        'disableAction',
        'disableTableAction',
        'disableTableAction',
        'actionName',
        'metaUrl',
        'tableMeta',
        'dataUrl',
        'disableMeta'
    ],
    components: { DeleteButton },
    data() {
        return {
            publishDialog: false,
            pageTotal: 100,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            updateItem: null,
            pageInfo: { page: 0, size: 20 },
            filter: {},
            metaData: null,
            tablePadding: 0,
            tableData: {},
            selected: []
        };
    },
    watch: {
        data(val){
            this.tableData = val
        },
        tableMeta(val) {
            if (val) {
                this.metaData = val;
            }
        },
        tableData(val) {
            if (val && val.content) {
                this.calcTableHeight();
            }
        }
    },
    created() {
        this.getMetaData();
        this.doSearch();

         if (this.tableMeta) {
                this.metaData = this.tableMeta;
            }

    },
    mounted() {
        this.calcTableHeight();
        window.addEventListener('resize', () => {
            this.calcTableHeight();
        });

        bus.$on('add_'+this.dataUrl,(e)=>{
            // console.log(e)
            this.onAdd(e)
        })
    },
    computed: {
        searchFiled() {
            if (!this.metaData) {
                return [];
            }

            let vm = this;
            return this.metaData.subs
                .filter(it => {
                    return it.searchable;
                })
                .map(it => {
                    Vue.set(vm.filter, it.key, null);
                    return {
                        name: it.name,
                        key: it.key,
                        type: it.type,
                        placeholder: it.name,
                        options: it.searchOption
                    };
                });
        },
        tableHeader() {
            if (!this.metaData) {
                return [];
            }
            return this.metaData.subs.filter(it => {
                return it.displayInList;
            });
        },
        insertable() {
            return this.metaData && this.metaData.insertable;
        },
        deletetable() {
            return this.metaData && (this.metaData.delete == 'DELETE' || this.metaData.delete == 'DELETE_BOTH');
        },
        batchDeleteable() {
            return (
                this.metaData &&
                (this.metaData.delete == 'DELETE_BATCH' ||
                    this.metaData.delete == 'DELETE_BOTH' ||
                    (this.deletetable && this.selected.length == 1))
            );
        },
        editable() {
            return this.metaData && (this.metaData.edit == 'EDIT' || this.metaData.edit == 'EDIT_BOTH');
        },
        batchEditable() {
            return (
                this.metaData &&
                (this.metaData.edit == 'EDIT_BATCH' || this.metaData.edit == 'EDIT_BOTH' || (this.editable && this.selected.length == 1))
            );
        },
        printable() {
            return this.metaData && (this.metaData.print == 'PRINT' || this.metaData.print == 'PRINT_BOTH');
        },
        batchPrintable() {
            return this.metaData && (this.metaData.print == 'PRINT_BATCH' || this.metaData.print == 'PRINT_BOTH');
        },
        exportable() {
            return this.metaData && (this.metaData.export == 'EXPORT' || this.metaData.export == 'EXPORT_BOTH');
        },
        batchExportable() {
            return this.metaData && (this.metaData.export == 'EXPORT_BATCH' || this.metaData.export == 'EXPORT_BOTH');
        },
        batchAction() {
            return this.batchDeleteable || this.batchEditable || this.batchPrintable || this.batchExportable;
        }
    },
    methods: {
        getTimestamp(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
        calcTableHeight() {
            // console.log(this.$refs.tableHeader.$el)
            let height = this.$refs.tableFooter.$el.clientHeight;
            if (this.$refs.tableHeader) {
                height = height + this.getOffsetLeft(this.$refs.tableHeader.$el) + this.$refs.tableHeader.$el.clientHeight + 30;
            }
            this.tablePadding = document.body.clientHeight - height;
        },
        getOffsetLeft(elem) {
            var offsetLeft = 0;
            do {
                if (!isNaN(elem.offsetTop)) {
                    offsetLeft += elem.offsetTop;
                }
            } while ((elem = elem.offsetParent));
            return offsetLeft;
        },
        getMetaData() {
            let vm = this;
            let metaUrl = this.metaUrl;
            if(this.disableMeta){

                return
            }
            if (!metaUrl) {
                metaUrl = this.dataUrl + '/meta';
            }
            this.ax.get(metaUrl).then(it => {
                vm.metaData = it;
                vm.$emit('meta', it);
            });
        },
        search() {
            this.pageInfo.page = 0;
            this.doSearch();
        },
        doSearch() {
            let filter = Object.assign({}, this.filter);
            if (filter.createTime && filter.createTime.length) {
                filter.startTime = filter.createTime[0];
                filter.endTime = filter.createTime[0];
                delete filter.createTime;
            }
            this.getListData({ page: this.pageInfo.page, size: this.pageInfo.size, ...filter });
        },
        onPageSizeChange(e) {
            this.pageInfo.size = e;
            this.doSearch();
        },
        onPageChange(e) {
            this.pageInfo.page = e - 1;
            this.doSearch();
        },
        getListData(item) {
            // console.log(123)
           if(this.dataUrl){
                this.ax.get(this.dataUrl, { params: item }).then(it => {
                    // console.log(it)
                this.tableData = it;


                //   console.log(456)
                this.$emit('data', it);
            });
            return
           }
           this.$emit('filter',item)
           
        },
        handleSelectionChange(e) {
            this.selected = e;
            this.$emit('selected', e);
        },
        doBatch(e, confirm) {
            if (!confirm && 'delete' === e) {
                this.$confirm('', '确认删除？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.doBatch(e, true);
                });
                return;
            }
            this.$emit(e, this.selected);
        },
        onDeleted(e) {
            this.tableData.content = this.tableData.content.filter(it => {
                return (
                    e.filter(item => {
                        return item.id == it.id;
                    }).length == 0
                );
            });
        },
        onAdd(e) {
            this.tableData.content.unshift(e);
        },
        onUpdate(e) {
            this.tableData.content = this.tableData.content.map(it => {
                e.forEach(item => {
                    if (item.id === it.id) {
                        it = item;
                    }
                });
                return it;
            });
        }
    }
};
</script>
<style scoped>
.el-header {
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    padding: 10px 10px 0px 10px;
    min-height: 60px;
}
.el-main {
    padding: 0;
}
.el-footer {
    padding: 0 10px;
}
.btn_click{
    width: 64px;
    height: 38px;
    font-size: 14px;
    box-sizing: border-box;
}

</style>

<style>
.el-input--small .el-input__inner{
        height: 38px !important;    
        line-height: 38px !important;
}
.el-range-editor--small.el-input__inner{
    height: 38px !important;
     line-height: 38px !important;
}
.el-range-editor--small .el-range-separator{
    line-height: 30px !important;
    font-size: 13px;
}
.el-button--123{
    height: 38px;
}
.flex_center{
    align-items: center;
    justify-content: center;
}
</style>