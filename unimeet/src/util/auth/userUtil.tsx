import axios from "axios";

export const requestToken = ()=>{
    axios.post(`https://unimeet.duckdns.org/token/reissue`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    // .then((res) => {
    //     const accessToken = res.data.data.accessToken;
    //     const refreshToken = res.data.data.refreshToken;
    //     localStorage.setItem("accessToken", accessToken);
    //     setCookie(null, "accessToken", accessToken, {
    //         maxAge: 30 * 24 * 60 * 60, // 30일
    //         path: "/", // 쿠키 경로
    //     });
    //     localStorage.setItem("refreshToken", refreshToken);
    //     setCookie(null, "refresh-token", refreshToken, {
    //         maxAge: 30 * 24 * 60 * 60, // 30일
    //         path: "/", // 쿠키 경로
    //     });
    //     localStorage.setItem("login-token", accessToken);
    //     router.push("/bulletinBoard");
    // }   
    // .catch((err) => {
    //     alert("아이디 또는 비밀번호가 틀렸습니다."),
    //     console.log(err),
    //     console.log(err.response);
    // }

}
