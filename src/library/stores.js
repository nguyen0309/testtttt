import { userStore } from "@/stores/user";
const stores = {};
setTimeout(() => {
  if (window.stores) {
    window.location.reload();
  }
  Object.assign(stores, {
    user: userStore(),
  });
  window.stores = stores;
});

export default {
  install: (app, options) => {
    app.config.globalProperties.$stores = stores;
  },
};
