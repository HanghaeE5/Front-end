import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';

const ContentWrapper = styled.div`
  height: 100%;
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

const ChattingRoomPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
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
  width: 80%;
  height: 1.5rem;
  margin: auto auto auto 0.75rem;
  /* background-color: #6922bb; */
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #683b3b; */
`;

const RowChattingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 89%;
  height: 5rem;
  margin: 0 auto 0 auto;
  /* background-color: #ffa6a6; */
  cursor: pointer;
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

type btnbox = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  color?: string;
  isSelect?: boolean;
};

const BtnBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-style: solid;
  border-color: #5f5f5f;
  border-width: ${(props: btnbox) => (props.isSelect ? '1px 1px 0px 1px' : '0px 0px 1px 0px')};
  background-color: ${(props: btnbox) => (props.isSelect ? '#ecee73' : 'white')};
  border-radius: 6px 6px 0px 0px;
  width: 45%;
  height: 2.6875rem;
  margin: '0 0 0 auto';
  background-color: ${(props: btnbox) => props.color};
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #ecee73;
  }
`;

export const Chatting = () => {
  const [chattingList, setChattingList] = useState<boolean>(true);
  const [friendList, setFriendList] = useState<boolean>(false);
  const nav = useNavigate();

  return (
    <NavLayout>
      <PageLayout title="채팅">
        <ContentWrapper>
          <RowBox margin={'1.875rem 0 1.875rem 0'}>
            <BtnBox
              onClick={() => {
                setChattingList(true);
                setFriendList(false);
              }}
              isSelect={chattingList}
            >
              <KoreanFont size={0.875} color="#5F5F5F">
                채팅목록
              </KoreanFont>
            </BtnBox>
            <BtnBox
              onClick={() => {
                setChattingList(false);
                setFriendList(true);
              }}
              isSelect={friendList}
            >
              <KoreanFont size={0.875} color="#5F5F5F">
                친구목록
              </KoreanFont>
            </BtnBox>
          </RowBox>
          {chattingList ? (
            <>
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
                  <KoreanFont size={1}>한강 3KM 달리기!</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
              <RowChattingBox>
                <ChattingRoomPhotoBox
                  style={{
                    backgroundImage: 'url(/assets/토끼.png)',
                  }}
                ></ChattingRoomPhotoBox>
                <ChattingRoomTextBox>
                  <KoreanFont size={1}>모의고사 문제풀이 필요한 사람 모여</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
              <RowChattingBox>
                <ChattingRoomPhotoBox
                  style={{
                    backgroundImage: 'url(/assets/토끼.png)',
                  }}
                ></ChattingRoomPhotoBox>
                <ChattingRoomTextBox>
                  <KoreanFont size={1}>물마시기 챌린지</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
            </>
          ) : (
            <>
              <RowChattingBox>
                <ChattingRoomPhotoBox
                  style={{
                    backgroundImage: 'url(/assets/토끼.png)',
                  }}
                ></ChattingRoomPhotoBox>
                <ChattingRoomTextBox>
                  <KoreanFont size={1}>로제떡볶이</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
              <RowChattingBox>
                <ChattingRoomPhotoBox
                  style={{
                    backgroundImage: 'url(/assets/토끼.png)',
                  }}
                ></ChattingRoomPhotoBox>
                <ChattingRoomTextBox>
                  <KoreanFont size={1}>초코우유</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
              <RowChattingBox>
                <ChattingRoomPhotoBox
                  style={{
                    backgroundImage: 'url(/assets/토끼.png)',
                  }}
                ></ChattingRoomPhotoBox>
                <ChattingRoomTextBox>
                  <KoreanFont size={1}>호랑이</KoreanFont>
                </ChattingRoomTextBox>
              </RowChattingBox>
            </>
          )}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
