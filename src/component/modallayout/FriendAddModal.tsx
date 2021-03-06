import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { editNicknameModalState, friendAddModalState, userNicknameState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { friendApi, registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';

const Slide = keyframes`
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
`;

const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 76%;
  height: 17.8125rem;
  border-radius: 12px;
  margin: auto 2.8125rem;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #caff8a; */
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
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
  /* background-color: #ff6969; */
`;

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
  isDisable?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => (props.isDisable ? '#989898' : '#1A1A1A')};
  display: flex;
  margin: 0 0 0 0;
`;

const InputInfo = styled.input`
  text-align: center;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 10px;
  width: 84.2%;
  height: 3.75rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

type btnable = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isDisable?: boolean;
};

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  width: 84.2%;
  height: 3.75rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#FFD600' : '#F7F7F7;')};

  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};

  &:hover {
    ${(props: btnable) =>
      props.isDisable
        ? ''
        : `color: white;
    background-color:  ;`}
  }
`;

const FriendAddModal = () => {
  const [modalFriendAdd, setModalFriendAdd] = useRecoilState(friendAddModalState);
  const [friendnickname, setFriendNickname] = useState<string>('');

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFriendNickname(e.target.value);
  };

  //????????? ???????????? API
  const friendAddData = useMutation((nick: { nick: string }) => friendApi.friendAddApi(nick), {
    onSuccess: (token) => {
      console.log(token);
      alert(`${friendnickname}?????? ?????? ????????? ???????????????!`);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => friendAdd(), 200);
      } else {
        alert(error.response?.data.msg);
      }
    },
  });

  const goFriendAdd = { nick: friendnickname };

  const friendAdd = () => {
    friendAddData.mutate(goFriendAdd);
  };

  return (
    <>
      {modalFriendAdd && (
        <ModalBackground onClick={() => setModalFriendAdd(false)}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Box margin={'1.875rem auto 0.9375rem auto'}>
              <KoreanFont size={1.25} color="rgba(147, 147, 147, 1)">
                ?????? ??????
              </KoreanFont>
            </Box>
            <InputInfo
              type="text"
              placeholder="????????? ???????????? ??????????????????"
              name="nickname"
              value={friendnickname}
              onChange={onChangeNickname}
            ></InputInfo>
            <BtnAble
              margin="0.625rem auto 1.875rem auto"
              onClick={() => {
                friendAdd();
              }}
            >
              <KoreanFont size={0.9375} color="rgba(147, 147, 147, 1)">
                ????????????
              </KoreanFont>
            </BtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default FriendAddModal;
