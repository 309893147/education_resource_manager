<template>
    <div>
         <div class="container m-b-25" >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">添加信息</div>
                </div> 
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">

                                <div class="padding_20 m-b-20">
                                    <el-form-item  prop="title"  class='w-100' >
                                        <div class="label">标题</div>
                                        <el-input v-model="ruleForm.title" placeholder="请输入名称"  >
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item   >
                                        <div class="label">封面图片</div>
                                        <div>
                                                <up-load @getImg='getImg'></up-load>
                                        </div>
                                    </el-form-item>

                                   <el-form-item    class='w-100' >
                                        <div class="label">内容</div>
                                        <view-editor  @func="getMsgFormSon"   :parentMsg='ruleForm.content' ></view-editor>
                                    </el-form-item>

                                    <el-form-item    class='w-100' >
                                        <div class="display_flex">
                                            <div class="label m-r-20">是否显示</div>
                                            <el-switch
                                            class="m-b-15"
                                            v-model="ruleForm.joinUse"
                                            active-color="#267FF9"
                                            inactive-color="#ccc">
                                            </el-switch>
                                        </div>
                                    </el-form-item>
                                </div>
                </el-form>
         </div>
  
          <div class="display_flex padding_20" >
                                        <div class="back  f-s-14 cursor m-r-25">返回</div>
                                        <div v-if="ruleForm.title==''  || ruleForm.content==''  || ruleForm.headImg=='' || ruleForm.type==[] " class="back f-s-14 cursor">保存</div>
                                        <div v-else class="save f-s-14 cursor" @click="save('ruleForm')" >保存</div>
         </div>
    </div>
</template>

<script>
import bus from '../../common/bus'
import viewEditor from '../../page/VueEditor'
import upLoad from '../upLoad'
export default {
    components:{
        viewEditor,
        upLoad
    },
    data() {
        return {
            updata:false, //是否修改
            // 参数
         ruleForm:{
            title:'',
            content:'',
            headImg:'',
            joinUse:false,
         },
         value:'',
        //  规则
         rules:{
                        title: [
                          { required: true, message: '请输入名称', trigger: 'blur' },
                        ],
                        content: [
                          { required: true, message: '请输入内容', trigger: 'blur' },
                        ],
                         sort: [
                          { required: true, message: '请输入排序', trigger: 'blur' },
                         { type: 'number', message: '排序必须为数字值'}
                        ],
                         remark: [
                          { required: true, message: '请输入描述', trigger: 'blur' },
                        ],
                                            
                },   
        }
    },
    created() {
        

    },
    mounted(){

    },
    methods: {
         // 获取图片
        getImg(data){
            // console.log(data)
            this.ruleForm.headImg=data
             console.log(123)
        },
        //上传回调
        handleAvatarSuccess(){


        },
        // 上传前
        beforeAvatarUpload(){

        },
        // 获取content
        getMsgFormSon(data){
            this.ruleForm.content=data
        },
        // 新增保存
        save(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
                   this.ax.post('banner',this.ruleForm)
                .then(res=>{
                    this.$message.success('保存成功');
                    this.ruleForm={
                        name:'',
                        type:false,
                        content:''
                    }
                    bus.$emit('banner',res)
                    bus.$emit('close',this.$route.path)
                    this.$router.push({
                        path:'/banner/index'
                    })
                })
          } else {
             this.$message.error('请根据提示输入');
            return false;
          }
          });
       
        },
    }
    };
</script>

<style >
.m-b-0{
    margin-bottom: 0;
}
</style>
