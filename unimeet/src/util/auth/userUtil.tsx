import axios from "axios";

export const requestToken = () => {
  axios.post(`https://unimeet.duckdns.org/token/reissue`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const Logout = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  axios
    .post(`https://unimeet.duckdns.org/sign-out`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    });
};
