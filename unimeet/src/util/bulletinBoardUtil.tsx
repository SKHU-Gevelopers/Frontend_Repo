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
  e: React.MouseEvent<HTMLButtonElement>,
  postId: number,
  likedPosts: number[],
  setLikedPosts: React.Dispatch<React.SetStateAction<number[]>>
): Promise<any> => {
  e.preventDefault();
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

    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
    // 좋아요 클릭 후 데이터 다시 불러오기
    const updatedData = await getPostsData(accessToken, refreshToken);
    return updatedData;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return clickLike(
          newAccessToken,
          newRefreshToken,
          e,
          postId,
          likedPosts,
          setLikedPosts
        );
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
    const response = await axios.get(`임시 url`, {
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
