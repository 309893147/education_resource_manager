<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs.length>1">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.subs[0].index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import { fileURLToPath } from 'url';
import { relativeTimeThreshold } from 'moment';

export default {
    data() {
        return {
            permissions:[],
            collapse: false,
            items: []
        };
    },
    computed: {
        menus(){
            
        },
        onRoutes() {
            return this.$route.path;
        }
    },
    methods:{
        getPermission() {
          return  this.ax.get('manager/permission')
        },
        getAllowMenu(){
            this.permissions.forEach(it =>{
            //   console.log(it)  
            })
        }
    },
    created() {
        
        this.getPermission()
        .then(res=>{
        //  let user =  res
        // this.getSideBarCount();
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        let user = JSON.parse(localStorage.getItem('user'));
        user.permissions =res
        console.log(res)
        this.permissions = user.permissions;
        let allowedMenu = this.permissions.map(it => {
            return it.path;
        });
        this.getAllowMenu();
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        
        let routers = this.$router.options.routes.filter(it => {
            return it.name == 'home';
        })[0].children;

        let userType = user.info && user.info.type;
        let whiteList = [];
        this.items = routers.map(it => {
            let item = {
                icon: it.icon,
                title: it.meta.title,
                index: it.path,
                hide: it.hide,
                countKey: it.countKey
            };

            if (it.children) {
                item.subs = it.children
                    .map(child => {
                        let path = child.path.indexOf('/') == 0 ? child.path : it.path + '/' + child.path;
                        return {
                            index: path,
                            title: child.meta.title,
                            menu: it.meta.title + ',' + (child.meta.menu || child.meta.title),
                            hide: child.hide,
                            countKey: child.countKey
                        };
                    })
                    .filter(sub => {
                        return  allowedMenu.indexOf(sub.menu) > -1 || userType == 'SUPER_MANAGER' || (sub.meta && sub.meta.whiteList);
                    });
            }
            return item;
            // }
        });
        this.items = this.items.filter(it => {
            if (!it.subs || !it.subs.length || it.hide) {
                return false;
            }

            it.subs = it.subs.filter(item => {
                if (item.hide) {
                    return false;
                }
                return true;
            });
            return true;
        });
        console.log(this.items)
        bus.$emit('allowMenu', this.items);
        })

        // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        // let user = JSON.parse(localStorage.getItem("user"))
        // this.permissions = user.permissions
        // let allowedMenu = this.permissions.map(it =>{
        //     return it.path
        // })
        // // console.log(allowedMenu)
        // this.getAllowMenu()
        // bus.$on('collapse', msg => {
        //     this.collapse = msg;
        //     bus.$emit('collapse-content', msg);
        // });
        // let routers = this.$router.options.routes.filter(it =>{
        //     // console.log(it)
        //     return it.name == "home"
        // })[0].children;
        // // console.log(routers)
        // let userType = user.info && user.info.type
        // this.items = routers.map(it =>{
        //     let  item = {
        //         icon: it.icon,
        //         title: it.meta.title,
        //         index: it.path,
        //         hide: it.hide
        //     };
        //     // console.log(it.children)
        //     if(it.children){
        //         // if(it.children.length==1){
        //         //      return   it.children=[]
        //         // }else{
        //         item.subs = it.children.map(child =>{
        //             // console.log(child)
        //             let path = child.path.indexOf("/") ==0?child.path :(it.path+"/"+child.path)
        //             return {index:path,title: child.meta.title,menu:it.meta.title+","+child.meta.title,hide:child.hide};
        //         }).filter(sub=>{ 
                    
        //             return allowedMenu.indexOf(sub.menu) > -1 || userType =='SUPER_MANAGER'
        //         })
        //     }
        //     return item;
        //     // }
        // })
        // bus.$emit("allowMenu",this.items)

        // this.items = this.items.filter(it =>{
        //     // console.log(it)
        //     if(!it.subs || !it.subs.length || it.hide){
        //         return false;
        //     }
            
        //     it.subs = it.subs.filter(item =>{
        //         // console.log(item)
        //         if(item.hide){
        //             return false
        //         }
                
        //         // console.log(item)
        //         return true;
        //     })
        //     // console.log(it)
        //     return true;
        // })
        
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
