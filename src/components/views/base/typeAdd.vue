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
                name:'添加资源类型',
                rules:[
                    'name',
                    'sort',
                    'headImage'
                ],
                sore:true,
                addUrl:'type/resource',
                type:'RESOURCE',
                back:'/resource/resourceType'
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
