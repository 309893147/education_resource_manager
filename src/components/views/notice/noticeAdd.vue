<template>
    <div>
        <div class="container m-b-25">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">添加公告</div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm m-b-30">
                <div class="padding_20 m-b-20">
                    <el-form-item prop="name" class="w-100">
                        <div class="label">标题</div>
                        <el-input v-model="ruleForm.title" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item class="w-100">
                        <div class="label">内容</div>
                        <el-input v-model="ruleForm.content" placeholder="请输入公告内容"></el-input>
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
                title: '',
                content: '',
            },
            value: '',
            //  规则
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入', trigger: 'blur' }],
            }
        };
    },
    methods: {

        // 新增保存
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ax.post('notice', this.ruleForm).then(res => {
                        this.$message.success('保存成功');
                        this.ruleForm = {
                            title: '',
                            content: ''
                        };
                        bus.$emit('add_notice', res);
                        bus.$emit('close', this.$route.path);
                        this.$router.push({
                            path: '/notice/noticeList'
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
