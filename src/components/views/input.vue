
<template>
         <el-dialog
            :title="info.title"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="setClose"
            :close-on-click-modal='false'
           >
             <el-form :model="ruleForm" :rules="info.rules" ref="ruleForm"  class="demo-ruleForm">
                        <div class="display_flex between padding_20 m-b-20 wrap " >
                            <el-form-item  prop="name" class="w-40 m-r-10" v-for="(item,i) of info.list" :key="i">
                                <div class="label">{{item.name}}</div>
                                <el-input v-model="ruleForm.name" :placeholder="item.placeholder"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>            
            <span slot="footer" class="dialog-footer">
                <el-button @click="setClose">取 消</el-button>
                <el-button type="primary" @click="setClose">确 定</el-button>
            </span>
            </el-dialog>
    
</template>

<script>
export default {
     props: {
                info: {}
            },
    data() {
        return {
           input:'',
           dialogVisible:false,
            ruleForm:{

           },
        };
    },
    created() {
       console.log(this.info)
       console.log(123)
       this.dialogVisible=this.info.dialogVisible
    },
    methods: {
     setClose(){
         this.dialogVisible=false
         this.$emit('shows', {dialogVisible:false});
     },
    }
};
</script>

<style >
.center{
    height: 400px;
    overflow: auto;
}
.wrap{
    flex-wrap: wrap;
}
</style>
