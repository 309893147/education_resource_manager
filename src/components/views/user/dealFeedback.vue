<template>
    <div>
       
            <div class="container m-b-25" :style='height'>
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">反馈信息</div>
                </div>         
                <div class="padding_20">
                        <div class="m-b-25">
                            <span class="IPTitle m-r-15">小区名称</span>
                            <span class="IPInfo">美城云庭</span>
                        </div>
                        <div class="m-b-25">
                            <span class="IPTitle m-r-15">反馈人</span>
                            <span class="IPInfo">美城云庭</span>
                        </div>
                        <div class="m-b-25">
                            <span class="IPTitle m-r-15">创建时间</span>
                            <span class="IPInfo">美城云庭</span>
                        </div>
                        <div class="m-b-25">
                            <span class="IPTitle m-r-15">处理状态</span>
                            <span class="IPInfo color_suc">美城云庭</span>
                        </div>
                        <div class="m-b-25 display_flex start">
                            <div class="IPTitle m-r-15">反馈内容</div>
                            <div class="IPInfo">
                                <div class="m-b-25">省心服务，预约服务，没有二级确认，也没有取消预约选项。</div>
                                <div >
                                    <el-image
                                    style="width: 95px; height: 95px"
                                    src="url"
                                    fit="cover"></el-image>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
                <div class="display_flex padding_20">
                <div class="back  f-s-14 cursor m-r-25" @click="back">返回</div>
                <div class="save f-s-14 cursor">处理</div>
            </div>         
    </div>
</template>

<script>


export default {

    data() {
        return {
          
          
         
        }
    },
    created() {
     
    },
    watch:{
      
    },
    methods: {

    }

};
</script>

<style scoped>

</style>
