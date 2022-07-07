import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';

const ContentWrapper = styled.div`
  height: calc(100% - 4rem);
  overflow-y: auto;
  //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
`;

const RowChattingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 89%;
  height: 2rem;
  margin: 0 auto 0 0;
  /* background-color: #e3f8c3; */
  cursor: pointer;
`;

const ChattingRoomPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin: ${(props: box) => props.margin};
  /* background-color: yellowgreen; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const ChattingRoomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 80%;
  height: 2rem;
  margin: auto auto auto 0.625rem;
  /* background-color: #8f68bc; */
`;

const YourChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70%;
  margin: 1rem auto 0 1.25rem;
  /* background: #bdefcd; */
`;

const MyChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 70%;
  margin: 1rem 1.25rem 0 auto;
  /* background: #bdefcd; */
`;

const YourTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto auto 2.625rem;
  background: #ffff7f;
  border-radius: 0px 12px 12px 12px;
  padding: 10px 14px;
`;

const MyTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 auto;
  background: #9addff;
  border-radius: 12px 12px 0px 12px;
  padding: 10px 14px;
`;

type font = {
  size?: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

const MessageSendBox = styled.div`
  position: fixed;
  bottom: 3.5rem;
  height: 3.5rem;
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: row;
  align-items: center;
  background: #ededed;
  z-index: 3;
`;

export const ChattingRoom = () => {
  const nav = useNavigate();

  const [myText, setmyText] = useState<string>('');
  const onChangeMyText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmyText(e.target.value);
  };

  return (
    <NavLayout>
      <PageLayout title="채팅">
        <ContentWrapper>
          <YourChatBox>
            <RowChattingBox
              onClick={() => {
                nav('/chattingroom/'); //뒤에 방번호 넣기
              }}
            >
              <ChattingRoomPhotoBox
                style={{
                  backgroundImage: 'url(/assets/토끼.png)',
                }}
              ></ChattingRoomPhotoBox>
              <ChattingRoomTextBox>
                <KoreanFont size={0.75}>강북멋쟁이5678</KoreanFont>
              </ChattingRoomTextBox>
            </RowChattingBox>
            <YourTextBox>
              <KoreanFont size={1}>안녕하세요, 여러분!</KoreanFont>
            </YourTextBox>
          </YourChatBox>
          <YourChatBox>
            <RowChattingBox
              onClick={() => {
                nav('/chattingroom/'); //뒤에 방번호 넣기
              }}
            >
              <ChattingRoomPhotoBox
                style={{
                  backgroundImage: 'url(/assets/토끼.png)',
                }}
              ></ChattingRoomPhotoBox>
              <ChattingRoomTextBox>
                <KoreanFont size={0.75}>강북멋쟁이5678</KoreanFont>
              </ChattingRoomTextBox>
            </RowChattingBox>
            <YourTextBox>
              <KoreanFont size={1}>
                장마철이라서 운동하기 너무 힘드네요 ㅠㅠ 같이 얘기하면서 서로 응원해주는 거 어떨까요??
              </KoreanFont>
            </YourTextBox>
          </YourChatBox>

          <MyChatBox>
            <MyTextBox>
              <KoreanFont size={1}>
                맞아요ㅠㅠ 우리 다같이 서로 응원해요! 저는 요즘 한강에 가는 것을 좋아해요!
              </KoreanFont>
            </MyTextBox>
          </MyChatBox>
        </ContentWrapper>
        <MessageSendBox>
          <RowBox width={'89%'} height={2.75} margin={'auto'}>
            <InputInfo
              width={'90%'}
              height={2.75}
              margin={'0'}
              type="text"
              placeholder="메시지를 입력해주세요"
              name="myText"
              value={myText}
              onChange={onChangeMyText}
              style={{
                border: 'none',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            ></InputInfo>
            <Box
              width={'10%'}
              height={2.75}
              margin={'0'}
              style={{
                border: 'none',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '27px',
                backgroundImage: 'url(/assets/send.svg)',
                cursor: 'pointer',
              }}
              // onClick={() => {
              //   const goJoin = {
              //     email: email,
              //     nick: nickname,
              //     password: password,
              //   };
              //   Join(goJoin);
              // }}
            ></Box>
          </RowBox>
        </MessageSendBox>
      </PageLayout>
    </NavLayout>
  );
};
