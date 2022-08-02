import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { friendApi, registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import { EvAbleFont, EvBtnAble, EvFontBox, EvInputInfo, EvKoreanFont } from '../element/BoxStyle';
import { useCommonConfirm } from '../../hooks/useCommonConfirm';

const Slide = keyframes`
    0% {
        transform: translateY(20%);
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
  z-index: 5;
`;

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

const FriendInputInfo = styled(EvInputInfo)`
  margin: 1rem auto 0 auto;
  width: 84.2%;
  height: 3.75rem;
  ::placeholder {
    text-align: center;
  }
`;

const FriendAddModal = () => {
  const [friendnickname, setFriendNickname] = useState<string>('');
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFriendNickname(e.target.value);
  };
  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  //닉네임 친구추가 API
  const friendAddData = useMutation((nick: { nick: string }) => friendApi.friendAddApi(nick), {
    onSuccess: (token) => {
      openSuccessConfirm({
        title: `${friendnickname}님께 친구 요청을 보냈습니다!`,
      }),
        setmodalGather({ ...modalGather, friendAddModal: false });
      setFriendNickname('');
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      setFriendNickname('');
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => friendAdd(), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const goFriendAdd = { nick: friendnickname };

  const friendAdd = () => {
    friendAddData.mutate(goFriendAdd);
  };

  return (
    <>
      {modalGather.friendAddModal && (
        <ModalBackground
          onClick={() => {
            setmodalGather({ ...modalGather, friendAddModal: false });
            setFriendNickname('');
          }}
        >
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvFontBox margin={'1.875rem auto 0.9375rem auto'}>
              <EvKoreanFont size={1.25} weight={700}>
                친구 추가
              </EvKoreanFont>
            </EvFontBox>
            <FriendInputInfo
              type="text"
              placeholder="친구의 닉네임을 입력해주세요"
              name="nickname"
              value={friendnickname}
              onChange={onChangeNickname}
            ></FriendInputInfo>
            <EvBtnAble
              width="84.2%"
              height={3.75}
              isDisable={!friendnickname}
              margin="0.625rem auto 1.875rem auto"
              onClick={
                friendnickname
                  ? () => {
                      friendAdd();
                    }
                  : () => {
                      null;
                    }
              }
            >
              <EvAbleFont size={0.9375} isDisable={!friendnickname} weight={500}>
                추가하기
              </EvAbleFont>
            </EvBtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default FriendAddModal;
