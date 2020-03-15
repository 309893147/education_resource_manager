<template>
    <div>
         <div class="container m-b-25" >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">添加工作情况</div>
                </div> 
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">
                                <div class="padding_20 m-b-20">
                                    <el-form-item  prop="reminderTime"  class='w-100' >
                                        <div class="label">每天提醒时间</div>
                                        <el-time-select
                                            v-model="ruleForm.reminderTime"
                                            @change="get"
                                            format='HH:mm:ss'
                                            :picker-options="{
                                                start: '00:00',
                                                step: '00:10',
                                                end: '23:30'
                                            }"
                                            placeholder="选择时间点">
                                        </el-time-select>
                                    </el-form-item>

                                    <el-form-item    class='w-100' >
                                        <div class="label">提醒员工</div>
                                        <el-input v-model="ruleForm.employeeName"  @focus="shows=true"    placeholder="请选择"></el-input>
                                    </el-form-item>

                                    
                                </div>

                                <div class="display_flex padding_20" >
                                        <div class="back  f-s-14 cursor m-r-25" @click="back">返回</div>
                                        <div v-if="ruleForm.employeeName==''" class="back f-s-14 cursor">保存</div>
                                        <div v-else class="save f-s-14 cursor" @click="save('ruleForm')" >保存</div>
                                </div>
                </el-form>
         </div>
         <model :info='info' v-if="shows" @shows="closeMode"  @show='saveModel'></model>
    </div>

</template>

<script>
import bus from '../../common/bus'
import model from '../model'
export default {
    components:{
        model
    },
    data() {
        return {
           ruleForm:{},
           value1:'',
           ruleForm:{
            employeeName:''
           },
            shows:false,
            info:{
                title:'选择',
                dialogVisible:true,
                choose:[],
                tree:{

                }, 
             },
              
              rules:{
                    jobGroup: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    employeeName: [
                        { required: true, message: '请输入', trigger: 'foucs' },
                    ],
                    reminderTime: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                            
                     },             
                    };
                        
                    },
                created() {
                    //  console.log(this.$route.query.params)
                    if(this.$route.query.params){
                        let info = JSON.parse(this.$route.query.params)
                        console.log(info)
                        this.ruleForm=info[0]
                    }
                 // 获取组织架构
                   this.getOrganization();
                },
                methods: {
                    // 获取组织
                getOrganization() {
                        this.ax.get('organization').then(it => {
                            console.log(it)
                            this.info.tree=it
                        });
                    },

                // 保存关闭
                saveModel(val){
                    console.log(val)
                    this.ruleForm.employeeName=val.name
                    this.ruleForm.employeeId=val.id

                    this.info.choose= val.id.split(",")

                    this.shows=val.dialogVisible
                },
                // 关闭
                closeMode(val){
                        // console.log(val)
                        this.shows=val.dialogVisible
                    },
                   // 返回
                back(){
                    console.log(123)
                    this.$router.go(-1);
                    bus.$emit('close',this.$route.path);
                },
                    // 新增保存
                save(formName){
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                            this.ax.post('reminder/addJob',this.ruleForm)
                            .then(res=>{
                                this.$message.success('保存成功');
                                this.ruleForm={
                                    
                                }
                                bus.$emit('add_responsible',res)
                                this.back()
                            })
                    } else {
                        this.$message.error('请根据提示输入');
                        return false;
                    }
                    });
                
                    },
                get(val){
                    console.log(val)
                   console.log( this.ruleForm)
                },
                }
            };
</script>

<style scoped>

</style>
