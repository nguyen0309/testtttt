import { defineStore } from "pinia";

export const isAuthorized = () => window.localStorage.getItem("token");

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    birthYear: null,
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    update(userInfo) {
      this.id = userInfo.volunteer_id;
      this.email = userInfo.email;
      this.name = userInfo.name;
      this.phone = userInfo.mobile_number;
      this.token = userInfo.token;
    },
  },
});
