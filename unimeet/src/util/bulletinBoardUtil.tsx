import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";
import { requestToken } from "./myPage";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  state: string;
  maxPeople: number;
  gender: string;
  profileImageUrl: string;
  nickname: string;
  likes: number;
}

export const BulletinBoardUtil = () => {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [data, setData] = useState<Post[]>([]);
  const [token, setToken] = useState(accessToken);

  const searchUrl = "https://unimeet.duckdns.org/posts";

  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const getPostsData = async () => {
    try {
      setToken(accessToken || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${searchUrl}`, {
          headers,
        });
        setData(response.data.data.posts);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        try {
          const { newAccessToken } = await requestToken(refreshToken);
          setToken(newAccessToken);
        } catch (error: any) {
          console.log("Failed to refresh token:", error);
        }
      }
    }
  };

  const clickLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault();
    try {
      setToken(accessToken || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await axios.put(
          `https://unimeet.duckdns.org/posts/${postId}/like`,
          "게시글 좋아요",
          { headers }
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
          setLikedPosts([...likedPosts, postId]);
        }

        const updatedResponse = await axios.get(`${searchUrl}`, {
          headers,
        });
        setData(updatedResponse.data.data.posts);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        try {
          const { newAccessToken } = await requestToken(refreshToken);
          setToken(newAccessToken);
        } catch (error: any) {
          console.log("Failed to refresh token:", error);
        }
      }
    }
  };

  return { data, token, likedPosts, getPostsData, clickLike };
};
