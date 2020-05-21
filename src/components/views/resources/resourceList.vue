
<template>
    <div>
        <div class="container">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">教育资源</div>
            </div>
            <List
                :dataUrl="'resource'"
                @create="jumpCreate"
                @delete="deleteRow"
                ref="list"
                @edit="editRow"
                @data="dataList"
                :actionName="`新增`"
            ></List>
        </div>
        <el-dialog title="编辑" :visible.sync="createDialog" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm m-b-30">
                <div class="padding_20 m-b-20">
                    <el-form-item prop="title" class="w-100">
                        <div class="label">标题</div>
                        <el-input v-model="ruleForm.title" placeholder="请输入名称"></el-input>
                    </el-form-item>

                    <el-form-item class="w-100" prop="content">
                        <div class="label">简介</div>
                        <el-input
                            v-model="ruleForm.content"
                            :rows="5"
                            placeholder="请输入名称"
                            type="textarea"
                        ></el-input>
                    </el-form-item>

                    <el-form-item class="w-100">
                        <div class="label">类型</div>
                        <template>
                            <el-select v-model="ruleForm.basicTypeId" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in typeData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <!-- <el-form-item class="w-100">
                        <div class="label">内容</div>
                        <view-editor @func="getMsgFormSon"></view-editor>
                    </el-form-item>-->

                    <el-form-item prop="tag" class="w-100">
                        <div class="label">标签</div>
                        <el-input v-model="ruleForm.tag" placeholder="请输入标签"></el-input>
                    </el-form-item>

                    <el-form-item class="w-100">
                        <div class="display_flex">
                            <div class="label m-r-20">是否显示</div>
                            <el-switch
                                class="m-b-15"
                                v-model="ruleForm.status"
                                active-color="#267FF9"
                                inactive-color="#ccc"
                            ></el-switch>
                        </div>
                    </el-form-item>

                    <!-- <el-form-item class="w-100">
                        <div class="display_flex">
                            <div class="label m-r-20">是否加入banner</div>
                            <el-switch
                                class="m-b-15"
                                v-model="ruleForm.joinBanner"
                                active-color="#267FF9"
                                inactive-color="#ccc"
                            ></el-switch>
                        </div>
                    </el-form-item>-->

                    <el-form-item class="w-100">
                        <div class="display_flex">
                            <div class="label m-r-20">是否推荐</div>
                            <el-switch
                                class="m-b-15"
                                v-model="ruleForm.recommend"
                                active-color="#267FF9"
                                inactive-color="#ccc"
                            ></el-switch>
                        </div>
                    </el-form-item>

                    <el-form-item class="w-100">
                        <div class="label">审核</div>
                        <template>
                            <el-select
                                v-model="ruleForm.resourceStatus"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer display_flex">
                <div class="back f-s-14 cursor m-r-25">返回</div>
                <div v-if="ruleForm.name==''  || ruleForm.remark=='' " class="back f-s-14 cursor">修改</div>
                <div v-else class="save f-s-14 cursor" @click="update('ruleForm')">修改</div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import List from '../../view/List';
import viewEditor from '../../page/VueEditor';
export default {
    components: {
        List,
        viewEditor
    },

    data() {
        return {
            //弹框
            createDialog: false,
            reviewDialog: false,
            typeData: '',
            options: [
                {
                    value: 'PASS',
                    label: '通过'
                },
                {
                    value: 'NOPASS',
                    label: '未通过'
                }
            ],
            // 参数
            ruleForm: {
                name: '',
                content: '',
                type: false
            },
            //  规则
            rules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getType();
    },

    //  computed: {
    //     filters() {
    //         return [
    //             {
    //                 key: 'status',
    //                 name: '状态',
    //                 type: 'text',
    //                 searchOption: [
    //                     { key: 'PASS', name: '下架' },
    //                     { key: 'NOPASS', name: '缺货' }
    //                 ]
    //             },
    //             {
    //                 key: 'name',
    //                 name: '商品名称',
    //                 searchOption: { key: 'name' }
    //             }
    //         ];
    //     }
    // },
    methods: {
        getType() {
            let vm = this;
            this.ax
                .get('type/resource')
                .then(res => {
                    console.log(res);
                    vm.typeData = res.content;
                })
                .catch(err => {
                    console.log(err); // 这里catch到错误timeout
                });
        },

        dataList(val) {
            val.content.map(it => {
                it.recommend = it.recommend == true ? '是' : '否';
                it.resourceStatus = it.resourceStatus == 'NOPASS' ? '未通过' : it.resourceStatus == 'PASS' ? '已通过' : '未通过';
                if(it.basicType){
                it.basicType = it.basicType.name;

                }
            });
        },
        // 获取content
        getMsgFormSon(data) {
            this.ruleForm.content = data;
        },
        // 跳转
        jumpCreate() {
            this.$router.push({
                path: 'resourceAdd'
            });
        },
        // 删除
        deleteRow(val) {
            this.startLoading();
            this.ax
                .delete(
                    `resource?ids=` +
                        val
                            .map(it => {
                                return it.id;
                            })
                            .join(',')
                )
                .then(it => {
                    this.stopLoading();
                    this.$refs.list.onDeleted(val);
                })
                .catch(it => {
                    this.stopLoading();
                    console.log(it);
                });
        },
        // 修改
        editRow(val) {
            console.log(val);
            this.createDialog = true;
            this.ruleForm = val[0];
        },
        update() {
            this.createDialog = true;
            this.ruleForm.basicType = null;
            this.ax.post(`resource/review`, this.ruleForm).then(it => {
                this.$message.success('保存成功');
                this.createDialog = false;
                this.$refs.list.onUpdate([it]);
                this.ruleForm = {};

                this.createDialog = false;
            });
        }
    }
};
</script>

<style scoped>
</style>
