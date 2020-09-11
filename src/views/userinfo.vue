<template>
  <div class="userinfo">
<Navbar></Navbar>
    <img src="@/assets/img/bg.jpg" alt="" class="backImg"/>

      <userDetail :userInfo="model"></userDetail>

  </div>

</template>

<script>
  import Navbar from '@/components/common/Navbar.vue'
  import userDetail from '@/components/userComponent/userDetail.vue'
    export default {
        data() {
            return {
                model:{}
            }
        },
      components:{
          Navbar,userDetail
      },

        methods:{
            async userData() {
                const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
                this.model = res.data[0]
            }
        },
        created() {
            this.userData()
        },
        name: "userinfo"

    }
</script>

<style scoped lang="less">
.userinfo{
.backImg{
  height: 91px;
  width: 100%;
}
}
</style>