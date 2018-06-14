<template>
  <div>
    <!-- 权限管理 -->
    <el-row>
      <el-col :span="12">
        <el-tree
    :data="routes"
    :props="props"
    default-expand-all
    show-checkbox
    @check-change="changeTree"
    ></el-tree>
      </el-col>
      <el-col :span="12">
        <p v-text="cheakedTree">

        </p>
        <p v-text="this.$store.state.user.roles"></p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        label: (data, node) => {
          return data.meta ? data.meta.title : data.path;
        },
        children: "children"
      },
      cheakedTree:[],
    };
  },
  computed: {
    routes() {
      let routers = this.$router.options.routes;
      let filters = ["/login", "/404", "*", "/"];
      var a = routers.filter(item => {
        return !filters.includes(item.path);
      });
      return a;
    }
  },
  methods: {
    changeTree(data, checked, indeterminate,) {
      if(!data.hasOwnProperty('children')){
        if(checked){
          // 选中执行
          this.cheakedTree.push(data.name)
        }else{
          this.cheakedTree.forEach((item,index) => {
            if(item == data.name){
              this.cheakedTree.splice(index,1)
            }
          });
        }
      }
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
</style>