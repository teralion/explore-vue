import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UsersList from "./pages/UsersList.vue";
import EditUser from "./pages/EditUser.vue";

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
      path: "/users",
      name: "usersList",
      component: UsersList
    },
    {
      path: "/users/edit",
      name: "editUser",
      component: EditUser
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
