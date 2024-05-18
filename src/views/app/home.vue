<script setup lang="ts">
import { useBearerToken } from "@/composables/useBearerToken";

const { bearerToken } = useBearerToken();
</script>

<template>
  <main class="tw-container">
    <h1>Home</h1>
    <p>{{ `${bearerToken?.slice(0, 12)}...${bearerToken?.slice(-12)}` }}</p>
  </main>
</template>
