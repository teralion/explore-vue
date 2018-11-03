import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Users from "./pages/Users.vue";
import Edit from "./pages/Edit.vue";
import Add from "./pages/Add.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/list",
      name: "users",
      component: Users
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Edit
    },
    {
      path: "/add",
      name: "add",
      component: Add
    }
  ]
});
