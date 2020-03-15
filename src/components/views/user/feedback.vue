<template>
    <div>
        <List  
        :metaUrl="'feedback/meta'" 
        :dataUrl="'user'"
        :tableData="tableData" 
        @create="createDialog=true" 
        :tableMeta="tableMeta" 
        :disableTableAction="true"
        :disableAction="true">
        </List>
    </div>
</template>

<script>
import List from "../../view/List"
export default {
    components:{List},
    data(){
        return {
            filter:{bb:"bb"},
            createDialog:false,
            tableData:{},
            tableMeta:{}
        }
    },
    methods:{
       
    }
}
</script>
<style scoped>

</style>