
<template>
    <div>
        <div class="container">
          <div class="top_title display_flex m-b-35">
                <div class="title_info">管理员列表</div>
            </div>
            <List
                :dataUrl="'/manager'"
                @create="jumpCreate"
                @delete="deleteRow"
                ref="list"
                @edit="editRow"
                :actionName="`新增`"
            >
            
                                <!-- <template slot="addition-actions">
                                    <el-button
                                        type="primary"
                                        size="123"
                                        @click="jumpCreate(currentOrganization)"
                                    >新增</el-button>
                                </template> -->

                                <template slot="addition-table-actions" slot-scope="scope">
                                      <el-button
                                        type="text"
                                        @click="jumpEdit(scope.item.row)"
                                    >编辑权限</el-button>
                               
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
                        <div class="label">标题</div>
                        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item class="w-100"  prop="content">
                        <div class="label">内容</div>
                        <el-input v-model="ruleForm.content" placeholder="请输入内容"></el-input>
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
                title: '',
                content: '',
            },
            //  规则
             rules: {
                mobile: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            }
        };
    },
    created() {
    },
    methods: {
   
      // jumpEdit 编辑权限
        jumpEdit(val){
            console.log(val)
            this.$router.push({
                path: '/Jurisdiction/list',
                query: {
                    managerId:val.id,
                }
            });
        },

    }
};
</script>

<style scoped>
</style>
