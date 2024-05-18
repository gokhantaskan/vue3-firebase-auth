<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, toValue } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

import { useBearerToken } from "@/composables/useBearerToken";

const auth = useFirebaseAuth();
const router = useRouter();
const { getIdTokenResult } = useBearerToken();

const form = ref({
  email: "",
  password: "",
});

async function handleLogin() {
  if (!auth || Object.values(toValue(form)).some(i => Boolean(i) === false)) {
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, form.value.email, form.value.password);
    await getIdTokenResult(true);
    router.push({ name: "HomeView" });
  } catch (e) {
    console.error("Error signing in with email and password: ", e);
    alert(e);
  }
}
</script>

<template>
  <div class="tw-border tw-rounded tw-p-8 tw-bg-gray-50">
    <h1 class="tw-mb-4">Login</h1>

    <form
      class="tw-space-y-4"
      @submit.prevent="handleLogin"
    >
      <div class="tw-grid">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          placeholder="Email"
          type="email"
          required
        />
      </div>

      <div class="tw-grid tw-relative">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          placeholder="Password"
          type="password"
          required
        />
        <RouterLink
          class="tw-absolute tw-top-0 tw-right-0"
          :to="{ name: 'ForgotPasswordView' }"
          >Forgot password?</RouterLink
        >
      </div>

      <button
        class="tw-w-full"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>

  <div class="tw-text-center">
    New to Acme? <RouterLink :to="{ name: 'RegisterView' }">Create an account</RouterLink>
  </div>
</template>
