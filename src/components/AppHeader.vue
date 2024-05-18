<script setup lang="ts">
import { storeToRefs } from "pinia";

import Logo from "@/assets/logo.svg";
import LogoutWrapper from "@/components/LogoutWrapper.vue";
import { useUserStore } from "@/stores/userStore";

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <div class="tw-border-b tw-bg-gray-50 tw-py-4">
    <div class="tw-container tw-flex tw-items-center tw-justify-between tw-gap-4">
      <nav class="flex-vertically-aligned">
        <Logo width="24" />
        <ul class="tw-list-none tw-p-0 flex-vertically-aligned">
          <li>
            <RouterLink :to="{ name: 'HomeView' }">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'AboutView' }">About</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex-vertically-aligned">
        <RouterLink :to="{ name: 'SettingsRoot' }">{{ user?.email }}</RouterLink>
        <LogoutWrapper v-slot="{ logout }">
          <button
            class="tw-ml-auto"
            @click="logout"
          >
            Logout
          </button>
        </LogoutWrapper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-vertically-aligned {
  @apply tw-flex tw-items-center tw-gap-2;
}
</style>
