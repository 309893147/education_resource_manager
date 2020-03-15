<template>
    <div>
        <page :info='info'></page>
    </div>
</template>

<script>
import page from '../../view/page'
export default {
    components:{
       page
    },
    data() {
        return {
                info:{
                    name:'公告通知类型',
                    sore:false,
                    type:'NOTICE',
                    dataUrl:'type/notice',
                    jumpUrl:'/base/noticeAdd'
                }
          }
        },
    created() {
        
    },
    methods: {

    }
            };
</script>

<style scoped>

</style>
