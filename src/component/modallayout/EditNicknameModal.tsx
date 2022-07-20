import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { registerApi, userApi } from '../../api/callApi';
import { AxiosError } from 'axios';
import { userInfo } from 'os';

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
  width: ${(props: box) => props.width};
  height: 34.8rem;
  border-radius: 20px 20px 0px 0px;
  margin: auto auto 0 auto;
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
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: none;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

type btnable = {
  width: number | string;
  height: number | string;
  margin: string;
  isDisable: boolean;
};

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#f3f3f3' : '#8ac2f0')};

  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};

  &:hover {
    ${(props: btnable) =>
      props.isDisable
        ? ''
        : `color: white;
    background-color: #358edc;`}
  }
`;

const EditNicknameModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameOk, setnicknameOk] = useState<boolean>(false);
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const CheckNickname = (asValue: string) => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/;
    return regExp.test(asValue);
  };

  //닉네임 중복확인 API
  const NickCertificationData = useMutation((nick: { nick: string }) => registerApi.nickCertificationApi(nick), {
    onSuccess: () => {
      // loginToken(token.headers.authorization.split(' ')[1]);
      console.log();
      alert(`${nickname}으로 닉네임이 설정되었습니다.`);
      setnicknameOk(true);
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
        <ModalBackground onClick={() => setmodalGather({ ...modalGather, editNicknameModal: false })}>
          <BoxWrap
            width={'100%'}
            height={34.8}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <RowBox width="92%" height={1.875} margin={'2.5rem 1.25rem 0rem 1.25rem'}>
              <Box width={'3.5rem'} margin={'auto auto auto 0rem'}>
                <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                  닉네임
                </KoreanFont>
              </Box>
              <Box
                width={'1.5rem'}
                height={1.5}
                margin={'auto 0rem auto auto'}
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(/assets/X.svg)',
                }}
              ></Box>
            </RowBox>
            <RowBox width={'92%'} margin={'2.3125rem 1.25rem 0rem 1.25rem'}>
              <RowBox width={'73.3%'} margin={'0'} style={{ borderBottom: '1px solid black' }}>
                <InputInfo
                  width={'85%'}
                  height={2.5}
                  margin={'0px auto 0px 0rem'}
                  type="text"
                  placeholder="ex) 빨강바지3456"
                  name="nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                ></InputInfo>
                <Box
                  width={'8%'}
                  height={1.5}
                  margin={'auto 0rem auto auto'}
                  style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '24px',
                    backgroundImage: nicknameOk ? 'url(/assets/checkfull.png)' : 'url(/assets/checkempty.svg)',
                  }}
                  onClick={() => {
                    setmodalGather({ ...modalGather, editNicknameModal: false });
                  }}
                ></Box>
              </RowBox>
              <BtnAble
                isDisable={!CheckNickname(nickname)}
                width={'19.4%'}
                height={2.625}
                margin={'0px 0rem 0px auto'}
                onClick={
                  CheckNickname(nickname)
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
                <KoreanFont size={1}>중복확인</KoreanFont>
              </BtnAble>
            </RowBox>
            <BoxSide width={'92%'} height={1.3125} margin={'0.375rem auto 0px auto'}>
              {nickname ? (
                <CheckFont size={0.75} color={'blue'} isCorrect={CheckNickname(nickname)}>
                  {CheckNickname(nickname)
                    ? '사용 가능한 형식입니다. 중복 확인 버튼을 눌러주세요.'
                    : '닉네임 형식을 확인해 주세요.'}
                </CheckFont>
              ) : (
                <CheckFont size={0.75} color={'black'}>
                  닉네임은 2-15자의 한글, 영어, 숫자입니다.
                </CheckFont>
              )}
            </BoxSide>
            <BtnAble
              isDisable={!CheckNickname(nickname)}
              width={'92%'}
              height={4}
              margin={'7.375rem auto 10rem auto'}
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
              <KoreanFont size={1}>닉네임 변경 완료</KoreanFont>
            </BtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default EditNicknameModal;
