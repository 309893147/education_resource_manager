<template>
    <div>
        <div class="container m-b-25">
            <div class="top_title display_flex m-b-35">
                <div class="title_info">添加资源</div>
            </div>
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

                    <div class="upload">
                        <div class="label">上传教学资源文件</div>
                        <el-upload
                            class="upload-demo"
                            drag
                            :limit="1"
                            ref="uploader"
                            name="File"
                            :on-success="uploadSuccess"
                            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            action="/manage/upload/"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                        </el-upload>
                    </div>

                    <el-form-item class="w-100"></el-form-item>

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
import upLoad from '../upLoad';

export default {
    components: {
        upLoad
    },
    data() {
        return {
            updata: false, //是否修改
            typeData: '',
            // 参数
            ruleForm: {
                title: '',
                content: '',
                tag: '',
                basicTypeId: '',
                recommend: null,
                status: null,
            },
            value: '',
            //  规则
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                content: [{ required: true, message: '请输入简介', trigger: 'blur' }],
                basicTypeId: [{ required: true, message: '请选择资源类型', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getType();
    },
    mounted() {},
    methods: {
        uploadSuccess(response) {
            if (response.code == 200) {
                this.exceptionList = response.data;
            } else {
                this.$message.error(response.msg);
            }
            this.$refs.uploader.clearFiles();
        },
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
        // 获取content
        getMsgFormSon(data) {
            this.ruleForm.content = data;
        },
        // 新增保存
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ax.post('resource', this.ruleForm).then(res => {
                        this.$message.success('保存成功');
                        this.ruleForm = {
                            title: '',
                            content: '',
                            tag: '',
                            basicTypeId: '',
                            recommend: null,
                            status: null
                        };
                        bus.$emit('add_resource', res);
                        bus.$emit('close', this.$route.path);
                        this.$router.push({
                            path: '/resource/resourceList'
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
