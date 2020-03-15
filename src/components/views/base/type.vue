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
                    name:'资源类型',
                    sore:true,
                    type:'RESOURCE',
                    dataUrl:'type/resource',
                    jumpUrl:'/resource/resourceTypeAdd'
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
