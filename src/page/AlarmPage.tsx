import styled from 'styled-components';
import { NavLayout } from '../component/layout/NavLayout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AiOutlineCheck } from 'react-icons/ai';

import { alarmOnState, modalGatherState, notificationListState } from '../recoil/store';
import EditNicknameModal from '../component/modallayout/EditNicknameModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Wrapper } from '../component/element';
import {
  EvBox,
  EvColumnBox,
  EvEnglishFont,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../component/element/BoxStyle';
import axios, { AxiosError } from 'axios';
import ExpBar from '../component/element/ExpBar';
import setupInterceptorsTo from '../api/interceptors';
import { useParams } from 'react-router';
import { FriendInfo } from '../Types/user';
import { BadgeImgBox, EvRowBadgeWrap, TodoNumberBox } from './Main';
import ExplainModal from '../component/modallayout/ExplainModal';
import { alarmApi, friendApi } from '../api/callApi';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { PageLayout } from '../component/layout/PageLayout';
import { PageContentWrapper } from './FriendList';
import { notificationList } from '../Types/notification';

const AlarmBoxWrap = styled(EvColumnBox)`
  margin: 1.875rem auto;
  row-gap: 0.9375rem;

  width: 89%;
  /* background-color: pink; */
`;

const AlarmBox = styled(EvColumnBox)`
  background-color: #fffbe9;
  border-radius: 6px;
  padding: 1.5625rem 2.8125rem 1.5625rem 1.25rem;
  width: 100%;
  min-height: 5.75rem;
`;

const AlarmTextBox = styled(EvColumnBox)`
  /* background-color: #a3d7a3; */
  border-radius: 6px;
  width: 100%;
`;

const AlarmFontBox = styled(EvColumnBox)`
  /* background-color: white; */
  width: 80%;
  justify-content: flex-start;
  /* align-items: left;
  align-content: flex-start; */
`;

const AlarmFont = styled.p`
  font-size: 1rem;
  text-align: left;
  line-height: 24px;
  margin: auto auto auto 0;
  & > span:nth-of-type(1) {
    font-weight: 700;
    font-weight: 700;
    min-width: 50px;
    max-height: 15px;
  }
`;

const AlarmDateFont = styled(EvEnglishFont)`
  color: #989898;
  font-size: 0.75rem;
  line-height: 19px;
  margin: auto auto auto 0;
`;

export const AlarmPage = () => {
  const [alarmList, setAlarmList] = useRecoilState(notificationListState);
  const queryClient = useQueryClient();
  const [alarmOn, setAlarmOn] = useRecoilState(alarmOnState);

  //알림페이지 API
  const getAlarmReadQuery = useQuery('alarmReadLists', alarmApi.alarmReadApi, {
    //여기서 리코일에 저장
    onSuccess: (data) => {
      queryClient.invalidateQueries('alarmLists');
      setAlarmOn(false);
      // console.log(data.data);
    },
  });

  //시간 변환
  function alarmTime(altime: string) {
    const alarmDate = altime.split('T')[0];
    const divide = altime.split('T')[1];
    const divideHour = Number(divide.split(':')[0]);
    const divideMin = divide.split(':')[1];

    if (divideHour > 12) {
      return `${alarmDate}  오후 ${divideHour - 12} : ${divideMin}`;
    } else if (divideHour === 12) {
      return `${alarmDate}  오후 ${divideHour} : ${divideMin}`;
    } else if (divideHour === 0) {
      return `${alarmDate}  오전 ${divideHour + 12} : ${divideMin}`;
    } else {
      return `${alarmDate}  오전 ${divideHour} : ${divideMin}`;
    }
  }

  return (
    <NavLayout>
      <PageLayout title="알림">
        <PageContentWrapper>
          <AlarmBoxWrap>
            {alarmList.map((alarmcontent, alarmcontentindex) => {
              if (alarmcontent.type !== '채팅') {
                return (
                  <AlarmBox key={alarmcontentindex}>
                    <AlarmTextBox>
                      <EvRowBox width={'100%'} style={{ justifyContent: 'flex-start' }}>
                        <EvImgBox
                          width={'0.625rem'}
                          height="0.625"
                          url="url(/assets/yellowdot.svg)"
                          margin="0.4375rem 0.625rem auto 0"
                        />
                        <AlarmFontBox>
                          <AlarmFont>
                            <span>[{alarmcontent.type}]</span> {alarmcontent.message}
                          </AlarmFont>

                          <AlarmDateFont>{alarmTime(alarmcontent.createdDate)}</AlarmDateFont>
                        </AlarmFontBox>
                      </EvRowBox>
                    </AlarmTextBox>
                  </AlarmBox>
                );
              }
            })}
          </AlarmBoxWrap>
        </PageContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
