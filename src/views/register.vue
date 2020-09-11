<template>
  <div>
    <login-top middleTop="注册billbill">
      <div slot="right" style="font-size:3.611vw " @click="$router.push('/login')">登录</div>
    </login-top>

    <Logintext label="姓名"
               style="margin: 4.167vw 0;"
               placeholder="请输入姓名"
               rule="^.{6,16}$"
               @inputChange="res=>model.name=res"
    />
    <Logintext label="账号"
               placeholder="请输入账号"
               rule="^.{6,16}$"
               @inputChange="res=>model.username=res"
    />
    <Logintext label="密码"
               placeholder="请输入密码"
               type="password"
               rule="^.{6,16}$"
               @inputChange="res=>model.password=res"
    />
    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>

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
                name:'',
                username:'',
                password:''
            }
          }
        },
      methods:{
         async registerSubmit(){
             let rulg = /^.{6,16}$/
              if(rulg.test(this.model.name )&&rulg.test(this.model.username )&&rulg.test(this.model.password )){
               let res = await this.$http.post('/register',this.model)
                  this.$msg.fail(res.data.msg)
                  localStorage.setItem('id',res.data.id)
                  localStorage.setItem('id',res.data.objtoken)
                  setTimeout(()=>{
                      this.$router.push('/userinfo')
                  },2000)
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