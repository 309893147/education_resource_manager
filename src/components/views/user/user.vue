
<template>
    <div>
         <div class="container" >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">用户</div>
                </div> 
                <List :dataUrl="'user'" ref="list"  >
                    <template slot="addition-table-actions" slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openPermission(scope.item.row)">查看详情</el-button>
                    </template>
                </List>
         </div>
        <el-dialog title="编辑" :visible.sync="createDialog" :close-on-click-modal="false" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">

                                <div class="padding_20 m-b-20">
                                      <el-form-item    class='w-100' >
                                        <div class="display_flex">
                                            <div class="label m-r-20">是否禁用</div>
                                            <el-switch
                                            class="m-b-15"
                                            v-model="ruleForm.status"
                                            active-color="#267FF9"
                                            inactive-color="#ccc">
                                            </el-switch>
                                        </div>
                                    </el-form-item>
                                </div>
                </el-form>
                <span slot="footer" class="dialog-footer display_flex">
                    <div class="back  f-s-14 cursor m-r-25">返回</div>
                    <div v-if="ruleForm.name==''  || ruleForm.remark=='' " class="back f-s-14 cursor">修改</div>
                    <div v-else class="save f-s-14 cursor" @click="update('ruleForm')" >修改</div>
                </span>
        </el-dialog>        
    </div>
</template>

<script>
import List from '../../view/List'
import viewEditor from '../../page/VueEditor'
export default {
    components:{
       List,
       viewEditor
    },
 
    data() {
        return {
            //弹框
            createDialog:false,
            // 参数
        ruleForm:{
            status:''
         }
          }
        },
    created() {
        console.log(this.info)
    },
    methods: {
        update(){
             this.createDialog = true
            this.ax.post(`user`,this.ruleForm).then(it =>{
                this.$message.success('保存成功');
                this.createDialog = false
                this.$refs.list.onUpdate([it])
                this.ruleForm={}
                this.createDialog=false

            })
        },
    }
            };
</script>

<style scoped>

</style>
