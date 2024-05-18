<script setup lang="ts">
import Logo from "@/assets/logo.svg";
</script>

<template>
  <div class="tw-container tw-py-12 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8">
    <Logo height="64" />
    <div class="tw-w-full tw-max-w-screen-sm">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
:deep(h1) {
  text-align: center;
}
</style>
