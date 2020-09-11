<template>
  <div>
    <van-field v-model="content"
               :label="label"
               :type="type"
               :placeholder="placeholder"
               :rule="rule"

    />
  </div>
</template>

<script>
    export default {
        data(){
          return{
              content:''
            }
        },
        name: "Logintext",
        props:['label','type','placeholder','rule'],
        methods:{
          handlerulg(){
            let rule = new RegExp(this.rule)
            if(rule.test(this.content)){
              this.$emit('inputChange',this.content)
            }
          },
        },
        watch:{
            content(){
             this.handlerulg()
            }
        }
    }
</script>

<style scoped>

</style>