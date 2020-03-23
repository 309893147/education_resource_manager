<template>
     <div>
        <div class="container m-b-20" :style="height">
                <div class="box_title display_flex ">
                    <div class="w-20 box_item">一级</div>
                    <div class="w-25 box_item">二级</div>
                    <div class="w-40 box_item">权限管理</div>
                    <div class="w-10 box_item">全选</div>
                </div>
                <div class="display_flex  b-b-1 box_tree f-s-14" v-for="(item,i) of tableData" :key="i">
                      <div class="w-20 " >
                          {{item.name}}
                      </div>
                      <div class="w-80 b-l-1 b-r-1" style="min-height:3.19rem " v-if="item.sub.length>0">
                          <div v-for="it of item.sub" :key='it.path' class="w-100 box_tree_item b-b-1 display_flex between" >
                              <div class="w-30 b-r-1 m-r-10" >{{it.name}}</div>
                             
                              <div v-for="res of it.permissions" :key='res.id' class="m-r-20">
                                  <el-checkbox v-model="res.check" @change='select(res,it)'>{{res.name}}</el-checkbox>
                              </div>
                              <div class="w-20  b-l-1">
                                  <el-checkbox @change='selectAll($event,it)' v-model="it.checkedAll"></el-checkbox>
                              </div>
                          </div>
                      </div>

                       <div class="w-80 b-l-1 b-r-1" style="min-height:3.19rem " v-else>
                          <div  class="w-100 box_tree_item b-b-1 display_flex between" >
                              <div class="w-30 b-r-1 m-r-10" style="min-height:3.19rem "></div>
                             
                              <div v-for="res of item.permissions" :key='res.id' class="m-r-10">
                                  <el-checkbox v-model="res.check" @change='select(res,item)'>{{res.name}}</el-checkbox>
                              </div>
                              <div class="w-20  b-l-1">
                                  <el-checkbox @change='selectAll($event,item)' v-model="item.checkedAll" ></el-checkbox>
                              </div>
                          </div>
                      </div>
                </div>
        </div>
         <div class="display_flex padding_20 m-b-20">
            <div class="back f-s-14 cursor m-r-25" @click="back">返回</div>
            <div  class="save f-s-14 cursor" @click="save">保存</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props:['manager','role','editMode','id'],
    data(){
        return {
            height:'',
            tableData:[],
            check:false,
            selected:[]
        }
    },
    created(){
         this.height = this.$height(280)
        this.getPermissions()
    },
    methods:{
        select(val,value){
            this.isAll(value)
        },
        selectAll(value,val){
           if(value){
                    this.mapList(val,true)
                }else{
                    this.mapList(val,false)
                }
        },
        mapList(val,right){
                val.permissions.map(it=>{
                    it.check = right
                })
        },
        // 是否全选
        isAll(val){
            if(val.permissions.length>0){
                let right = 0
                val.permissions.map(it=>{
                    if(it.check){
                        right++
                    }
                })
                if(right==val.permissions.length){
                    return val.checkedAll = true
                }else{
                    return val.checkedAll = false
                }
            }else{
                val.sub.map(it=>{
                     this.isAll(it)
                })
               
            }
        },
        // 查询权限
        getPermissions(){
            let vm = this
            let query = {id:this.id}
            this.ax.get("/permission/admin",{
                params: query
            }).then(it =>{
                console.log(it)
                it.map(item=>{
                     this.isAll(item)
                })
                this.tableData = it
            })
        },

        pushSelect(){
            let selected=[]
            this.tableData.map(item=>{
                if(item.permissions.length>0){
                    item.permissions.map(it=>{
                        if(it.check){
                            selected.push(it)
                        }
                    })
                }else{
                    item.sub.map(it=>{
                        it.permissions.map(res=>{
                            if(res.check){
                                selected.push(res)
                            }
                        })
                    })
                }
            })
            return selected
        },
        save(){
            console.log(this.selected)
            
           this.selected = this.pushSelect()
            this.ax.post("/permission/admin?id="+this.id,this.selected).then(it =>{
                this.$message.success('保存成功')
            })  
        },

    }  
}
</script>
<style scoped>

.active{
    color: #409EFF;
}
.box_title{
    width:100%;
    height:2.5rem;
    background:#f2f2f2;
}
.box_item{
    text-align: center;
    height:1.25rem;
    font-size:0.88rem;
    font-weight:400;
    line-height:1.25rem;
    color:rgba(51,51,51,1);
}
.b-b-1{
 border-bottom: 1px solid #E9E9E9;
}
.b-r-1{
 border-right: 1px solid #E9E9E9;
}
.b-l-1{
    border-left: 1px solid #E9E9E9;
}
.box_tree{
   text-align: center;
   
}

.box_tree_item{
     height: 3.19rem;
     line-height: 3.19rem;
}
</style>