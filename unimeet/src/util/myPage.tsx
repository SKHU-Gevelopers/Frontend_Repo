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

export function handleSubmit(e: any) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  // You can pass formData as a fetch body directly:
  fetch("/some-api", { method: form.method, body: formData });

  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson);
}

export const MypageCorrection=(token:string):Promise<any>=>{
  return axios.post("https://unimeet.duckdns.org/users/my-page",{
    headers: {
      "Content-Type": `application/json;charset=UTF-8`,
      "Accept": "application/json",
      "Authorization": "Bearer "+token,
    }
  })
}