import config from "@/config";

class ApiServer {
  async fetch(cmd, args = {}, method = "") {
    if (!method) method = Object.keys(args).length === 0 ? "GET" : "POST";
    let url = config.beUrl + "/" + cmd;
    if (Object.keys(args).length && method === "GET") {
      url += "?" + new URLSearchParams(args).toString();
    }
    const token = localStorage.getItem("token");
    let headers = {};
    if (token) {
      headers = {
        "x-access-token": token,
      };
    }
    const options =
      method === "GET"
        ? { headers }
        : {
            method,
            headers: {
              ...headers,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(args),
          };
    return fetch(url, options).then((res) => res.json());
  }
}

export const api = new ApiServer();
