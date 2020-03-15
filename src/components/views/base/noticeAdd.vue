<template>
    <div>
        <add-page :info='info'></add-page>
    </div>
</template>

<script>
import addPage from '../../view/addPage'
export default {
    components:{
        addPage
    },
    data() {
        return {
            info:{
                name:'添加公告通知类型',
                rules:[
                    'name',
                    'sort',
                    'remark'
                ],
                sore:false,
                addUrl:'type/notice',
                type:'NOTICE',
                back:'/base/notice'
            }
        }
    },
    created() {
                
    },
    methods: {}

    };
</script>

<style scoped>

</style>
