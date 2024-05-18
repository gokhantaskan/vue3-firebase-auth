<script setup lang="ts">
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const router = useRouter();

const form = ref({
  email: "",
});

async function handleSendEmail() {
  if (!auth || !form.value.email) {
    return;
  }

  try {
    await sendPasswordResetEmail(auth, form.value.email);
    alert("Email instructions has been sent!");
    router.push({ name: "LoginView" });
  } catch (e) {
    // If the user can't be found, we don't want to show an error message.
    if (e instanceof FirebaseError && e.code === AuthErrorCodes.USER_DELETED) {
      alert("Email instructions has been sent!");
      return;
    }

    console.error("Error sending password reset email: ", e);
    alert(e);
  }
}
</script>

<template>
  <div class="tw-border tw-rounded tw-p-8 tw-bg-gray-50">
    <h1 class="tw-mb-4">Forgot Password?</h1>

    <form
      class="tw-space-y-4"
      @submit.prevent="handleSendEmail"
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

      <button
        class="tw-w-full"
        type="submit"
      >
        Send Instructions
      </button>
    </form>
  </div>

  <div class="tw-text-center">
    <RouterLink :to="{ name: 'LoginView' }">Return to login</RouterLink>
  </div>
</template>
