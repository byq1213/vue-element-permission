<template>
  <div>
    <h3 v-text="this.$route.fullPath"></h3>
  </div>
</template>

<script>
  export default {
    mounted(){
      // console.log(this.$router);
      // console.log(this.$route.fullPath);
      
    }
  }
</script>

<style scoped>

</style>