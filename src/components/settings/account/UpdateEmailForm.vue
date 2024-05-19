<script setup lang="ts">
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
} from "firebase/auth";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";

const currentUser = useCurrentUser();

const form = ref({
  currentPassword: "",
  newEmail: "",
});

async function handleUpdateEmail() {
  if (!currentUser.value?.email || !form.value.currentPassword || !form.value.newEmail) {
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(
      currentUser.value.email,
      form.value.currentPassword
    );

    await reauthenticateWithCredential(currentUser.value, credential);
    await updateEmail(currentUser.value, form.value.newEmail);
    alert("Email updated!");
  } catch (e) {
    console.error("Error updating email: ", e);
  }
}

async function handleSendVerificationEmail() {
  if (!currentUser.value) {
    return;
  }

  try {
    await sendEmailVerification(currentUser.value);
  } catch (e) {
    console.error("Error sending email verification: ", e);
  }
}
</script>

<template>
  <h3>Update Email</h3>

  <!-- Email is not verified ❌ -->
  <div v-if="!currentUser?.emailVerified">
    You need to verify your email before update.
    <button @click="handleSendVerificationEmail">Get Verification Email</button>
  </div>
  <!-- Email is verified ✅ -->
  <form
    v-else
    class="tw-space-y-4"
    @submit.prevent="handleUpdateEmail"
  >
    <div class="tw-grid">
      <label for="e-current-password">Current Password</label>
      <input
        id="e-current-password"
        v-model="form.currentPassword"
        placeholder="Current password"
        type="password"
        required
      />
    </div>

    <div class="tw-grid">
      <label for="e-new-email">New Email</label>
      <input
        id="e-new-email"
        v-model="form.newEmail"
        placeholder="New email"
        type="email"
        required
      />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
