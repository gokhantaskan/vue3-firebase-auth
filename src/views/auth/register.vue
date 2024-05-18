<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, toValue } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleRegister() {
  if (
    !auth ||
    Object.values(toValue(form)).some(i => Boolean(i) === false) ||
    form.value.password !== form.value.confirmPassword
  ) {
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, form.value.email, form.value.password);
    router.push({ name: "LoginView" });
  } catch (e) {
    console.error("Error creating user with email and password: ", e);
    alert(e);
  }
}
</script>

<template>
  <div class="tw-border tw-rounded tw-p-8 tw-bg-gray-50">
    <h1 class="tw-mb-4">Register</h1>

    <form
      class="tw-space-y-4"
      @submit.prevent="handleRegister"
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

      <div class="tw-grid">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          placeholder="Password"
          type="password"
          required
        />
      </div>

      <div class="tw-grid">
        <label for="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          v-model="form.confirmPassword"
          placeholder="Password"
          type="password"
          required
        />
      </div>

      <button
        class="tw-w-full"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>

  <div class="tw-text-center">
    Already registered? <RouterLink :to="{ name: 'LoginView' }">Return to login</RouterLink>
  </div>
</template>
