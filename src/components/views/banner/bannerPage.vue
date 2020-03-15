
<template>
    <div>
         <div class="container" >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">banner</div>
                </div> 
                <List :dataUrl="'banner'" @create="jumpCreate" @delete="deleteRow" ref="list" @edit="editRow" :actionName='`新增`'  >
                    <!-- <template slot="addition-table-actions" slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openPermission(scope.item.row)">查看权限</el-button>
                    </template> -->
                </List>
         </div>
        <el-dialog title="编辑" :visible.sync="createDialog" :close-on-click-modal="false" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">

                                <div class="padding_20 m-b-20">
                                    <el-form-item  prop="name"  class='w-100' >
                                        <div class="label">小区</div>
                                        <el-input v-model="ruleForm.name" placeholder="请输入名称"  >
                                          
                                        </el-input>
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
                                            v-model="ruleForm.type"
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
            name:'',
            content:'',
            type:false
         },
        //  规则
         rules:{
                        name: [
                          { required: true, message: '请输入名称', trigger: 'blur' },
                        ],
                      
                                            
                },      
          }
        },
    created() {
        console.log(this.info)
    },
    methods: {
         // 获取content
        getMsgFormSon(data){
            this.ruleForm.content=data
        },
        // 跳转
        jumpCreate(){
            this.$router.push({
                path:'resourceAdd'
            })
        },
        // 删除
        deleteRow(val){
            this.startLoading()
            this.ax.delete(`aboutus?ids=`+val.map(it =>{return it.id}).join(",")).then(it =>{
                this.stopLoading()
                this.$refs.list.onDeleted(val)
            }).catch(it =>{
                this.stopLoading()
                console.log(it)
            })
        },
        // 修改
        editRow(val){
            console.log(val)
            this.createDialog=true
            this.ruleForm=val[0]

        },
        update(){
             this.createDialog = true
            this.ax.put(`aboutus`,this.ruleForm).then(it =>{

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
