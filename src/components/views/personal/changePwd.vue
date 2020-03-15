<template>
    <div class="changePwd">
         <div class="container m-b-25">
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">修改密码</div>
                </div>         
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                        <div class="display_flex between padding_20 m-b-20">
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">用户名</div>
                                <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">*旧登录密码</div>
                                <el-input v-model="ruleForm.name"  show-password placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">新登录密码</div>
                                <el-input v-model="ruleForm.name" show-password placeholder="请输入密码"></el-input>
                            </el-form-item>
                        </div>
                        <div class="display_flex between padding_20 m-b-20">
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">新确认密码</div>
                                <el-input v-model="ruleForm.name" show-password placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">姓名</div>
                                <el-input v-model="ruleForm.name"   placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item  prop="name" class="w-30">
                                <div class="label">电话</div>
                                <el-input v-model="ruleForm.name"  placeholder="请输入电话"></el-input>
                            </el-form-item>
                        </div>
                        <div class="display_flex padding_20 ">
                            <el-form-item  prop="name" class="w-100">
                                <div class="label">邮箱</div>
                                <el-input v-model="ruleForm.name"  placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>    
         </div>
        <div class="display_flex padding_20">
         <div class="back f-s-14 cursor m-r-25" @click="back">返回</div>
         <div v-if="ruleForm.name==''" class="back f-s-14 cursor">保存</div>
         <div v-else class="save f-s-14 cursor" @click="save('ruleForm')">保存</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           ruleForm:{

           },
           rules:{
              name: [
                   { required: true, message: '请输入用户名', trigger: 'blur' },
                //    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
               ],
           },
        };
    },
    created() {
       
    },
    methods: {
 // 返回
        back(){
             this.$router.go(-1);
              this.bus.$emit('close',this.$route.path);
        },
        // 新增保存
        save(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
               this.ax.post('',this.ruleForm)
            .then(res=>{
                   console.log(res)
                    this.$message.success('保存成功');
                    this.ruleForm={
                        
                    }

                     this.bus.$emit('add_organization',res)
                     this.back()
                    

                })
                .catch(res=>{
                  
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
/* .changePwd  */
/* .changePwd  */
</style>
