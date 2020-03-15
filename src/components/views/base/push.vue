<template>
    <div class="push">
        <div class="container m-b-25" :style="height">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 1 -->
                <el-tab-pane label="抢单时现" name="GRAB">
                    <div class="title m-b-35">加急</div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">
                    <el-form-item  prop="expeditedTime"  class='w-100' >
                        <div class="label">时间(分)</div>
                        <el-input v-model.number="ruleForm.expeditedTime" placeholder="请输入"></el-input>
                    </el-form-item>
                    <div class="title m-b-35">紧急</div>
                    
                        <el-form-item  prop="urgentTime"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="ruleForm.urgentTime" placeholder="请输入"></el-input>
                        </el-form-item>
                        <div class="title m-b-35">一般</div>
                    
                        <el-form-item  prop="generalTime"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="ruleForm.generalTime" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                    <!-- 2 -->
                <el-tab-pane label="报事处理时限" name="REPORT">
                     <el-form :model="time" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">
                        <div class="title m-b-35">加急</div>
                    
                        <el-form-item  prop="time1"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time1" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time2"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time2" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time3"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time3" placeholder="请输入"></el-input>
                        </el-form-item>
                         <div class="title m-b-35">紧急</div>
                    
                        <el-form-item  prop="time4"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time4" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time5"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time5" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time6"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time6" placeholder="请输入"></el-input>
                        </el-form-item>
                         <div class="title m-b-35">一般</div>
                    
                        <el-form-item  prop="time7"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time7" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time8"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time8" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="time9"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model.number="time.time9" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                    <!-- 3 -->
                <el-tab-pane label="投诉处理时限" name="COMPLAINT">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">
                        <div class="title m-b-35">加急</div>
                    
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                         <div class="title m-b-35">紧急</div>
                    
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                         <div class="title m-b-35">一般</div>
                    
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item  prop="name"  class='w-100' >
                            <div class="label">时间(分)</div>
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="display_flex padding_20" >
                                        <div class="back  f-s-14 cursor m-r-25">返回</div>
                                        <div v-if="ruleForm.name==''  || ruleForm.content=='' " class="back f-s-14 cursor">保存</div>
                                        <div v-else class="save f-s-14 cursor" @click="save('ruleForm')" >保存</div>
         </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           activeName:'GRAB',
           height:'',
           ruleForm:{
               expeditedTime:'',
                 organizationId:'',
                 urgentTime:'',
                 generalTime:''
           },
           time:{

           },
            
            //  规则
            rules:{
                expeditedTime: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],  
                 urgentTime: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],     
                 generalTime: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                time1:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],    
                 time2:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                 time3:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                
                 time4:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                 time5:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                 time6:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   


                 time7:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                 time8:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
                 time9:[
                    { required: true, message: '请输入', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],   
            },   
        };
    },
    created() {
       this.height=this.$height()
       this.getOr()
    },
    methods: {
         // 新增保存
        save(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
                 if(this.activeName='GRAB'){
                       this.ax.put('pushTime',this.ruleForm)
                    .then(res=>{
                    this.$message.success('保存成功');
                    this.ruleForm={
                    }
                    this.back()
                })
                 }
          } else {
             this.$message.error('请根据提示输入');
            return false;
          }
          });
       
        },
        handleClick(val){
            
        },
        getOr(){
            this.ax.get('organization')
                .then(res=>{
                    console.log(res)
                    this.ruleForm.organizationId=res[0].id

                })
        },
    }
};
</script>

<style scoped>
.push .container{
    padding: 0 35px;
}
.push .title{
    border-bottom: 1px solid #DCDCDC;
    padding-bottom: 15px;
}
</style>
