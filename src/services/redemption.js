import { api } from "@/library/api";

export function useRedemptionService() {
  const get = async () => {
    return api.fetch("user/redemptions/stats").then((res) => {
      return res;
    });
  };
  const claim = async (claim_quantity, voucher_id) => {
    return api
      .fetch("user/redemptions/claim", {
        claim_quantity,
        voucher_id,
      })
      .then((res) => {
        return res;
      });
  };

  return {
    get,
    claim,
  };
}
