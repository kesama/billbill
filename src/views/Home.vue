<template>
  <div class="home" v-if="category">
<Navbar></Navbar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/EditCategory')"><van-icon name="setting-o" />

      </div>
    <van-tabs v-model="active" swipeable sticky animated>
    <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
      <van-list
              v-model="item.loading"
              :immediate-check="false"
              :finished="item.finished"
              finished-text="到底辣！"
              @load="onLoad"
      >


      <div class="detailparent">
        <detail class="detailitem"
        :detailitem="categoryitem"
         v-for="(categoryitem,categoryindex) in item.list"
         :key="categoryindex"></detail>
      </div>
      </van-list>
    </van-tab>
  </van-tabs>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import Detail from './Detail.vue'


export default {
    data(){
      return{
          category:[],
          active:0
      };
    },
  name: 'Home',
  components: {
      Navbar,Detail
  },
    activated() {
        if(localStorage.getItem('newcate')) {
            let newcate = JSON.parse(localStorage.getItem('newcate'))
            this.category = this.changeCategory(newcate)
            this.selectArticle();
        }
    },
    methods:{
        async selectCategory() {
            if(localStorage.getItem('newcate')) {
                return
            }
            const res = await this.$http.get("/category");
            this.category = this.changeCategory(res.data);
            this.selectArticle();
        },
        changeCategory(data){
           const category1=data.map((item,index)=>{
               item.list=[];
               item.page=0;
               item.finished=false;
               item.loading=true;
               item.pagesize=10;
                 return item;
           })
             return category1
            this.selectArticle()
        },
        async selectArticle(){
           const categoryitem =this.categoryItem()
           const res = await this.$http.get('/detail/' + categoryitem._id,{
               params:{
                   page:categoryitem.page,
                       pagesize:categoryitem.pagesize

               }
            })
            // console.log(res.data);
            categoryitem.list.push(...res.data)
            categoryitem.loading=false
            if(res.data.length<categoryitem.pagesize){
                categoryitem.finished=true
            }
        },
        onLoad(){
        const categoryitem =this.categoryItem()
       setTimeout(()=>{
           categoryitem.page +=1
           this.selectArticle()
       },1000)
        },
        categoryItem(){
          const categoryitem=this.category[this.active]
            return categoryitem
        },
    },
    watch:{
        active() {
            const categoryitem = this.categoryItem();
            if (!categoryitem.list.length) {
                this.selectArticle();
            }
        }
    },
    created() {
      this.selectCategory()
    }
}
</script>

<style lang="less">
  .home {
    background-color: white;
  }
  .detailparent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem {
      margin: 1.389vw 0;
      width: 45%;
    }
  }
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      padding: 1.389vw 2.778vw;
      background-color: white;
    }
  }
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      padding: 1.389vw 2.778vw;
      background-color: white;
    }
  }

</style>