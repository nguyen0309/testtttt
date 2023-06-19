import { api } from "@/library/api";

export function useCategoryService() {
  const get = async () => {
    return api.fetch("user/categories").then((res) => {
      return res;
    });
  };

  return {
    get,
  };
}
