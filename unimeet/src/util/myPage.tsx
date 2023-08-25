import axios from "axios";

export const MypageRequest = (token: string): Promise<any> => {
  return axios.get("https://unimeet.duckdns.org/users/my-page", {
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export function handleSubmit(
  token: string,
  mbti: string,
  profileImg: string,
  introduction: string,
  major1: string,
  major2: string
) {
  const formData = new FormData();
  formData.append("mbti", mbti);
  formData.append("profileImg", profileImg);
  formData.append("introduction", introduction);
  formData.append("majors", major1);
  formData.append("majors", major2);

  // You can pass formData as a fetch body directly:
  fetch("https://unimeet.duckdns.org/users/my-page", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export const MypageCorrection = (token: string): Promise<any> => {
  return axios.post("https://unimeet.duckdns.org/users/my-page", {
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
