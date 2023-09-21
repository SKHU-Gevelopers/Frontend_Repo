import { CommentBox, CommentBtn, CommentInput, CommentInputForm, CommentWrap, PeopleImage, UserProfileWrap } from "@/styles/componentsStyle/commentStyle";

const Comments = () => {
  return (
    <CommentBox>
      <CommentInputForm>
        <CommentInput></CommentInput>
        <CommentBtn>전송</CommentBtn>
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
