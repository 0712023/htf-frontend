import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/member/:memId',
        name: 'Member',
        component: () =>
            import ('../views/Member.vue')
    },
    {
        path: '/vendor/:vendorId',
        name: 'Vendor',
        component: () =>
            import ('../views/Vendor.vue')
    },
    {
        path: '/sensor/:desc/mchid/:mchId',
        name: 'Sensor',
        component: () =>
            import ('../views/Sensor.vue'),
    },
    {
        path: '/three',
        name: 'Three',
        component: () =>
            import ('../views/Three.vue')
    },
    {
        path: '/admin/:aid',
        name: 'Admin',
        component: () =>
            import ('../views/Admin.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () =>
            import ('../views/Setting.vue')
    },
    {
        path: '/subscribe',
        name: 'Subscribe',
        component: () =>
            import ('../views/Subscribe.vue')
    },
    {
        path: '/memberManage',
        name: 'MemberManage',
        component: () =>
            import ('../views/MemberManage.vue')
    },
    {
        path: '/machineManage',
        name: 'MachineManage',
        component: () =>
            import ('../views/MachineManage.vue')
    },
    {
        path: '/memberKakaoToken',
        name: 'MemberKakaoToken',
        component: () =>
            import ('../views/KakaoToken/MemberToken.vue')
    },
    {
        path: '/adminKakaoToken',
        name: 'AdminKakaoToken',
        component: () =>
            import ('../views/KakaoToken/AdminToken.vue')
    },
    {
        path: '/kakaoSub',
        name: 'KakaoSub',
        component: () =>
            import ('../views/KakaoSub.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    // eslint-disable-next-line no-undef
    base: process.env.BASE_URL,
    routes
})
router.beforeEach(function(to, from, next) {
    let memId = VueCookie.get("memId");
    let adminId = VueCookie.get("adminId");
    let vendorId = VueCookie.get("vendorId");
    if (to.path == "/adminKakaoToken" || to.path == "/kakaoSub") {
        next();
    } else if ((memId == null && adminId == null && vendorId == null) && to.fullPath != "/") {
        alert("please log in");
        router.push("/");
    } else if (memId != null && to.fullPath == "/") {
        router.push("/member/" + memId);
    } else if (adminId != null && to.fullPath == "/") {
        router.push("/admin/" + adminId);
    } else if (vendorId != null && to.fullPath == "/") {
        router.push("/vendor/" + vendorId);
    } else {
        next();
    }
});

export default router