import { api } from "@/library/api";
import { useUserStore } from "@/stores/user";

export function useAuthService() {
  const userStore = useUserStore();

  const login = async (mobile_number, password) => {
    return api
      .fetch("sessions", {
        mobile_number,
        password,
      })
      .then((res) => {
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
        }
        return res;
      });
  };
  const signup = async (user) => {
    return api
      .fetch("registrations", {
        user,
      })
      .then((res) => {
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token);
        }
        return res;
      });
  };
  const validateToken = async (token) => {
    return api
      .fetch("account_tokens/validate", {
        token,
      })
      .then((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res;
      });
  };
  const forgotPassword = async (email) => {
    return api.fetch("passwords/forgot", { email }).then((res) => {
      return res;
    });
  };

  const logout = async () => {
    userStore.updateUser(null);
    localStorage.remove("token");
    return true;
  };

  return {
    login,
    signup,
    logout,
    forgotPassword,
    validateToken
  };
}
