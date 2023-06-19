<script setup>
import { reactive, ref, watch, computed, onUnmounted, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { validateEmail, validatePassword } from "../../library/helper";
import VrpButton from "@/components/button.vue";
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useAuthService } from "@/services/auth";
import { useUserStore } from "@/stores/user";

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const router = useRouter();
const route = useRoute();
const wrongFormat = ref(false);
const different = ref(false);
const welcome = ref(false);
const email = ref("");
const phone = ref();
const password = ref("");
const password_confirmation = ref("");
const checkInput = ref(false);
const user = reactive({});
const disable = ref(false);

const year = computed(() => {
  return Array.from({ length: new Date().getFullYear() - 1929 }, (_, index) => 1930 + index);
});

watch([password, password_confirmation], ([value1, value2]) => {
  console.log("value1", value1);
  console.log("value2", value2);
  // if (value1 != "" && value2 != "") checkInput.value = false;
  // if (value1 == "" || value2 == "") checkInput.value = true;
});

const toWelcome = () => {
  if (!validatePassword(password.value)) {
    wrongFormat.value = true;
    return;
  } else wrongFormat.value = false;

  if (password.value !== password_confirmation.value) {
    different.value = true;
    return;
  } else different.value = false;
  welcome.value = true;
};
const signup = async () => {
  try {
    user.password = password.value;
    user.password_confirmation = password_confirmation.value;
    const res = await useAuthService().signup(user);
    if (res && res.data.access_token) router.push("/success");
  } catch (e) {
    console.log(e);
  }
};
const getUserInfo = async (token) => {
  try {
    const res = await useAuthService().validateToken(token);
    if (res?.data) {
      email.value = res.data.email;
      phone.value = res.data.mobile_number.slice(1);
      user.token = res.data.token;
      disable.value = true;
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  console.log("route", route.query.token);
  if (route.query.token) {
    getUserInfo(route.query.token);
  }
});
</script>
<template>
  <div class="signup">
    <div class="font-extrabold text-black text-4xl mb-4">{{ welcome == false ? "Sign up" : "Welcome!" }}</div>
    <div class="note-text font-normal mb-10">
      {{ welcome == false ? "By signing up, you agree to our Terms, Data Policy and Cookies Policy." : "Let’s complete your profile." }}
    </div>
    <div v-if="!welcome">
      <div class="mb-4">
        <div class="label">Email address</div>
        <div>
          <input
            v-model="email"
            :disabled="disable"
            type="email"
            name="email"
            id="email"
            class="input w-full"
            :class="{ 'disable-input': disable }"
          />
        </div>
      </div>
      <div class="mb-6">
        <div class="label">Phone number</div>
        <div>
          <input
            v-model="phone"
            :disabled="disable"
            type="number"
            name="phone"
            id="phone"
            class="input w-full"
            :class="{ 'disable-input': disable }"
          />
        </div>
      </div>
      <div class="mb-4">
        <div class="label">Password</div>
        <div class="relative">
          <input v-model="password" type="password" name="password" id="password" class="input w-full" :class="{ 'validate-error': wrongFormat }" />
          <img v-if="wrongFormat" class="img" src="@/assets/image/validate.png" alt="validate" />
        </div>
      </div>
      <div class="note mb-4" :class="{ 'wrong-format': wrongFormat }">Min 8 characters, 1 lower, 1 upper, 1 digit</div>
      <div :class="{ 'mgb-4': different }" class="mb-8">
        <div class="label">Confirm Password</div>
        <div>
          <input
            v-model="password_confirmation"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            class="input w-full"
            :class="{ 'validate-error': different }"
          />
          <img v-if="different" class="img" src="@/assets/image/validate.png" alt="validate" />
        </div>
      </div>
      <div class="invalid mb-4" v-if="different">Confirm Password do not match!</div>
      <vrp-button :text="'Continue'" :disable="checkInput" @custom-event="toWelcome" class="mb-5" />
      <div class="log-in">You had had an account? <span class="blue-text cursor-pointer" @click="router.push('/login')">Login</span></div>
    </div>
    <div v-else>
      <div class="mb-4">
        <Listbox as="div" v-model="user.gender">
          <div class="label">Gender</div>
          <div class="relative mt-2">
            <ListboxButton class="w-full select">
              <span class="text-input">{{ user.gender }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption as="template" v-for="i in gender" :key="i.value" :value="i.value" v-slot="{ active, selected }">
                  <li :class="[active ? 'gray-bg select-text' : 'unselect-text', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.label }}</span>
                    <span
                      v-if="user.gender"
                      :class="[active ? 'select-text' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"
                    >
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="mb-8">
        <Listbox as="div" v-model="user.birth_year">
          <div class="label">Birth year</div>
          <div class="relative mt-2">
            <ListboxButton class="w-full select">
              <span class="text-input">{{ user.birth_year }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions
                class="selext-box absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption as="template" v-for="i in year" :key="i" :value="i" v-slot="{ active, selected }">
                  <li :class="[active ? 'gray-bg select-text' : 'unselect-text', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i }}</span>
                    <span v-if="i" :class="[active ? 'select-text' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"> </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <vrp-button :text="'Sign up'" :disable="checkInput" @custom-event="signup" />
    </div>
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

.log-in {
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  color: #374151;
  .blue-text {
    color: #2563eb;
  }
}
.wrong-format {
  color: #ef4444;
}
.invalid {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ef4444;
}
.validate-error {
  background: #ffe9f3 !important;
  color: #7f1d1d !important;
}
.img {
  position: absolute;
  right: 15px;
  top: 20px;
}
.mgb-4 {
  margin-bottom: 1rem !important;
}
.input {
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 16px 13px;
}
.disable-input {
  background: #e5e7eb !important;
  color: #6B7280 !important;
}
</style>
