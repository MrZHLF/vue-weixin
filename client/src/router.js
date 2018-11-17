import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/Index.vue";
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "",
          redirect: "/chats"
        },
        {
          path: "/chats",
          name: "chats",
          component: Chats => require(["./views/Chats.vue"], Chats)
        },
        {
          path: "/contacts",
          name: "contacts",
          component: Contacts => require(["./views/Contacts.vue"], Contacts)
        },
        {
          path: "/discover",
          name: "discover",
          component: Discover => require(["./views/Discover.vue"], Discover)
        },
        {
          path: "/me",
          name: "me",
          component: Me => require(["./views/Me.vue"], Me)
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login => require(["./views/Login.vue"], Login)
    },
    {
      path: "/register",
      name: "register",
      component: Register => require(["./views/Register.vue"], Register)
    },
    {
      path: "/moments",
      name: "moments",
      component: Moments => require(["./views/Moments.vue"], Moments)
    },
    {
      path: "/pubilsh",
      name: "pubilsh",
      component: Pubilsh => require(["./views/Pubilsh.vue"], Pubilsh)
    }
  ]
});


// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.xwToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});




export default router;