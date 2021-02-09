import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/member/:memId',
    name: 'Member',
    component: () => import('../views/Member.vue')
  },
  {
    path: '/sensor/:desc/mchid/:mchId',
    name: 'Sensor',
    component: () => import('../views/Sensor.vue'),
  },
  {
    path: '/three',
    name: 'Three',
    component: () => import('../views/Three.vue')
  },
  {
    path: '/admin/:aid',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/memberManage',
    name: 'MemberManage',
    component: () => import('../views/MemberManage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  let memId = VueCookie.get("memId");
  let adminId = VueCookie.get("adminId");
  if( (memId==null && adminId==null) && to.fullPath!="/")  {
    alert("please log in");
    router.push("/");
  } else if(memId!=null && to.fullPath == "/"){
    router.push("/member/"+memId);
  } else if(adminId!=null && to.fullPath == "/"){
    router.push("/admin/"+adminId);
  } else{
    next();
  }
});

export default router
