import axios from "axios";
import { requestToken } from "./myPage";

export const getPostsData = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`https://unimeet.duckdns.org/posts`, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return getPostsData(newAccessToken, newRefreshToken);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const clickLike = async (
  accessToken: string,
  refreshToken: string,
  postId: number
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    await axios.put(
      `https://unimeet.duckdns.org/posts/${postId}/like`,
      "게시글 좋아요",
      { headers }
    );
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return clickLike(newAccessToken, newRefreshToken, postId);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const getBulletinBoardGatheringUp = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`https://unimeet.duckdns.org/posts/like`, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return getBulletinBoardGatheringUp(newAccessToken, newRefreshToken);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
