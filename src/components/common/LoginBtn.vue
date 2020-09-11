<template>
  <div class="btnparent" @click="registerClick">
  <div class="loginbtn">{{btntext}}</div>
  </div>
</template>

<script>
    export default {
        props:['btntext'],
        methods:{
            registerClick(){
                this.$emit('registerSubmit')
            }
        },
        name: "LoginBtn"
    }
</script>

<style scoped>
  .btnparent{
    padding: 4.167vw 2.778vw;
  }
.loginbtn{
  height: 12.5vw;
  background-color: #ff9db5;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 6.25vw;
}
</style>