<template>
  <div>
    <login-top middleTop="登录billbill">
      <div slot="right" style="font-size:3.611vw " @click="$router.push('/register')">注册</div>
    </login-top>

    <Logintext label="账号"
               placeholder="请输入账号"
               rule="^.{6,16}$"
               style="margin: 4.167vw 0;"
               @inputChange="res=>model.username=res"
    />
    <Logintext label="密码"
               placeholder="请输入密码"
               type="password"
               rule="^.{6,16}$"
               @inputChange="res=>model.password=res"
    />
    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>

  </div>
</template>

<script>
    import LoginTop from '@/components/common/LoginTop.vue'
    import Logintext from '@/components/common/Logintext.vue'
    import LoginBtn from '@/components/common/LoginBtn.vue'
    export default {
        components:{
            LoginTop,
            Logintext,
            LoginBtn
        },
        data(){
            return{
                model:{

                    username:'',
                    password:''
                }
            }
        },
        methods:{
            async registerSubmit(){
                let rulg = /^.{6,16}$/
                if(rulg.test(this.model.username )&&rulg.test(this.model.password )){
                    let res = await this.$http.post('/login',this.model)
                    this.$msg.fail(res.data.msg)
                    if(res.data.code == 301 || res.data.code == 302){
                        return
                    }
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.id)
                setTimeout(()=>{
                    this.$router.push('/userinfo')
                },1000)
                }else {
                    this.$msg.fail('格式不正确，重新输入')
                }
            }
        },
        name: "register"
    }
</script>

<style scoped>

</style>