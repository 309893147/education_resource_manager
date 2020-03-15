import router from './index'
import bus from '../components/common/bus'
let  permissions = []
let whiteList = ["/403","/login","/dashbaord","/404"]
bus.$on("allowMenu",(e)=>{
    console.log(e[0])
    console.log("allowMenu")
    if(e[0].subs){
        e[0].subs.forEach(item => {
            permissions.push(item.index)
        });
    }
    console.log(permissions)
})

router.beforeEach((to,from,next)=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user && user.info && user.info.type =='SUPER_MANAGER'){
        next()
        return
    }
    if(to.path =='/login'){
        next()
        return
    }
    if(!user){
        next({path:"/login"})
        return
    }
    if(whiteList.indexOf(to.path) >-1){
        next()
        return
    }
    if(permissions.indexOf(to.path) ==-1){
        next({path:"/403"})
        return
    }
    next()

})