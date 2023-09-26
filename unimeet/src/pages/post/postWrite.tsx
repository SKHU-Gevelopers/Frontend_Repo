import { FileInput, PictureInput, SendImg } from "@/styles/applyStyle";
import { GenderInput, GenderLabel, MyDict } from "../signup";
import { FindImage, ImageCoordinate } from "../LockMypage";
import { PostWirteMainDiv } from "@/styles/postStyle/postStyle";
import UnderNav from "@/components/UnderNav";

export default function PostWrite() {
  return (
    <PostWirteMainDiv>
      <form>
        <label>title</label>
        <input></input>
        <label>content</label>
        <input></input>
        <label>maxPeople</label>
        <select></select>
        <MyDict className="mydict">
          <div>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="FEMALE"
                //   onChange={handleOptionChange}
              />
              <span className="Women">Women</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="MALE"
                //   onChange={handleOptionChange}
              />
              <span className="Men">Men</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="NONE"
                //   onChange={handleOptionChange}
              />
              <span className="Divided">Divided</span>
            </GenderLabel>
          </div>
        </MyDict>
        <PictureInput className="inputDiv">
                <label htmlFor="file">
                  <FindImage className="upload">사진 선택하기</FindImage>
                </label>
                <FileInput
                //   onChange={onChangeFile}
                  type="file"
                  name="meetUpImage=@"
                  id="file"
                />
                <ImageCoordinate>
                  <SendImg
                    src={""}
                    width={110}
                    height={110}
                    alt="Picture of the author"
                  />
                </ImageCoordinate>
              </PictureInput>
      </form>
      <UnderNav />
    </PostWirteMainDiv>
  );
}
