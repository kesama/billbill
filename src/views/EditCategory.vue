<template>
<div>
  <Navbar></Navbar>
  <van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">当前总分类</van-divider>

  <div class="new-category">
   <p @click="handleCategoryClick(index)" v-for="(item,index) in newcate" :key="index">{{item.title}}</p>

  </div>
    <van-divider dashed :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }">被删除分类</van-divider>

    <div class="catenewcate">
      <p @click="deleteCategoryClick(index)" v-for="(item,index) in deletecate" :key="index">{{item.title}}</p>
    </div>

</div>
</template>

<script>
  import Navbar from  '@/components/common/Navbar.vue'
    export default {
      data(){
          return{
           newcate:[],
           deletecate:[]
          }
      },
        components:{
            Navbar
        },
        methods:{
            async SelectCategory(){
                const res = await  this.$http.get('/category')
                this.newcate=res.data
            },
            handleCategoryClick(index){
       if(this.newcate.length<4){
           this.$msg.fail('最少保留三个栏目')
           return
       }
                this.deletecate.push(this.newcate[index])
                this.newcate.splice(index,1)
            },
            deleteCategoryClick(index){
                this.newcate.push(this.deletecate[index])
                this.deletecate.splice(index,1)
            }
        },
        watch:{
            newcate(){
          localStorage.setItem('newcate',JSON.stringify(this.newcate))
          localStorage.setItem('deletecate',JSON.stringify(this.deletecate))
            }
        },
        created() {
           if(localStorage.getItem('newcate')&&localStorage.getItem('deletecate')){
               this.newcate=JSON.parse(localStorage.getItem('newcate'))
               this.deletecate=JSON.parse(localStorage.getItem('deletecate'))
               return
           }
            this.selectCategory()
        }
    }
</script>

<style  lang="less">
  .new-category{
    padding: 0 2.778vw;
    display: flex;
     flex-wrap: wrap;

    p{
      width: 20%;
      text-align: center;
      margin: 1.389vw 1.944vw;
      padding: 1.944vw 0vw;
      border: solid 1.5px #1a73e8;
      /*border-radius: 25%;*/
      color: #1a73e8;
    }
  }

  .catenewcate{
    padding: 0 2.778vw;
    display: flex;
    flex-wrap: wrap;
    p{
      width: 20%;
      text-align: center;
      margin: 1.389vw 1.944vw;
      padding: 1.944vw 0vw;
      border: solid 1.5px #ee0a24;
      /*border-radius: 25%;*/
      color: #ee0a24;
    }
  }
</style>