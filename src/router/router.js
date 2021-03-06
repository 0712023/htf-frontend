import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () => import ('../views/Home.vue')
    },
    {
        path: '/member/:memId',
        name: 'Member',
        component: () => import ('../views/Member/Member.vue')
    },
    {
        path: '/vendor/:vendorId',
        name: 'Vendor',
        component: () => import ('../views/Vendor/Vendor.vue')
    },
    {
        path: '/sensor/:desc/mchid/:mchId/type/:type',
        name: 'Sensor',
        component: () => import ('../views/Member/Sensor.vue'),
    },
    {
        path: '/three',
        name: 'Three',
        component: () => import ('../views/Member/Three.vue')
    },
    {
        path: '/admin/:aid',
        name: 'Admin',
        component: () => import ('../views/Admin/Admin.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import ('../views/Member/Setting.vue')
    },
    {
        path: '/subscribe',
        name: 'Subscribe',
        component: () => import ('../views/Member/Subscribe.vue')
    },
    {
        path: '/memberManage',
        name: 'MemberManage',
        component: () => import ('../views/Admin/MemberManage.vue')
    },
    {
        path: '/machineManage',
        name: 'MachineManage',
        component: () => import ('../views/Vendor/MachineManage.vue')
    },
    {
        path: '/memberKakaoToken',
        name: 'MemberKakaoToken',
        component: () => import ('../views/Kakao/MemberToken.vue')
    },
    {
        path: '/adminKakaoToken',
        name: 'AdminKakaoToken',
        component: () => import ('../views/Kakao/AdminToken.vue')
    },
    {
        path: '/kakaoSub',
        name: 'KakaoSub',
        component: () => import ('../views/Kakao/KakaoSub.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    // eslint-disable-next-line no-undef
    base: process.env.BASE_URL,
    routes
})
//모든 route 이동 전 실행되는 함수
router.beforeEach(function(to, from, next) {
    let memId = VueCookies.get("memId");
    let adminId = VueCookies.get("adminId");
    let vendorId = VueCookies.get("vendorId");
    let memRank = VueCookies.get("memRank");
    if (to.path == "/adminKakaoToken" || to.path == "/kakaoSub") {
        //admin register 시 kakaotoken 획득 및 member가 정기 구독 요청 위해 생성한 페이지 이동
        next();
    }
    if ((memId == null && adminId == null && vendorId == null) && to.path != "/") {
        //member, admin, vender 로그인 없이 'login'페이지 외 접근시 차단
        alert("please log in");
        router.push("/");
    }
    if (memRank === "null" && memId != null) {
        VueCookies.set("memRank", 'temp');
        //member 로그인 시 구독 정보(memRank) 없을 시 항상 강제로 subscribe 페이지로 이동
        router.push("/subscribe");
        VueCookies.set("memRank", 'null');
    }
    if (memId != null && to.fullPath == "/") {
        //member 로그인 상태에서 'login'페이지 접근시 차단
        router.push("/member/" + memId);
    }
    if (adminId != null && to.fullPath == "/") {
        //admin 로그인 상태에서 'login'페이지 접근시 차단
        router.push("/admin/" + adminId);
    }
    if (vendorId != null && to.fullPath == "/") {
        //vendor 로그인 상태에서 'login'페이지 접근시 차단
        router.push("/vendor/" + vendorId);
    }
    //그 외에는 전부 원하는 페이지로 이동
    next();
});

export default router