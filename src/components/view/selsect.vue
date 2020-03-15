<template>
    <div>
        <el-form  class="demo-dynamic" :model="form" ref="dynamicValidateForm">
            <el-form-item  class='w-100'  prop="communityId"
                    :rules="[
                    { required: true, message: '请选择项目', trigger: 'change' }
                    ]" >
                    <div class="label">项目 </div>
                        <el-select v-model="form.communityId" filterable  clearable placeholder="请选择" class="w-100"  @change="sendId">
                            <el-option
                                v-for="item in option"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select> 
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    prop:['value'],
    data() {
        return {
           option:[],
           form:{
               communityId:''
           }
        };
    },
    created() {
       this.getAll()
       
    },
    mounted(){
         console.log(this.value)
        if(this.value==undefined){
           
            this.form.communityId=''
        }
    },
    methods: {
        // 传出id
        sendId(){
            console.log(this.form.communityId)
            this.$emit('input',this.form.communityId)
        },
     // 获取全部小区
        getAll(){
            this.ax.get('community')
                .then(res=>{
                    console.log(res)
                    this.option=res
                })
        },
    }
};
</script>

<style scoped>

</style>
