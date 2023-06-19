<script setup>
import { useRouter } from "vue-router";
import { useAuthService } from "@/services/auth";
import { ref, watch } from "vue";
import VrpButton from "@/components/button.vue";

const router = useRouter();
const phone = ref("");
const password = ref("");
const checkInput = ref(true);

watch([phone, password], ([value1, value2]) => {
  // console.log("value1", value1);
  // console.log("value2", value2);
  if (value1 != "" && value2 != "") checkInput.value = false;
  if (value1 == "" || value2 == "") checkInput.value = true;
});

const login = async () => {
  try {
    const res = await useAuthService().login("+" + phone.value, password.value);
    console.log("res", res);
    if (res && res.data.access_token) window.location.href = "/";
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="login relative">
    <div class="font-extrabold text-black text-4xl mb-4">Login</div>
    <div class="welcome-text font-normal mb-10">Welcome back!</div>
    <div class="mb-6">
      <div class="label">Phone number</div>
      <div>
        <input v-model="phone" type="number" name="phone" id="phone" class="input w-full" />
      </div>
    </div>
    <div class="mb-2">
      <div class="label">Password</div>
      <div>
        <input v-model="password" type="password" name="phone" id="phone" class="input w-full" />
      </div>
    </div>
    <div class="note mb-6">Min 8 characters, 1 lower, 1 upper, 1 digit</div>
    <p class="forgot mb-6 cursor-pointer" @click="router.push('/forgot')">Forgot password</p>
    <vrp-button :text="'Login'" :disable="checkInput" @custom-event="login" class="mb-10" />
    <div class="sign-up">You hadn’t had an account? <span class="blue-text cursor-pointer" @click="router.push('/signup')"> Sign up</span></div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  // height: calc(100vh - 136px);
}
.welcome-text {
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
.note {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
}
.forgot {
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  color: #2563eb;
  width: max-content;
}

.sign-up {
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #374151;
  text-align: center;
  .blue-text {
    color: #2563eb;
  }
}
</style>
