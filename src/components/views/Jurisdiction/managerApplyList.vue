
<template>
    <div>
        <div class="container">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">管理员申请列表</div>
            </div>
            <List
                :dataUrl="'/manager/apply'"
                @create="jumpCreate"
                @delete="deleteRow"
                ref="list"
                @edit="editRow"
                :actionName="`新增`"
            >
         <template slot="addition-table-actions" slot-scope="scope">
                                  
                               
                                    <el-button
                                        type="text"
                                        class="color_war"
                                        @click="createManager(scope.item.row)"
                                    >创建用户管理员账号</el-button>

                                     <!-- <el-button
                                        type="text"
                                        class="color_war"
                                        @click="resetPwd(scope.item.row)"
                                    >重置密码</el-button> -->
                                </template>
            </List>
        </div>
        <!-- <el-dialog title="编辑" :visible.sync="createDialog" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm m-b-30">
                <div class="padding_20 m-b-20">
                    <el-form-item prop="title" class="w-100">
                        <div class="label">用户名</div>
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名(建议输入手机号)"></el-input>
                    </el-form-item>
                    <el-form-item class="w-100"  prop="content">
                        <div class="label">密码</div>
                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer display_flex">
                <div class="back f-s-14 cursor m-r-25">返回</div>
                <div v-if="ruleForm.name==''  || ruleForm.remark=='' " class="back f-s-14 cursor">修改</div>
                <div v-else class="save f-s-14 cursor" @click="update('ruleForm')">修改</div>
            </span>
        </el-dialog> -->
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
            // 参数
           ruleForm: {
                name: '',
                mobile:'',
                password: '',
            },
            //  规则
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            }
        };
    },
    created() {
    },
    methods: {
   
          jumpEdit(val){
            console.log(val)
            this.$router.push({
                path: '/Jurisdiction/list',
                query: {
                    managerId:val.id,
                }
            });
        },

        createManager(val){
            console.log(val);
              this.ruleForm.name=val.user.nikeName
              this.ruleForm.mobile=val.mobile
              this.ruleForm.password=val.user.password
         let palyload={
      name: val.user.nickName,
                            mobile:val.mobile,
                            password:val.password
         }   
                     console.log(palyload);

         this.ax.post('/manager/user', palyload).then(res => {
                        this.$message.success('保存成功');
                        
                        // bus.$emit('add_notice', res);
                        bus.$emit('close', this.$route.path);
                        this.$router.push({
                            path: '/Jurisdiction/managerList'
                        });
                    });
        },
    }
};
</script>

<style scoped>
</style>
