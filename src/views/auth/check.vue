<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { isAuthorized } from "@/stores/user";

const router = useRouter();
onMounted(() => {
  if (isAuthorized() !== null) {
    router.push("/dashboard");
  } else router.push("/login");
});
</script>
<template>checking...</template>

<style scoped></style>
