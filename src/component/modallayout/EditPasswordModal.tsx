import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { editPasswordModalState } from '../../recoil/store';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { registerApi } from '../../api/callApi';

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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #ffffff;
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
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
  /* background-color: #683b3b; */
`;

type font = {
  size: number;
  color: string;
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
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width}rem;
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

const EditPasswordModal = () => {
  const [modalEditPassword, setModalEditPassword] = useRecoilState(editPasswordModalState);
  const [nickname, setNickname] = useState<string>('');
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
    },
    onError: () => {
      alert('중복된 닉네임입니다.');
    },
  });

  const NickCertification = (nick: { nick: string }) => {
    NickCertificationData.mutate(nick);
  };

  return (
    <>
      {modalEditPassword && (
        <ModalBackground onClick={() => setModalEditPassword(false)}>
          <Box
            width={23.4375}
            height={15}
            style={{ borderRadius: '20px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Box width={'350px'} height={1.5} margin={'1.125rem auto 0.625rem 1.25rem'}>
              <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                이메일 : ccimayoung@naver.com
              </KoreanFont>
            </Box>
            <Box width={2.8125} height={1.5} margin={'1.5rem 19.375rem 0.625rem 1.25rem'}>
              {nickname && (
                <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                  닉네임
                </KoreanFont>
              )}
            </Box>
            <RowBox width={'100%'} margin={'0px 0px 0px 0px'}>
              <InputInfo
                width={15.6875}
                height={2.5}
                margin={'0px 0.6875rem 0px 1.25rem'}
                type="text"
                placeholder="닉네임    ex) 빨강바지3456"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              ></InputInfo>

              <BtnAble
                isDisable={!CheckNickname(nickname)}
                width={4.5625}
                height={2.625}
                margin={'0px 1.25rem 0px 0px'}
                onClick={() => {
                  const goNickCertification = {
                    nick: nickname,
                  };
                  NickCertification(goNickCertification);
                }}
              >
                중복확인
              </BtnAble>
            </RowBox>
            <BoxSide width={20} height={1.3125} margin={'0.3125rem 2.1875rem 0px 1.25rem'}>
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
          </Box>
        </ModalBackground>
      )}
    </>
  );
};
export default EditPasswordModal;
