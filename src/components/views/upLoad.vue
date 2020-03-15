<template>
    <div >
        <el-upload
            v-loading="loading"
            class="avatar-uploader"
            :action="src"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="headImg!=''" :src="headImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
     props:{
         url:'',
         clear:''
     },
    data() {
        return {
            headImg:'',
            loading:false,
            src:'/manage/upload'

        };
    },
    created() {
        // console.log(this.url)
        if(this.url!==undefined){
            this.src=this.url
        }
    },
    watch:{
        clear(){
            if(this.clear){
                this.headImg=''
            }
        },
    },
    methods: {
        handleAvatarSuccess(res, file){
                // console.log(res)
                // console.log(file)
                 this.loading=false
                 this.headImg=res.data
                 this.$emit('getImg', res.data);
        },
        beforeAvatarUpload(){
            // console.log(123)
            this.loading=true
        },
    }
};
</script>

<style scoped>
</style>
