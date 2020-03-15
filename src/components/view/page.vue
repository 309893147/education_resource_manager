<template>
    <div>
         <div class="container" >
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">{{info.name}}</div>
                </div> 
                <List :dataUrl="info.dataUrl" @create="jumpCreate" @delete="deleteRow" ref="list" @edit="editRow" @data="dataList" :actionName='`新增`'  >
                    <!-- <template slot="addition-table-actions" slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openPermission(scope.item.row)">查看权限</el-button>
                    </template> -->
                </List>
         </div>
        <el-dialog title="编辑" :visible.sync="createDialog" :close-on-click-modal="false" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm m-b-30">

                                <div class="padding_20 m-b-20">
                                    <el-form-item  prop="name"  class='w-100' >
                                        <div class="label">名称</div>
                                        <el-input v-model="ruleForm.name" placeholder="请输入名称"  >
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item  prop="sort"  class='w-100' v-if="info.sore" >
                                        <div class="label">排序</div>
                                        <el-input v-model.number="ruleForm.sort" placeholder="请输入排序"></el-input>
                                    </el-form-item>

                                  <el-form-item   >
                                        <div class="label">图片</div>
                                        <img :src="ruleForm.headImg">
                                        <div>
                                               <up-load @getImg='getImg'></up-load>
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
import List from './List'
import upLoad from '../views/upLoad';
export default {
    components:{
       List,
       upLoad
    },
    props:{
        info:{}
    },
    data() {
        return {
            //弹框
            createDialog:false,
            // 参数
        ruleForm:{
            name:'',
            id:'',
            sort:'',
            headImg:'',
            type:this.info.type
         },
        //  规则
         rules:{
                        name: [
                          { required: true, message: '请输入名称', trigger: 'blur' },
                        ],
                         sort: [
                          { required: true, message: '请输入排序', trigger: 'blur' },
                         { type: 'number', message: '排序必须为数字值'}
                        ],
                         headImg: [
                          { required: true, message: '请输入描述', trigger: 'blur' },
                        ],
                                            
                },      
          }
        },
    created() {
        console.log(this.info)
    },
    methods: {

        dataList(val){
            console.log("2"+val);
            
             val.content.map(it => {
                
              it.type = it.type == 'RESOURCE' ? '资源类型' : it.type == 'NOTICE' ? '公告通知' : '缺货';
            });
        },
             // 获取图片
        getImg(data) {
            // console.log(data)
            this.ruleForm.headImg = data;
             console.log("11"+this.ruleForm.headImg)
        },
        //上传回调
        handleAvatarSuccess() {},
        // 上传前
        beforeAvatarUpload() {},
        // 跳转
        jumpCreate(){
            this.$router.push({
                path:this.info.jumpUrl
            })
        },
        // 删除
        deleteRow(val){
            this.startLoading()
            this.ax.delete(`${this.info.dataUrl}?ids=`+val.map(it =>{return it.id}).join(",")).then(it =>{
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
            this.ax.post(`${this.info.dataUrl}`,this.ruleForm).then(it =>{

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
