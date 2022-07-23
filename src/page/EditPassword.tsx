import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userApi } from '../api/callApi';
import {
  EvAbleFont,
  EvBtnAble,
  EvCheckHelfBox,
  EvFontBox,
  EvHelfInputInfo,
  EvInputInfo,
  EvKoreanFont,
  EvRowBox,
} from '../component/element/BoxStyle';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper } from '../component/styledComponent/TodoPageComponents';
import { userInfoState } from '../recoil/store';

type font = {
  size: number;
  color: string;
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

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

export const EditPassword = () => {
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  const [prePassword, setPrePassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');

  const [view, setView] = useState<boolean>(false);
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

  const editDisable = !prePassword || newPassword != newPassword2 || !newPassword || !checkPassword(newPassword);

  //비밀번호 변경 API
  const editPasswordData = useMutation(
    (data: { newPassword: string; oldPassword: string }) => userApi.editPasswordApi(data),
    {
      onSuccess: () => {
        console.log();
        alert(`${userInfoData.nick}님의 비밀번호가 변경되었습니다`);
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
          <EvFontBox width={'5.4375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
            {prePassword && (
              <EvKoreanFont size={0.9375} weight={500} color="#1A1A1A">
                현재 비밀번호
              </EvKoreanFont>
            )}
          </EvFontBox>
          <EvInputInfo
            width={'89.3%'}
            height={3.75}
            margin={'0.625rem auto 0 auto'}
            placeholder="현재 비밀번호"
            type={'password'}
            value={prePassword}
            onChange={onChangePrePw}
          ></EvInputInfo>

          <EvFontBox width={'5.4375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
            {newPassword && (
              <EvKoreanFont size={0.9375} weight={500} color="#1A1A1A">
                신규 비밀번호
              </EvKoreanFont>
            )}
          </EvFontBox>
          <EvRowBox width={'89.3%'} margin={'0.625rem auto 0 auto '} border="1px solid #dddddd" borderRadius="6px">
            <EvHelfInputInfo
              width={'85%'}
              height={3.75}
              margin={'0 auto 0 0'}
              placeholder="신규 비밀번호"
              type={view ? 'text' : 'password'}
              value={newPassword}
              onChange={onChangeNewPw1}
            />
            <EvCheckHelfBox
              width={'15%'}
              height={3.75}
              margin={'0 0 0 auto'}
              onMouseDown={() => setView(!view)}
              onMouseUp={() => setView(!view)}
              isCursor={true}
              backgroundsize={view ? '1.4rem' : '1.25rem'}
              url={view ? 'url(/assets/eye.svg)' : 'url(/assets/closeeye.svg)'}
            />
          </EvRowBox>

          {newPassword && checkPassword(newPassword) ? (
            <div>
              <EvFontBox width={'7.375rem'} height={1.375} margin={'1.875rem auto 0 5.3%'}>
                <EvKoreanFont size={0.9375} weight={500} color="#1A1A1A">
                  신규 비밀번호 확인
                </EvKoreanFont>
              </EvFontBox>
              <EvRowBox width={'89.3%'} margin={'0.625rem auto 0 auto '} border="1px solid #dddddd" borderRadius="6px">
                <EvHelfInputInfo
                  width={'85%'}
                  height={3.75}
                  margin={'0 auto 0 0'}
                  placeholder="신규 비밀번호 재입력"
                  type={view ? 'text' : 'password'}
                  value={newPassword2}
                  onChange={onChangeNewPw2}
                />
                <EvCheckHelfBox
                  width={'15%'}
                  height={3.75}
                  margin={'0 0 0 auto'}
                  onMouseDown={() => setView(!view)}
                  onMouseUp={() => setView(!view)}
                  isCursor={true}
                  backgroundsize={view ? '1.4rem' : '1.25rem'}
                  url={view ? 'url(/assets/eye.svg)' : 'url(/assets/closeeye.svg)'}
                />
              </EvRowBox>
            </div>
          ) : (
            <EvFontBox isAlignSide={true} width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
              <CheckFont2 size={0.75} color={'black'} isCorrect={!newPassword}>
                {newPassword
                  ? '비밀번호 형식을 확인해 주세요.'
                  : '비밀번호는 5-10자의 영문,숫자,특수문자(!@#$%^&*) 조합입니다.'}
              </CheckFont2>
            </EvFontBox>
          )}

          <EvFontBox isAlignSide={true} width={21.25} height={1.3125} margin={'0.3125rem auto 0px 5.3%'}>
            {newPassword2 && checkPassword(newPassword) && (
              <CheckFont size={0.75} color={'blue'} isCorrect={newPassword === newPassword2}>
                {newPassword === newPassword2 ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다'}
              </CheckFont>
            )}
          </EvFontBox>
          <EvBtnAble
            isDisable={editDisable}
            width={'89.3%'}
            height={3.75}
            margin={'3.3125rem auto 0rem auto'}
            onClick={
              editDisable
                ? () => {
                    null;
                  }
                : () => {
                    editPassword({ newPassword: newPassword, oldPassword: prePassword });
                  }
            }
          >
            <EvAbleFont size={1.0625} isDisable={editDisable} weight={500}>
              비밀번호 변경 완료
            </EvAbleFont>
          </EvBtnAble>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
