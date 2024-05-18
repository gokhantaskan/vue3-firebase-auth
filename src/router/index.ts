import { createRouter, createWebHistory } from "vue-router";

import authGuard from "@/middleware/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "AuthRoot",
      component: () => import("@/views/auth.vue"),
      redirect: { name: "LoginView" },
      children: [
        {
          path: "login",
          name: "LoginView",
          component: () => import("@/views/auth/login.vue"),
        },
        {
          path: "register",
          name: "RegisterView",
          component: () => import("../views/auth/register.vue"),
        },
        {
          path: "forgot-password",
          name: "ForgotPasswordView",
          component: () => import("../views/auth/forgot-password.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "AppRoot",
      component: () => import("@/views/app.vue"),
      beforeEnter: authGuard,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "HomeView",
          component: () => import("@/views/app/home.vue"),
        },
        {
          path: "about",
          name: "AboutView",
          component: () => import("@/views/app/about.vue"),
        },
      ],
    },
  ],
});

export default router;
