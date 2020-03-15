<template>
    <div>
         <div class="container m-b-25"  :style='height'  >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">{{info.title}}</div>
                </div> 
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">

                                <div class="padding_20 m-b-20">
                                    <el-form-item  prop="communityId"  class='w-100'  v-if="info.haveTitle" >
                                        <div class="label">小区名称 </div>
                                        <!-- <el-input v-model="ruleForm.name" placeholder="请输入名称"  > -->
                                         
                                            <el-select v-model="ruleForm.communityId" filterable  clearable placeholder="请选择名称" class="w-100" >
                                                <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        
                                       
                                    </el-form-item>

                                    <el-form-item  prop="title"  class='w-100' >
                                        <div class="label">标题 </div>
                                        <el-input v-model="ruleForm.title" placeholder="请输入标题"  >
                                          
                                        </el-input>
                                    </el-form-item>

                                     <el-form-item    class='w-100' >
                                        <div class="label">内容</div>
                                        <view-editor  @func="getMsgFormSon" ></view-editor>
                                    </el-form-item>

                                     
                                </div>
                </el-form>
         </div>
  
          <div class="display_flex padding_20" >
                                        <div class="back  f-s-14 cursor m-r-25"  @click="back">返回</div>
                                        <div v-if="ruleForm.title==''  || ruleForm.content=='' " class="back f-s-14 cursor">保存</div>
                                        <div v-else class="save f-s-14 cursor" @click="save('ruleForm')" >保存</div>
         </div>
    </div>
</template>

<script>
import bus from '../common/bus'
import viewEditor from '../page/VueEditor'
export default {
    components:{
        viewEditor
    },
      props:{
        info:{}
    },
    data() {
        return {
            // 高度
            height:'',
            updata:false, //是否修改
            // 参数
         ruleForm:{
            communityId:'',
            content:'',
            title:''
         },
         
         options:[],
        //  规则
         rules:{
                        communityId: [
                          { required: true, message: '请选择名称', trigger: 'blur' },
                        ],
                         sort: [
                          { required: true, message: '请输入排序', trigger: 'blur' },
                         { type: 'number', message: '排序必须为数字值'}
                        ],
                         title: [
                          { required: true, message: '请输入描述', trigger: 'blur' },
                        ],
                                            
                },   
        }
    },
    created() {
        this.height=this.$height()
        this.getAll()
    },
    mounted(){

    },
    methods: {
        // 返回
        back(){
             this.$router.go(-1);
              bus.$emit('close',this.$route.path);
        },
        // 获取全部小区
        getAll(){
            this.ax.get('community')
                .then(res=>{
                    console.log(res)
                    this.options=res
                })
        },
        // 获取content
        getMsgFormSon(data){
            this.ruleForm.content=data
        },
        // 新增保存
        save(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
                   this.ax.post(this.info.addUrl,this.ruleForm)
                .then(res=>{
                    this.$message.success('保存成功');
                    this.ruleForm={
                            communityId:'',
                            content:'',
                            title:''
                    }
                    bus.$emit(`add_${this.info.addUrl}`,res)
                    bus.$emit('close',this.$route.path)
                    this.$router.push({
                        path:this.info.back
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

<style scoped>

</style>

