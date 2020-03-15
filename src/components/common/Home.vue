<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>


<style >
/* 公共样式 */
    .container{
        padding: 0;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        overflow: auto;
    }
    .top_title{
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #DCDCDC;
        padding: 0 20px;
    }
    .title_info{
            height:18px;
            font-size:18px;
            font-weight:400;
            line-height:18px;
            color:#303139;
            padding-left: 6px;
            border-left: 4px solid #267FF9;
    }
    .label{
        height:20px;
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:#999999;
        margin-bottom: 15px;
}
.IPTitle{
        /* height:20px; */
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:#999999;
    }
.IPInfo{
        /* height:20px; */
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:#000;
    }
.back{
    background:#c4c4cf;
     /* left: 20px; */
}
.save{
    background:#267ff9;
    /* left: 50px; */
}
.save_active{
     background:#267ff9;
     /* left: 50px; */
}
.back,.save{
        width:64px;
        height:38px;
        border-radius:2px;
        line-height: 38px;
        text-align: center;
        color: #fff;
        /* position: absolute;
        bottom: 20px; */
}
.users_img{
    width: 95px;
    height: 95px;
    /* object-fit: cover; */
    background: #ccc;
}
.el-dialog__header{
    border-bottom: 1px solid #DCDCDC;
}
.el-input--small .el-input__inner{
    height: 42px;
    line-height: 42px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .color_dan{
     color: #F56C6C;
  }
  .color_war{
     color: #E6A23C;
  }
  .color_suc{
     color: #67C23A;
  }
</style>
