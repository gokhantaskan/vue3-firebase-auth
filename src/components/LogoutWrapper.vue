<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();

async function handleLogout() {
  if (!auth) {
    return;
  }

  try {
    await signOut(auth);
  } catch (e) {
    console.error("Error signing out: ", e);
    alert(e);
  }
}
</script>

<template>
  <slot :logout="handleLogout">
    <button @click="handleLogout">Logout</button>
  </slot>
</template>
