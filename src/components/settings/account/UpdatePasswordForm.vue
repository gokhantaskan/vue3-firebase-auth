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

async function handleUpdatePassword() {
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
  <h3>Update Password</h3>

  <form
    class="tw-space-y-4"
    @submit.prevent="handleUpdatePassword"
  >
    <div class="tw-grid">
      <label for="p-current-password">Current Password</label>
      <input
        id="p-current-password"
        v-model="form.currentPassword"
        placeholder="Current password"
        type="password"
        required
      />
    </div>

    <div class="tw-grid">
      <label for="p-new-password">New Password</label>
      <input
        id="p-new-password"
        v-model="form.newPassword"
        placeholder="New password"
        type="password"
        required
      />
    </div>

    <div class="tw-grid">
      <label for="p-confirm-new-password">Confirm New Password</label>
      <input
        id="p-confirm-new-password"
        v-model="form.confirmNewPassword"
        placeholder="Confirm new password"
        type="password"
        required
      />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
