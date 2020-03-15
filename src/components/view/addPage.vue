<template>
    <div>
        <div class="container m-b-25">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">{{info.name}}</div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm m-b-30">
                <div class="padding_20 m-b-20">
                    <el-form-item prop="name" class="w-100">
                        <div class="label">名称</div>
                        <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>

                    <el-form-item prop="sort" class="w-100" v-if="info.sore">
                        <div class="label">排序</div>
                        <el-input v-model.number="ruleForm.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="label">图片</div>
                        <div>
                            <up-load @getImg="getImg"></up-load>
                        </div>
                    </el-form-item>

                    <!-- <el-form-item  prop="remark"  class='w-100'  v-if="!info.VueEditor">
                                        <div class="label">描述</div>
                                        <el-input v-model="ruleForm.remark"  type='textarea'  :rows="5" placeholder="请输入描述"></el-input>
                                    </el-form-item>
                                     <el-form-item  prop="remark"  class='w-100'  v-else>
                                        <div class="label">内容</div>
                                        <view-editor  @func="getMsgFormSon" ></view-editor>
                    </el-form-item>-->
                </div>
            </el-form>
        </div>

        <div class="display_flex padding_20">
            <div class="back f-s-14 cursor m-r-25" @click="back">返回</div>
            <div v-if="ruleForm.name==''  || ruleForm.remark=='' " class="back f-s-14 cursor">保存</div>
            <div v-else class="save f-s-14 cursor" @click="save('ruleForm')">保存</div>
        </div>
    </div>
</template>

<script>
import bus from '../common/bus';
import viewEditor from '../page/VueEditor';
import upLoad from '../views/upLoad';
export default {
    components: {
        viewEditor,
        upLoad
    },
    props: {
        info: {}
    },
    data() {
        return {
            updata: false, //是否修改
            // 参数
            ruleForm: {
                name: '',
                sort: '',
                headImg: '',
                type: this.info.type
            },
            //  规则
            rules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    { type: 'number', message: '排序必须为数字值' }
                ],
                headImg: [{ required: true, message: '请添加图片', trigger: 'blur' }]
            }
        };
    },
    created() {
        console.log(this.info);
    },
    mounted() {
        // 是否传参是否新增
        if (this.$route.query.params) {
            // console.log
            this.updata = true;
            let data = JSON.parse(this.$route.query.params)[0];
            console.log(data);
            this.ruleForm.name = data.name;
            this.ruleForm.sort = data.sort;
            this.ruleForm.headImg = data.headImg;
        } else {
            this.ruleForm = {
                name: '',
                sort: '',
                headImg: '',
                type: this.info.type
            };
        }
    },
    methods: {
        // 获取图片
        getImg(data) {
            // console.log(data)
            this.ruleForm.headImg = data;
            // console.log(123)
        },
        //上传回调
        handleAvatarSuccess() {},
        // 上传前
        beforeAvatarUpload() {},
        // 返回
        back() {
            this.$router.go(-1);
            bus.$emit('close', this.$route.path);
        },

        // 获取content
        getMsgFormSon(data) {
            console.log(data);
            this.ruleForm.headImg = data;
        },
        // 新增保存
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ax.post(this.info.addUrl, this.ruleForm).then(res => {
                        this.$message.success('保存成功');
                        this.ruleForm = {
                            name: '',
                            sort: '',
                            headImg: '',
                            type: this.info.type
                        };
                        bus.$emit('add_' + this.info.addUrl, res);
                        bus.$emit('close', this.$route.path);
                        this.$router.push({
                            path: this.info.back
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
