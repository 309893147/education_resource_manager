import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            icon: 'el-icon-lx-home',
            meta: { title: '首页',whitelist:true }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            icon: 'el-icon-lx-home',
            name: "home",
            meta: { title: '自述文件' },
            children: [

                {
                    path: '/permission',
                    component: () => import("../components/page/auth/permission.vue"),
                    meta: { title: '权限', permission: true },
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/index/index.vue'),
                    icon: 'el-icon-lx-home',
                    meta: { title: '系统首页' },
                    children:[
                        {
                            path: '',
                            component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/index/index.vue'),
                            meta: { title: '系统首页' },
                        }
                        
                    ]
                },
                {
                    path: '/personal/changePwd',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/personal/changePwd.vue'),
                    meta: { title: '修改密码' },
                    hide:true
                },

                 {
                    path: "/resource",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-chat-line-round",
                    meta: { title: "资源管理" },
                    children: [
                        {
                            path: "resourceList",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "tabs" */ '../components/views/resources/resourceList.vue'),
                            meta: { title: "教育资源" }
                        },

                        {
                            path: "resourceAdd",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "tabs" */ '../components/views/resources/resourceAdd.vue'),
                            meta: { title: "教育资源新增" },
                            hide:true
                        },

                        { 
                            path: "resourceType", 
                            icon: "el-icon-lx-home", 
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/base/type.vue'),
                            meta: { title: "教育资源类型" } 
                        }, 
                        {   
                            path: "resourceTypeAdd", 
                            icon: "el-icon-lx-home", 
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/base/typeAdd.vue'),
                            meta: { title: "教育资源类型新增" },
                            hide:true
                        }, 

                    ]
                },


                {
                    path: "/Jurisdiction",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-key",
                    meta: { title: "权限管理" },
                    children: [
                        {
                            path:'managerList',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/Jurisdiction/managerList.vue'),
                            meta:{ title: "管理员列表" },
                            // hide:true
                        },
                        {
                            path:'managerAdd',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/Jurisdiction/managerAdd.vue'),
                            meta:{ title: "新增管理员" },
                            hide:true
                        },
                        {
                            path:'managerApplyList',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/Jurisdiction/managerApplyList.vue'),
                            meta:{ title: "用户申请管理员列表" },
                            //hide:true
                        },
                        {
                            path:'list',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/Jurisdiction/list.vue'),
                            meta:{ title: "后台功能权限" },
                             hide:true
                        }
                    ]
                },
           

                {
                    path: "/ticket",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-chat-line-round",
                    meta: { title: "资源求助" },
                    children: [
                        {
                            path: "ticketList",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "tabs" */ '../components/views/resources/resourceList.vue'),
                            meta: { title: "求助列表" }
                        },

                        {
                            path: "ticketAdd",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "tabs" */ '../components/views/resources/resourceAdd.vue'),
                            meta: { title: "编辑求助" },
                            hide:true
                        },

                    ]
                },

                {
                    path: "/user",
                     component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-s-custom",
                    meta: { title: "用户管理" },
                    children: [
                        {
                            path: "index",
                            component: () => import("../components/views/user/user.vue"),
                            icon: "el-icon-lx-home",
                            meta: { title: "用户管理" }
                        },
                        {
                            path: "dealFeedback",
                            icon: "el-icon-lx-home",
                            component: () => import("../components/views/user/dealFeedback.vue"),
                            meta: { title: "反馈信息" }
                        },

            

                    ]
                },
            
    
                {
                    path: "/banner",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-picture-outline",
                    meta: { title: "Banner管理" },
                    children: [
                        {
                            path: "index",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/banner/index.vue'),
                            meta: { title: "Banner管理" }
                        },
                        {
                            path: "bannerAdd",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/banner/bannerAdd.vue'),
                            meta: { title: "添加信息" },
                            hide:true
                        }
                    ]
                },
      
                {
                    path: "/notice",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-bell",
                    meta: { title: "公告通知管理" },
                    children: [
                        {
                            path: "noticeList",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/notice/noticeList.vue'),
                            meta: { title: " 公告通知管理" }
                        },
                        {
                            path: "noticeAdd",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/notice/noticeAdd.vue'),
                            meta: { title: "公告通知新增" },
                            hide:true
                        }
                    ]
                },
                {
                    path: "/question",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-discover",
                    meta: { title: "常见问题" },
                    children:
                        [
                            {
                                path: "problem",
                                icon: "el-icon-lx-home",
                                component: () => import(/* webpackChunkName: "icon" */ '../components/views/question/problem.vue'),
                                meta: { title: "常见问题" }
                            },
                            {   
                                path: "problemAdd", 
                                icon: "el-icon-lx-home", 
                                component: () => import(/* webpackChunkName: "icon" */ '../components/views/question/problemAdd.vue'),
                                meta: { title: "常见问题新增" },
                                hide:true
                            }, 
                        ]
                },
        
                { 
                    path: "/base", 
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-help", 
                    meta: { title: "基础类型设置" }, 
                    children: [
                    
                        { 
                            path: "notice", 
                            icon: "el-icon-lx-home", 
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/base/notice.vue'),
                            meta: { title: "公告通知类型" } 
                        }, 
                        {   
                            path: "noticeAdd", 
                            icon: "el-icon-lx-home", 
                            component: () => import(/* webpackChunkName: "icon" */ '../components/views/base/noticeAdd.vue'),
                            meta: { title: "公告通知新增" },
                            hide:true
                        }, 
                       
        

                    ] 
                }, 
                // { 
                //     path: "/styem", 
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                //     icon: "el-icon-s-tools", 
                //     meta: { title: "系统管理" }, 
                //     children: [
                //         { 
                //             path: "work", 
                //             icon: "el-icon-lx-home", 
                //             component: () => import(/* webpackChunkName: "icon" */ '../components/views/styem/work.vue'),
                //             meta: { title: "操作日志管理" } 
                //         }, 
                //         { 
                //             path: "index", 
                //             icon: "el-icon-lx-home", 
                //             component: () => import(/* webpackChunkName: "icon" */ '../components/views/styem/index.vue'),
                //             meta: { title: "系统日志管理" } 
                //         }
                //     ] 
                // },
       
        
                {
                    path: "/settings",
                    component: () => import(/* webpackChunkName: "icon" */ '../components/views/block.vue'),
                    icon: "el-icon-setting",
                    meta: { title: "设置" },
                    children: [
                  
                        {
                            path: "styem",
                            icon: "el-icon-lx-home",
                            component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/settings/index.vue'),
                            meta: { title: "系统设置" }
                        }
                    ]
                },

            ]
        },
        {
            path: '/login',
            icon: 'el-icon-lx-home',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            icon:'el-icon-lx-home',
            redirect: '/404',
            meta: { title: '404' }
        }
    ]
});
