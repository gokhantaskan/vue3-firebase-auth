<!-- This page is for a custom password reset email redirection -->
<!-- URL example: http://example.com/reset-password?oobCode=XXX -->

<script setup lang="ts">
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const route = useRoute();
const router = useRouter();
const oobCode = computed(() => route.query.oobCode);

const form = ref({
  password: "",
});

async function handleResetPassword() {
  if (!auth || !form.value.password || typeof oobCode.value !== "string") {
    return;
  }

  try {
    await verifyPasswordResetCode(auth, oobCode.value);
    await confirmPasswordReset(auth, oobCode.value, form.value.password);
    alert("A new password has been set!");
    router.push({ name: "LoginView" });
  } catch (e) {
    console.error("Error resetting password: ", e);
    alert(e);
  }
}
</script>

<template>
  <div class="tw-border tw-rounded tw-p-8 tw-bg-gray-50">
    <h1 class="tw-mb-4">Reset Password</h1>

    <form
      class="tw-space-y-4"
      @submit.prevent="handleResetPassword"
    >
      <div class="tw-grid">
        <label for="password">New Password</label>
        <input
          id="password"
          v-model="form.password"
          placeholder="Email"
          type="email"
          required
        />
      </div>

      <button
        class="tw-w-full"
        type="submit"
      >
        Reset
      </button>
    </form>
  </div>

  <div class="tw-text-center">
    <RouterLink :to="{ name: 'LoginView' }">Return to login</RouterLink>
  </div>
</template>
