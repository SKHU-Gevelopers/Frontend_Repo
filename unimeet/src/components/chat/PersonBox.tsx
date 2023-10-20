import { ChatBox, ChatParentBox, ProfileImage_Chat } from "@/styles/pageStyle/ChatStyle";

const PersonBox = () => {
  return (
    <ChatParentBox>
      <ProfileImage_Chat src={"/heart.png"} width={27} height={27} alt={""} />
      <ChatBox>
        <span className="Sender">채팅상대</span>
        <span className="Value">채팅 내용</span>
      </ChatBox>
    </ChatParentBox>
  );
};
export default PersonBox;
