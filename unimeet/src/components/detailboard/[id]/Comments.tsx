import {
  CommentBox,
  CommentBtn,
  CommentInput,
  CommentInputForm,
  CommentWrap,
  PeopleImage,
  UserProfileWrap,
} from "@/styles/componentsStyle/commentStyle";
import { postcomments } from "@/util/boardUtil/commentUtil";
import { parseCookies } from "nookies";
import { use, useEffect, useState } from "react";

interface CommentsProps {
  id: number;
  comments: any[];
}

export const Comments: React.FC<CommentsProps> = (props) => {
  const { id, comments } = props;
  const [commentlist, setCommentList] = useState(comments);
  const [comment, setComment] = useState("");

  const postComment = () => {
    // 댓글 작성
    console.log(comment);
    console.log(id);
    const cookie = parseCookies();
    const accessToken = cookie["accessToken"];
    const refreshToken = cookie["refreshToken"];
    postcomments(accessToken, refreshToken, id, comment).then((res) => {
      console.log(res);
    });
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
      {commentlist.map((comment) => {
        return (
          <div key={comment}>
            <UserProfileWrap>
              {/* <PeopleImage
                src={"/dogImage.png"}
                alt={""}
                width={35}
                height={35}
              /> */}
              <span>{comment.student.nickname}</span>
            </UserProfileWrap>
            <CommentWrap>
              <div>{comment.content}</div>
              <button>삭제</button>
            </CommentWrap>
          </div>
        );
      })}
    </CommentBox>
  );
};

export default Comments;
