import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/Layout.vue";
import { isAuthorized } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "check",
      component: () => import("@/views/auth/check.vue"),
    },
    {
      path: "/admin",
      component: Layout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
        },
        {
          path: "/redemption",
          name: "redemption",
          component: () => import("@/views/redemption/index.vue"),
        },
        {
          path: "/redemption/detail/id=:id",
          name: "redemptionDetail",
          component: () => import("@/views/redemption/detail.vue"),
        },
        {
          path: "/voucher",
          name: "voucher",
          component: () => import("@/views/voucher/index.vue"),
        },
        {
          path: "/voucher/detail/id=:id",
          name: "voucherDetail",
          component: () => import("@/views/voucher/detail.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/login.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/auth/signup.vue"),
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () => import("@/views/auth/forgot.vue"),
    },
    {
      path: "/success",
      name: "success",
      component: () => import("@/views/auth/registrationSuccess.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isAuthorized() === null) {
      next({ name: "login" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
