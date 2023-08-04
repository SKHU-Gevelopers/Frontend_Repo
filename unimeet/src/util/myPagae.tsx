import axios from "axios";

export const MypageRequest = (token: string): Promise<any> => {
  return axios.get("https://unimeet.duckdns.org/users/my-page", {
    headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        "Accept": "application/json",
        "Authorization": "Bearer "+token,
    }
  });
}
