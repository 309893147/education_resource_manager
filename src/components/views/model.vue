
<template>
         <el-dialog
            :title="info.title || '选择'"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal='false'
            :before-close="setClose">
            <div class="tree">
                <el-input
                class="w-50 m-b-20"
                    placeholder="输入关键字进行过滤"
                    clearable
                    v-model="filterText">
                </el-input>

                 <el-tree
                    class="filter-tree"
                    show-checkbox
                    :load="loadNode"
                     lazy
                     node-key="id"
                     :filter-node-method="filterNode"
                     ref="tree"
                    :props="props"
                    @check-change="handleCheckChange"
                 >
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setClose">取 消</el-button>
                <el-button type="primary" @click="setSave">确 定</el-button>
            </span>
            </el-dialog>
    
</template>

<script>
export default {
    // name: 'model',
     props: {
                info: {}
            },
    data() {
        return {
           data:[],
           filterText:'',
           dialogVisible:false,
            params:{
                name:'',
                id:''
            },
           props: {
            label: 'name',
            children: 'children',
            isLeaf: 'leaf'
          },
        };
    },
    created() {
       this.dialogVisible=this.info.dialogVisible
       console.log(this.info)
       
    },
    mounted(){
       setTimeout(()=>{
             if(this.info.choose && this.info.choose.length>0){
           this.$refs.tree.setCheckedKeys(this.info.choose);
        //    console.log( this.$refs.tree.setCheckedKeys(this.info.choose))
        }
       },1000)
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      } 
      },
    methods: {
        // 保存
        setSave(){
             this.dialogVisible=false
             this.$emit('show', this.params);
        },

        // 关闭传参
     setClose(){
         this.dialogVisible=false
         this.$emit('shows', {dialogVisible:false});
     },
     loadNode(node, resolve){
        //  console.log(node)
        
        if (node.level === 0) {
           return resolve(this.info.tree);
        }else{
            if( node.data.children && node.data.children.length>0){
                 return resolve(node.data.children);
            }else{
                if( node.data && node.data.type=="DEPARTMENT"){
                    this.getEmployee(node.data.id)
                    .then(it =>{
                     return resolve(it.content);
                })
                }else{
                     return resolve([]);
                }
               
            }
        }
      
     },
     handleCheckChange(data, checked, indeterminate){
     let arr =  []
     this.$refs.tree.getCheckedNodes().forEach(it=>{
            if(!it.type){
                arr.push(it)
            }
        })
        // console.log(arr)
        let name=''
        let id=''
        arr.forEach(it=>{
            name+=`${it.name},`
            id+=`${it.id},`
        })
        name = name.slice(0,-1);
        id = id.slice(0,-1);
        this.params.name=name
        this.params.id=id
     },
    //  获取部门员工
      getEmployee(id){
         return   this.ax.get("organization/employee",{params:{organizationId:id,size:999}})
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    }
};
</script>

<style >
.el-dialog__header{
    border-bottom: 1px solid #DCDCDC;
}
.tree{
    height: 400px;
    overflow: auto;
}
</style>
