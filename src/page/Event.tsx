import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchEventFn } from '../api/eventApi';
import EventImg from '../asset/eventPage.jpg';
import { Badge, Wrapper } from '../component/element';
import { ReactComponent as Stamp } from '../asset/icons/stamp.svg';
import { useState } from 'react';
import { EventResponse } from '../Types/event';

const ScrollWrapper = styled.div`
  font-family: 'GmarketSans';
  background-color: #130c51;
  overflow-y: scroll;
`;

const EventImage = styled.img`
  width: 100%;
`;

const EventBadge = styled.div`
  color: #ffeb37;
  display: flex;
  align-items: center;
  height: 1.75rem;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50px 50px;
  border: 1px solid #ffeb37;
  padding: 0.25rem 0.75rem;
  text-align: center;
  font-size: 0.875rem;
`;

const EventTitle = styled(Wrapper)`
  font-weight: 700;
  color: #ffeb37;
  font-size: 1.625rem;
`;

const EventContent = styled(Wrapper)`
  color: white;

  font-weight: 400;
  font-size: 0.875rem;
  text-align: center;
  line-height: 20px;
`;

const EventCalendar = styled.div`
  margin: 1rem;
  & > div:nth-of-type(1) {
    background-color: #5441ff;
    width: 19.063rem;
    height: 50px;
    border-radius: 20px 20px 0 0;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: white;
  }

  & > div:nth-of-type(2) {
    background-color: white;
    border-radius: 0 0 20px 20px;
  }
`;

const DayComponent = styled.div`
  font-size: 13px;
  width: 1.625rem;
  height: 1.625rem;
  // padding: 0.75rem;
`;

const Day = ({ dd, stampedList }: { dd: string; stampedList: string[] }) => {
  const isComplete = stampedList
    .map((date) => date.split('T')[0])
    .includes(`2022-07-${dd.length === 1 ? '0' + dd : dd}`);

  console.log('yyyy-mm-dd', `2022-07-${dd.length === 1 ? '0' + dd : dd}`);

  return <DayComponent>{isComplete ? <Stamp /> : dd}</DayComponent>;
};

export const Event = () => {
  const [eventData, setEventData] = useState<EventResponse>({ couponCnt: 0, stampCnt: 0, stampDates: [] });

  useQuery('fetchEvent', fetchEventFn, {
    onSuccess: (data) => setEventData(data),
  });

  return (
    <ScrollWrapper>
      <EventImage src={EventImg} />
      <Wrapper backgroundColor="#130C51" isColumn alignItems="center" justify-content="center" padding="3rem">
        <EventBadge>STEP 01</EventBadge>
        <EventTitle padding="1rem">투 두 완료하고 도장받기</EventTitle>
        <EventContent alignItems="center">
          미완료된 투두리스트 없이 1개 이상의 투두를 완료하면 <br />
          해당일 자정 12시에 도장이 찍힙니다.
        </EventContent>
        <EventCalendar>
          <div>2022년 7월</div>
          <div>
            <Wrapper justifyContent="space-between" width="305px">
              <DayComponent>일</DayComponent>
              <DayComponent>월</DayComponent>
              <DayComponent>화</DayComponent>
              <DayComponent>수</DayComponent>
              <DayComponent>목</DayComponent>
              <DayComponent>금</DayComponent>
              <DayComponent>토</DayComponent>
            </Wrapper>
            <Wrapper justifyContent="space-between" width="305px">
              <DayComponent />
              <DayComponent />
              <DayComponent />
              <DayComponent />
              <DayComponent />
              <Day dd="1" stampedList={eventData.stampDates} />
              <Day dd="2" stampedList={eventData.stampDates} />
            </Wrapper>
            <Wrapper width="305px" justifyContent="space-between">
              {['3', '4', '5', '6', '7', '8', '9'].map((dd) => (
                <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
              ))}
            </Wrapper>
          </div>
        </EventCalendar>
      </Wrapper>
    </ScrollWrapper>
  );
};
