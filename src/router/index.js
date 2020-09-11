import Vue from 'vue'
import VueRouter from 'vue-router'
const register = ()=>import('@/views/register.vue')
const login = ()=>import('@/views/Login.vue')
const userinfo = ()=>import('@/views/userinfo.vue')
const edit = ()=>import('@/views/Edit.vue')
const Home = ()=>import('@/views/Home.vue')
const article = ()=>import('@/views/Article.vue')
const EditCategory =()=>import('@/views/EditCategory.vue')

Vue.use(VueRouter)
const routes = [

    {
        path:'/register',
        component:register
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/article/:id',
        component:article,
    },
    {
        path:'/userinfo',
        component:userinfo,
        meta:{
            istoken:true
        }
    },
    {
        path:'/edit',
        component:edit,
        meta:{
            istoken:true
        }
    },
    {
        path:'/',
        component:Home,
        meta:{
            keepalive:true
        }
    },
    {
        path:'/EditCategory',
        component:EditCategory,
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

router.beforeEach((to,from,next) => {
    if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
        router.push('/login')
        Vue.prototype.$msg.fail('请重新登录')
        return
    }
    next()
})

export default router
