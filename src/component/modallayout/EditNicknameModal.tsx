import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import { userInfo } from 'os';
import {
  EvAbleFont,
  EvBtnAble,
  EvCheckHelfBox,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../element/BoxStyle';
import { SignUpBtnAble, SignUpInputInfo } from '../../page';

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
  width: 100%;
  height: 30.68rem;
  border-radius: 20px 20px 0px 0px;
  margin: auto auto 0 auto;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const EditNicknameModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameOk, setNicknameOk] = useState<boolean>(false);
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const checkNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  //닉네임 중복확인 API
  const NickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert(`${nickname}은 사용 가능합니다.`);
      setNicknameOk(true);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      alert(error.response?.data.msg);
    },
  });

  const NickCertification = (nick: { nick: string }) => {
    NickCertificationData.mutate(nick);
  };

  //닉네임 변경 완료 API

  const NicknameEditData = useMutation((nick: { nick: string }) => userApi.nicknameEditApi(nick), {
    onSuccess: () => {
      setmodalGather({ ...modalGather, editNicknameModal: false });
      setUserInfoData({ ...userInfoData, nick: nickname });
      alert(`변경 완료!`);
      setNickname('');
      setNicknameOk(false);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => NicknameEdit(), 200);
      } else {
        alert(error.response?.data.msg);
      }
    },
  });

  const goNicknameEdit = { nick: nickname };

  const NicknameEdit = () => {
    NicknameEditData.mutate(goNicknameEdit);
  };

  return (
    <>
      {modalGather.editNicknameModal && (
        <ModalBackground
          onClick={() => {
            setmodalGather({ ...modalGather, editNicknameModal: false });
            setNickname('');
            setNicknameOk(false);
          }}
        >
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvRowBox isAlignSide={true} width="89.3%" height={1.875} margin={'1.625rem 1.25rem 0rem 1.25rem'}>
              <EvFontBox width={'3.5rem'} margin={'auto auto auto 0rem'}>
                <EvKoreanFont size={1.25} weight={700} color="#1A1A1A">
                  닉네임
                </EvKoreanFont>
              </EvFontBox>
              <EvImgBox
                width={'1rem'}
                height={1}
                margin={'auto 0rem auto auto'}
                url="url(/assets/X.svg)"
                isCursor={true}
                onClick={() => {
                  setmodalGather({ ...modalGather, editNicknameModal: false });
                  setNickname('');
                }}
              />
            </EvRowBox>

            <EvRowBox width={'89.3%'} margin={'3.125rem 1.25rem 0rem 1.25rem'}>
              <EvRowBox width={'73.3%'} margin={'0'} style={{ borderBottom: '1px solid black' }}>
                <SignUpInputInfo
                  type="text"
                  placeholder="예) 오늘투두윗"
                  name="nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                />
                <EvCheckHelfBox
                  width={'15%'}
                  height={3.75}
                  margin={'0'}
                  backgroundsize={'1.5rem'}
                  url={nicknameOk ? 'url(/assets/checkyellow.svg)' : 'url(/assets/checkgray.svg)'}
                />
              </EvRowBox>

              <SignUpBtnAble
                isDisable={!checkNickname(nickname)}
                width={'19.4%'}
                height={2.625}
                margin={'0px 0rem 0px auto'}
                onClick={
                  checkNickname(nickname)
                    ? () => {
                        const goNickCertification = {
                          nick: nickname,
                        };
                        NickCertification(goNickCertification);
                      }
                    : () => {
                        null;
                      }
                }
              >
                <EvAbleFont size={0.875} color="#939393" weight={500} isDisable={!checkNickname(nickname)}>
                  {nicknameOk ? '확인완료' : '중복확인'}
                </EvAbleFont>
              </SignUpBtnAble>
            </EvRowBox>

            <EvFontBox isAlignSide={true} width={'92%'} height={1.3125} margin={'0.375rem auto 0px 5.3%'}>
              {nickname ? (
                <CheckFont size={0.75} color={'blue'} isCorrect={checkNickname(nickname)}>
                  {checkNickname(nickname)
                    ? '사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.'
                    : '닉네임 형식을 확인해 주세요.'}
                </CheckFont>
              ) : (
                <CheckFont size={0.75} color={'black'}>
                  닉네임은 2-15자의 한글, 영어, 숫자입니다.
                </CheckFont>
              )}
            </EvFontBox>
            <EvBtnAble
              isDisable={!nicknameOk}
              width={'89.3%'}
              height={3.75}
              margin={'6.25rem auto auto auto'}
              onClick={
                nicknameOk
                  ? () => {
                      NicknameEdit();
                    }
                  : () => {
                      null;
                    }
              }
            >
              <EvAbleFont size={1.0625} isDisable={!nicknameOk} weight={700}>
                닉네임 변경 완료
              </EvAbleFont>
            </EvBtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default EditNicknameModal;
