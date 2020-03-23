<template>
    <div>
        <div class="container m-b-25">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">创建管理员</div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm m-b-30">
                <div class="padding_20 m-b-20">
                    <el-form-item prop="name" class="w-100">
                        <div class="label">昵称</div>
                        <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" class="w-100">
                        <div class="label">用户名</div>
                        <el-input v-model="ruleForm.mobile" placeholder="请输入用户名(建议使用手机号)"></el-input>
                    </el-form-item>
                    <el-form-item class="w-100">
                        <div class="label">密码</div>
                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>

        <div class="display_flex padding_20">
            <div class="back f-s-14 cursor m-r-25">返回</div>
            <div v-if="ruleForm.name==''  || ruleForm.content=='' " class="back f-s-14 cursor">保存</div>
            <div v-else class="save f-s-14 cursor" @click="save('ruleForm')">保存</div>
        </div>
    </div>
</template>

<script>
 import bus from '../../common/bus';
import viewEditor from '../../page/VueEditor';
export default {
    components: {
        viewEditor
    },
    data() {
        return {
            updata: false, //是否修改
            // 参数
            ruleForm: {
                name: '',
                mobile:'',
                password: '',
            },
            value: '',
            //  规则
            rules: {
                mobile: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            }
        };
    },
    methods: {

        // 新增保存
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ax.post('/manager', this.ruleForm).then(res => {
                        this.$message.success('保存成功');
                        this.ruleForm = {
                            name: '',
                            mobile: '',
                            password: ''
                        };
                        // bus.$emit('add_notice', res);
                        bus.$emit('close', this.$route.path);
                        this.$router.push({
                            path: '/Jurisdiction/managerList'
                        });
                    });
                } else {
                    this.$message.error('请根据提示输入');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
</style>
