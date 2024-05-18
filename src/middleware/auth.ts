import type { NavigationGuard, RouteLocationNormalized } from "vue-router";
import { getCurrentUser } from "vuefire";

import { useBearerToken } from "@/composables/useBearerToken";

const authGuard: NavigationGuard = async to => {
  // If the Firebase user can't be found, redirect to the login page
  if (!(await getCurrentUser())) {
    return navigateToLoginWithRedirectQuery(to);
  }

  const { bearerToken, getIdTokenResult } = useBearerToken();

  if (!bearerToken) {
    try {
      await getIdTokenResult();
    } catch (e) {
      console.error("Error in auth middleware: ", e);
      return navigateToLoginWithRedirectQuery(to);
    }
  }
};

export default authGuard;

function navigateToLoginWithRedirectQuery(to: RouteLocationNormalized) {
  return {
    name: "LoginView",
    ...(to.name !== "HomeView" ? { query: { redirect: to.fullPath } } : {}),
  };
}
