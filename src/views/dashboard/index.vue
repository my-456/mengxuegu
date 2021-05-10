<template>
  <div class="dashboard-container">
   
  </div>
</template>

<script>
import  {test} from '@/api/test'

export default {
  name: 'Dashboard',
  data(){
    return{

      
    }
  },

  created(){
    test().then(res=>{
      console.log("test",res)
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
