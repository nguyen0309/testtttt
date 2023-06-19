import { api } from "@/library/api";

export function useVoucherService() {
  const get = async () => {
    return api.fetch("user/vouchers").then((res) => {
      return res;
    });
  };
  const filter = async (category_id) => {
    return api.fetch("user/vouchers?category_id=" + category_id).then((res) => {
      return res;
    });
  };
  const getById = async (id) => {
    return api.fetch("user/vouchers/" + id).then((res) => {
      return res;
    });
  };
  return {
    get,
    filter,
    getById
  };
}
