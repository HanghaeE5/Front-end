import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userApi } from '../api/callApi';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper } from '../component/styledComponent/TodoPageComponents';
import { userNicknameState } from '../recoil/store';

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
  background-color: #e0ff91;
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

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const InputInfoNoneBorder = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  /* border-radius: 6px; */
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

export const EditPassword = () => {
  const [prePassword, setPrePassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');

  const [view, setView] = useState<boolean>(false);
  const userNickname = useRecoilValue(userNicknameState);
  const localToken = localStorage.getItem('recoil-persist');

  const nav = useNavigate();

  const onChangePrePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrePassword(e.target.value);
  };
  const onChangeNewPw1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const onChangeNewPw2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword2(e.target.value);
  };

  const checkPassword = (asValue: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{5,15}$/;
    return regExp.test(asValue);
  };

  //비밀번호 변경 API
  const editPasswordData = useMutation(
    (data: { newPassword: string; oldPassword: string }) => userApi.editPasswordApi(data),
    {
      onSuccess: () => {
        console.log();
        alert(`${userNickname}님의 비밀번호가 변경되었습니다`);
        nav('/');
      },
      onError: (error: AxiosError<{ msg: string }>) => {
        if (error.message === 'Request failed with status code 401') {
          setTimeout(() => editPassword({ newPassword: newPassword, oldPassword: prePassword }), 200);
        } else {
          alert(error.response?.data.msg);
        }
      },
    },
  );

  const editPassword = (data: { newPassword: string; oldPassword: string }) => {
    editPasswordData.mutate(data);
  };

  useEffect(() => {
    //useEffect 리턴 바로 위에 써주기.
    if (!localToken) {
      alert('🙅🏻‍♀️로그인이 되어있지 않습니다🙅🏻‍♀️');
      nav('/login');
    }
  }, []);

  return (
    <NavLayout>
      <PageLayout title="비밀번호 변경">
        <ContentWrapper>
          <Box width={'5.4375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
            {prePassword && (
              <KoreanFont size={0.9375} color="#1A1A1A">
                현재 비밀번호
              </KoreanFont>
            )}
          </Box>

          <RowBox
            width={'89.3%'}
            margin={'0.625rem auto 0 auto '}
            style={{
              border: '1px solid #dddddd',
              borderRadius: '6px',
            }}
          >
            <InputInfoNoneBorder
              width={'100%'}
              height={3.75}
              margin={'0'}
              placeholder="현재 비밀번호"
              type={'password'}
              value={prePassword}
              onChange={onChangePrePw}
              style={{
                border: 'none',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            ></InputInfoNoneBorder>
          </RowBox>

          <Box width={'5.4375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
            {newPassword && (
              <KoreanFont size={0.9375} color="#1A1A1A">
                신규 비밀번호
              </KoreanFont>
            )}
          </Box>
          <RowBox
            width={'89.3%'}
            margin={'0.625rem auto 0 auto '}
            style={{
              border: '1px solid #dddddd',
              borderRadius: '6px',
            }}
          >
            <InputInfoNoneBorder
              width={'85%'}
              height={3.75}
              margin={'0'}
              // margin={'0px 0px 0px 0.9375rem'}
              placeholder="신규 비밀번호"
              type={view ? 'text' : 'password'}
              value={newPassword}
              onChange={onChangeNewPw1}
              style={{
                border: 'none',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
              }}
            ></InputInfoNoneBorder>
            <Box
              width={'15%'}
              height={3.75}
              margin={'0'}
              onMouseDown={() => setView(!view)}
              onMouseUp={() => setView(!view)}
              style={{
                border: 'none',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '1.5625rem',
                backgroundImage: view ? 'url(/assets/eye.png)' : 'url(/assets/closeeye.png)',
              }}
            ></Box>
          </RowBox>

          {newPassword && checkPassword(newPassword) ? (
            <div>
              <Box width={'7.375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
                <KoreanFont size={0.9375} color="#1A1A1A">
                  신규 비밀번호 확인
                </KoreanFont>
              </Box>
              <RowBox
                width={'89.3%'}
                margin={'0.625rem auto 0 auto '}
                style={{
                  border: '1px solid #dddddd',
                  borderRadius: '6px',
                }}
              >
                <InputInfoNoneBorder
                  width={'85%'}
                  height={3.75}
                  margin={'0'}
                  placeholder="비밀번호를 재입력하세요."
                  type={view ? 'text' : 'password'}
                  value={newPassword2}
                  onChange={onChangeNewPw2}
                  style={{
                    border: 'none',
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                  }}
                ></InputInfoNoneBorder>
                <Box
                  width={'15%'}
                  height={3.75}
                  margin={'0'}
                  onMouseDown={() => setView(!view)}
                  onMouseUp={() => setView(!view)}
                  style={{
                    border: 'none',
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '1.5625rem',
                    backgroundImage: view ? 'url(/assets/eye.png)' : 'url(/assets/closeeye.png)',
                  }}
                ></Box>
              </RowBox>
            </div>
          ) : (
            <BoxSide width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
              <CheckFont2 size={0.75} color={'black'} isCorrect={!newPassword}>
                {newPassword
                  ? '비밀번호 형식을 확인해 주세요.'
                  : '비밀번호는 5-10자의 영문,숫자,특수문자(!@#$%^&*) 조합입니다.'}
              </CheckFont2>
            </BoxSide>
          )}

          <BoxSide width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.7%'}>
            {newPassword2 && checkPassword(newPassword) && (
              <CheckFont size={0.75} color={'blue'} isCorrect={newPassword === newPassword2}>
                {newPassword === newPassword2 ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
              </CheckFont>
            )}
          </BoxSide>
          <BtnAble
            isDisable={!prePassword || newPassword !== newPassword2}
            width={'89.3%'}
            height={3.75}
            margin={'1.875rem auto 0rem auto'}
            onClick={() => {
              editPassword({ newPassword: newPassword, oldPassword: prePassword });
            }}
          >
            <KoreanFont size={1.0625} color="#1A1A1A">
              비밀번호 변경 완료
            </KoreanFont>
          </BtnAble>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
