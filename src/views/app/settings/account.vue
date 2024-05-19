<!-- 
  Update email has enumeration issue,
  visit https://stackoverflow.com/questions/77147854/firebase-please-verify-the-new-email-before-changing-email-auth-operation-not 
-->
<script setup lang="ts">
// import UpdateEmailForm from "@/components/settings/account/UpdateEmailForm.vue";
import UpdatePasswordForm from "@/components/settings/account/UpdatePasswordForm.vue";
</script>

<template>
  <h2 class="tw-mb-4">Account Settings</h2>

  <div class="tw-space-y-4">
    <section class="tw-border tw-rounded tw-bg-gray-50 tw-p-4">
      <UpdatePasswordForm />
    </section>
    <!-- <section class="tw-border tw-rounded tw-bg-gray-50 tw-p-4">
      <UpdateEmailForm />
    </section> -->
  </div>
</template>
