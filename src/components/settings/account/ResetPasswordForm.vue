<script setup lang="ts">
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { ref } from "vue";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

async function handleResetPassword() {
  const user = auth?.currentUser;

  if (!user?.email || form.value.newPassword !== form.value.confirmNewPassword) {
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, form.value.currentPassword);

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, form.value.newPassword);
    alert("Password updated!");
  } catch (e) {
    console.error("Error updating password: ", e);
  }
}
</script>

<template>
  <form
    class="tw-space-y-4"
    @submit.prevent="handleResetPassword"
  >
    <h3>Reset Password</h3>

    <div class="tw-grid">
      <label for="current-password">Current Password</label>
      <input
        id="current-password"
        v-model="form.currentPassword"
        placeholder="Current password"
        type="password"
        required
      />
    </div>

    <div class="tw-grid">
      <label for="new-password">New Password</label>
      <input
        id="new-password"
        v-model="form.newPassword"
        placeholder="New password"
        type="password"
        required
      />
    </div>

    <div class="tw-grid">
      <label for="confirm-new-password">Confirm New Password</label>
      <input
        id="confirm-new-password"
        v-model="form.confirmNewPassword"
        placeholder="Confirm new password"
        type="password"
        required
      />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
