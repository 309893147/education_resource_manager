<template>
    <div>
        <div class="container">
            <div class="padding_20" :style="height">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="后台功能权限" name="first">
                      <managerPermisison :id="managerId" :editMode="true"></managerPermisison>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import managerPermisison from './managerPermission';
// import appPermission from './appPermission';
// import communityPermission from './communityPermission';

export default {
    components: {
        managerPermisison,
    },
    name: 'block',
    data() {
        return {
            activeName: 'first',
            height:'',
            managerId: null,
        };
    },
    created() {
        this.height = this.$height(140)
       if(this.$route.query.managerId){
            this.managerId = this.$route.query.managerId;
       }
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // if(columnIndex==0 && rowIndex % 2 === 0){
            //     return {
            //       rowspan: 2,
            //       colspan: 1
            //     };
            // }

            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
};
</script>

<style scoped>
</style>
