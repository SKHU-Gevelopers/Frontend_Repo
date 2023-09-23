import {
  CommentBox,
  CommentBtn,
  CommentInput,
  CommentInputForm,
  CommentWrap,
  PeopleImage,
  UserProfileWrap,
} from "@/styles/componentsStyle/commentStyle";
import { postcomments } from "@/util/boardUtil/detailBoardUtil";
import { useRouter } from "next/router";
import { useState } from "react";

interface CommentsProps {
  accessToken: string;
  refreshToken: string;
  id: number;
}

export const Comments: React.FC<CommentsProps> = ({
  accessToken,
  refreshToken,
  id,
}) => {
  const [comment, setComment] = useState("");

  const postComment = () => {
    // 댓글 작성
    console.log(comment);
    console.log(id);
    // postcomments(accessToken, refreshToken, id, comment).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <CommentBox>
      <CommentInputForm onSubmit={postComment}>
        <CommentInput
          type="text"
          onChange={(e) => {
            setComment(e.target.value), console.log(comment);
          }}
        ></CommentInput>
        <CommentBtn type="submit">전송</CommentBtn>
      </CommentInputForm>
      <div>
        <UserProfileWrap>
          <PeopleImage src={"/dogImage.png"} alt={""} width={35} height={35} />
          <span>작성자</span>
        </UserProfileWrap>
        <CommentWrap>
          <div>댓글dfasfadasdasdasdadasdasddsadsdasfasf</div>
          <button>삭제</button>
        </CommentWrap>
      </div>
    </CommentBox>
  );
};

export default Comments;
