<script setup>
import VrpButton from "@/components/button.vue";
import { useAuthService } from "@/services/auth";
import { ref, watch } from "vue";
import { validateEmail } from "@/library/helper.js";

const email = ref("");
const emailError = ref(false);
const checkInput = ref(true);

watch(email, (value) => {
  if (value != "") {
    checkInput.value = false;
    emailError.value = false;
  } else checkInput.value = true;
});

const sendRequest = async () => {
  try {
    if (!validateEmail(email.value)) {
      emailError.value = true;
      return;
    }
    const res = await useAuthService().forgotPassword(email.value);
    if (res.data) window.location.href = "/login";
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="login">
    <div class="font-extrabold text-black text-4xl mb-4">Forgot password</div>
    <div class="note-text font-normal mb-10">By signing up, you agree to our Terms, Data Policy and Cookies Policy.</div>
    <div class="mb-10">
      <div class="label">Email address</div>
      <div class="mb-1">
        <input v-model="email" type="email" name="email" id="email" class="input w-full" placeholder="you@example.com" />
      </div>
      <div class="invalid" v-if="emailError">Invalid email format</div>
    </div>
    <vrp-button :text="'Submit'" :disable="checkInput" @custom-event="sendRequest" />
  </div>
</template>
<style lang="scss" scoped>
.note-text {
  font-size: 16px;
  line-height: 28px;
  color: #6b7280;
}
.label {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #374151;
  margin-bottom: 4px;
}
.input {
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 16px 13px;
}

.invalid {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ef4444;
}
</style>
