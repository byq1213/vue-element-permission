<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  mounted() {
    // this.filterAsyncRouter();
    console.log('this.$router.options.routes :', this.$router.options.routes);
    // console.log('this.$router :', this.$router);
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      let routes = this.$router.options.routes;
      let roles = this.$store.state.user.roles;

      // var a = routes.filter(item => {
      //   return filters.includes(item.name);
      // });
      // return this.filterAsyncRouter(routes, roles);
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    hasPermission(roles, route) {
      if (route.name) {
        return roles.some(role => route.name.indexOf(role) >= 0);
      } else {
        // if(route.children){
        //   // this.hasPermission(roles,route.children)
        // }
        return true;
      }
    },
    filterAsyncRouter(routes, roles) {
      /**
       * @param {Array} routes 原来所有的路由表
       * @param {Array} roles  可以访问的规则
       *
       * */
      console.log('routes :', routes);
      const accessedRouters = routes.filter(route => {
        if (this.hasPermission(roles, route)) {
          if (route.children && route.children.length) {
            route.children = this.filterAsyncRouter(route.children, roles);
          }
          return true;
        }
        return false;
      });
      console.log("accessedRouters :", accessedRouters);
      return accessedRouters;
    }
  }
};
</script>
