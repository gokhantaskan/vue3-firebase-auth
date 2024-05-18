import { defineStore } from "pinia";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

import { FB_EXPIRATION_DATE } from "@/constants";
import { convertDateToMs } from "@/utils/date";

export const useUserStore = defineStore("user", () => {
  const _fbUser = useCurrentUser();

  const user = computed(() => {
    if (!_fbUser.value) {
      return null;
    }

    return {
      uid: _fbUser.value.uid,
      email: _fbUser.value.email,
      emailVerified: _fbUser.value.emailVerified,
      providerData: _fbUser.value.providerData,
      lastLoginAt: convertDateToMs(_fbUser.value.metadata.lastSignInTime),
    };
  });

  const route = useRoute();
  const router = useRouter();

  watch(user, async (currentUser, previousUser) => {
    // redirect to login if they logout and the current
    // route is only for authenticated users
    if (!currentUser && previousUser && route.meta.requiresAuth) {
      localStorage.removeItem(FB_EXPIRATION_DATE);
      router.push({ name: "LoginView" });

      // Insted of push, you can refresh the page with the login path
      // const loginPath = router.getRoutes().find(r => r.name === "LoginView")?.path;
      // window.location.href = loginPath ?? "";
    }

    // redirect the user if they are logged in but were
    // rejected because the user wasn't ready yet, logged in
    // then got back to this page
    if (currentUser && typeof route.query.redirect === "string") {
      return router.push(route.query.redirect);
    }
  });

  return {
    user,
  };
});
