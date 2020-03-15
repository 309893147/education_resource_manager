
<template>
    <div>
        <add-page :info='info'></add-page>
    </div>
</template>

<script>
import addPage from '../../view/addNews'
export default {
    components:{
        addPage
    },
    data() {
        return {
            info:{
                title:'添加问题',   
                haveTitle:false,
                addUrl:'problem',
                back:'/question/problem'
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

