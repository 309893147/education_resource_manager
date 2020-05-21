<template>
    <div class="index">
         <div class="container m-b-15">
                <div class="top_title display_flex m-b-35">
                    <div class="title_info" >面板</div>
                    
                </div>
                <div class="padding_20">
                    <div class="display_flex between  m-b-50">
                        <template v-if="user && user.info && user.info.type =='SUPER_MANAGER'">
                        <div class="w-20">
                            <div class="index_info_number">{{info.indexCount.userTotalCount}}</div>
                            <div class="index_info">总用户</div>
                        </div>
                        <div class="w-20">
                            <div class="index_info_number">{{info.indexCount.newUserCount}}</div>
                            <div class="index_info">今日新增用户</div>
                        </div>
                        </template>
                        <div class="w-20">
                            <div class="index_info_number">{{info.indexCount.unResourceCount}}</div>
                            <div class="index_info">未处理资源</div>
                        </div>  
                        <div class="w-20">
                            <div class="index_info_number">{{info.indexCount.todayNewCount}}</div>
                            <div class="index_info">今日新增资源</div>
                        </div>
                        <div class="w-20">
                            <div class="index_info_number">{{info.indexCount.todayResourceCount}}</div>
                            <div class="index_info">今日上传量</div>
                        </div>
                    </div>
                    <div class="ranking m-b-30">今日资源整理榜</div>
                    <div class="display_flex m-b-25" v-if="info.ticketTopPersons && info.ticketTopPersons.length">
                        <div class="w-20 display_flex start">
                            <img class="medal m-r-15" src="../../../assets/img/glod.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">{{info.ticketTopPersons[0].name}}</div>
                                   <div class="countsOfOrder">{{info.ticketTopPersons[0].ticketNumber}}</div>
                               </div>
                               <div class="positionOfManager">{{info.ticketTopPersons[0].companyName}}{{info.ticketTopPersons[0].position}}</div>
                            </div>
                        </div>
                        <div class="w-20 display_flex start" v-if="info.ticketTopPersons.length > 1">
                            <img class="medal m-r-15" src="../../../assets/img/silver.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">{{info.ticketTopPersons[1].name}}</div>
                                   <div class="countsOfOrder">{{info.ticketTopPersons[1].ticketNumber}}</div>
                               </div>
                               <div class="positionOfManager">{{info.ticketTopPersons[1].companyName}}{{info.ticketTopPersons[1].position}}</div>
                            </div>
                        </div>
                        <div class="w-20 display_flex start" v-if="info.ticketTopPersons.length >2">
                            <img class="medal m-r-15" src="../../../assets/img/copper.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">{{info.ticketTopPersons[2].name}}</div>
                                   <div class="countsOfOrder">{{info.ticketTopPersons[2].ticketNumber}}</div>
                               </div>
                               <div class="positionOfManager">{{info.ticketTopPersons[2].companyName}}{{info.ticketTopPersons[2].position}}</div>
                            </div>
                        </div>
                    </div>
                      <div class="display_flex m-b-25" v-else >
                        <div class="w-20 display_flex start">
                            <img class="medal m-r-15" src="../../../assets/img/glod.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">暂无</div>
                                   <div class="countsOfOrder">暂无</div>
                               </div>
                               <div class="positionOfManager">暂无</div>
                            </div>
                        </div>
                        <div class="w-20 display_flex start" >
                            <img class="medal m-r-15" src="../../../assets/img/silver.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">暂无</div>
                                   <div class="countsOfOrder">暂无</div>
                               </div>
                               <div class="positionOfManager">暂无</div>
                            </div>
                        </div>
                        <div class="w-20 display_flex start" >
                            <img class="medal m-r-15" src="../../../assets/img/copper.png" alt="">
                            <div >
                               <div class="display_flex start m-b-5">
                                   <div class="managerOfName m-r-20">暂无</div>
                                   <div class="countsOfOrder">暂无</div>
                               </div>
                               <div class="positionOfManager">暂无</div>
                            </div>
                        </div>
                    </div>
                    
                </div>

         </div>
          <div class="container" v-if="user && user.info && user.info.type =='SUPER_MANAGER'">
                <div class="top_title display_flex m-b-35">
                    <div class="title_info">服务器信息</div>
                </div>
                <div class="padding_20">
                    <div class="display_flex m-b-45">
                        <div class="w-25 display_flex">
                            <div class="m-r-12 IPTitle">本次登录IP</div>
                            <div class="IPInfo">{{IpInfo.bc}}</div>
                        </div>
                        <div class="w-25 display_flex">
                            <div class="m-r-12 IPTitle">上次登录IP</div>
                            <div class="IPInfo">{{IpInfo.sc}}</div>
                        </div>
                        <div class="w-25 display_flex">
                            <div class="m-r-12 IPTitle">上次登录时间</div>
                            <div class="IPInfo" v-if="IpInfo.scTime">{{getTime(IpInfo.scTime)}}</div>
                        </div>
                    </div>

                 
                </div>           
          </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           info:{
               indexCount:{},
               ticketTopPersons:[]
            },
           
           IpInfo:{},
           user: {}
        };
    },
    created() {
       this.getInfo()
        this.getIP()
        this.user = JSON.parse(localStorage.getItem("user"))
  
    },
    methods: {
        getInfo(){
            this.ax.get('common/index/count')
                .then(res=>{
                    // console.log(res)
                    this.info= res
                })
        },
        getIP(){
            this.ax.get('common/index/service')
                .then(res=>{
                    console.log(res)
                    this.IpInfo = res
                })
        },
        getServe(){
            this.ax.get('common/index/net')
            .then(res=>{
                    this.serveInfo = res
                    console.log(this.serveInfo)
                })
        },
    }
};
</script>

<style>
    .index_info_number{
        height:45px;
        font-size:32px;
        font-weight:bold;
        line-height:45px;
        color:#267ff9;
    }
    .index_info{
        height:28px;
        font-size:20px;
        /* font-weight:bold; */
        line-height:28px;
        color:#666666;
    }
    .ranking{
        height:28px;
        font-size:20px;
        font-weight:400;
        line-height:28px;
        color:#707070;
    }
    .index .medal{
        width: 30px;
        height: 30px;
    }
    .index .managerOfName{
        font-size:20px;
         line-height:20px;
        font-weight:bold;
        color:#666666;
    }
    .index .countsOfOrder{
        font-size:24px;
         line-height:20px;
        font-weight:bold;
        color:#267ff9;
    }
    .index .positionOfManager{
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:#999999;
    }
    .index .btn_fast{
        width:208px;
        height:98px;
        background:#267ff9; 
        margin-right: 2%;
        border-radius:6px;
        line-height: 98px;
        text-align: center;
        color: #fff;
        font-size: 22px;
    }
    
    .index .indexInfo{
        border-bottom: 1px dashed #F2F2F2;
        height: 40px;
        line-height: 25px;
    }
</style>
