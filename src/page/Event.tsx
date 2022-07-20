import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { enterPhoneFn, exchangeCouponFn, fetchEventFn, openLuckyboxFn } from '../api/eventApi';
import EventImg from '../asset/event.png';
import {
  Badge,
  Button,
  PopConfirmNew,
  PopConfirmProps,
  Slide,
  SliderPopUp,
  TextInput,
  Typography,
  Wrapper,
} from '../component/element';
import { ReactComponent as Stamp } from '../asset/icons/stamp.svg';
import { ReactComponent as LuckyBox } from '../asset/luckybox.svg';
import { useState } from 'react';
import { EventResponse } from '../Types/event';
import { useInput } from '../hooks/useInput';
import { AxiosError } from 'axios';
import { PageHeader, PageLayout } from '../component/layout/PageLayout';
import { TopNavLayout } from '../component/layout/TopNavBar';

const ScrollWrapper = styled.div`
  font-family: 'GmarketSans';
  background-color: #130c51;
  overflow-y: scroll;
  box-sizing: border-box;
  width: 375px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const EventSection = styled.section`
  background-color: #130c51;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px;
  border-bottom: 4px solid #251d71;
  box-sizing: border-box;
`;

const EventImage = styled.img`
  width: 375px;
  height: 510px;
`;

const EventBadge = styled.div`
  color: #ffeb37;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  border-radius: 50px 50px;
  border: 1px solid #ffeb37;
  padding: 0 1rem;
  text-align: center;
  font-size: 12px;
  margin: 0.5rem;
  line-height: 15px;
`;

const EventTitle = styled(Wrapper)`
  font-weight: 700;
  color: #ffeb37;
  font-size: 24px;
  padding: 0;
  margin: 0.5rem 0;
  letter-spacing: -5%;
  word-spacing: -5%;
`;

const EventContent = styled(Wrapper)`
  color: white;
  font-size: 13px;
  text-align: center;
  line-height: 20px;
  letter-spacing: -5%;
  word-spacing: -5%;
`;

const EventCalendar = styled.div`
  box-sizing: border-box;
  margin-top: 20px;
  width: 305px;

  & > div:nth-of-type(1) {
    box-sizing: border-box;
    background-color: #5441ff;
    height: 50px;
    border-radius: 20px 20px 0 0;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: white;
    padding-top: 3px;
  }

  & > div:nth-of-type(2) {
    background-color: white;
    border-radius: 0 0 20px 20px;
    padding: 0 12px 6px 12px;
    box-sizing: border-box;

    & > div {
      max-width: 305px;
    }
  }
`;

const DayComponent = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.813rem;
`;

const DateComponent = styled.div`
  width: 40px;
  max-width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
`;

const Day = ({ dd, stampedList }: { dd: string; stampedList: string[] }) => {
  const isComplete = stampedList
    .map((date) => date.split('T')[0])
    .includes(`2022-07-${dd.length === 1 ? '0' + dd : dd}`);

  return <DateComponent>{isComplete ? <Stamp /> : dd}</DateComponent>;
};

const ScoreBox = styled.div<{ isRed?: boolean }>`
  width: 145px;
  height: 130px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ isRed }) => (isRed ? '#FF534E' : '#5441FF')};
  color: ${({ isRed }) => (isRed ? '#FF534E' : '#5441FF')};

  & > span:nth-of-type(1) {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 20px;
    font-weight: 700;
  }

  & > div {
    height: 60%;
    padding: 1rem;

    & > span {
      font-weight: 700;
    }

    & > span:nth-of-type(1) {
      font-size: 60px;
    }
  }
`;

const Score = ({ title, count, isRed }: { title: string; count: number; isRed?: boolean }) => {
  return (
    <ScoreBox isRed={isRed}>
      <span>{title}</span>
      <div>
        <span>{count}</span>
        <span>개</span>
      </div>
    </ScoreBox>
  );
};

const EventButton = styled.div<{ bgColor: string }>`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  padding: 1.25rem;
  color: white;
  text-align: center;
  line-height: 1.25rem;
  font-size: 1.125rem;
  cursor: pointer;
  margin: 0.5rem 0;
`;
export const Event = () => {
  const [eventData, setEventData] = useState<EventResponse>({ couponCnt: 0, stampCnt: 0, stampDates: [] });
  const [luckyBoxState, setLuckyBoxState] = useState<{ visible: boolean; eventId: number | undefined; item: string }>({
    visible: false,
    eventId: undefined,
    item: '',
  });

  const resetLuckyBoxState = () => {
    setLuckyBoxState({ visible: false, eventId: undefined, item: '' });
  };
  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'success',
    title: '',
    content: '',
    button: {
      text: '확인',
      onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })),
    },
  });
  const { refetch } = useQuery('fetchEvent', fetchEventFn, {
    onSuccess: (data) => setEventData(data),
  });

  const { mutate: exchangeCoupon } = useMutation(exchangeCouponFn, {
    onSuccess: (data) => {
      setConfirmState((prev) => ({
        ...prev,
        title: '응모권 교환 완료!',
        visible: true,
      }));
      refetch();
    },
  });

  const { mutate: openLuckybox } = useMutation(openLuckyboxFn, {
    onSuccess: (data) => setLuckyBoxState({ visible: true, eventId: data.eventId, item: data.name }),
  });

  const { mutate: enterPhone } = useMutation(enterPhoneFn, {
    onSuccess: (data) => {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '응모되었습니다' }));
      resetLuckyBoxState();
    },
  });

  const onClickOpenLuckyBoxButton = () => {
    if (eventData.couponCnt === 0) {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '응모권이 없습니다', iconType: 'warning' }));
      return;
    }

    openLuckybox();
  };

  const onClickExchangeButton = () => {
    if (eventData.stampCnt < 5) {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '도장 개수가 부족합니다', iconType: 'warning' }));
      return;
    }

    exchangeCoupon();
  };
  const enterPhoneNumber = (phone: string) => {
    if (!luckyBoxState.eventId) return;

    enterPhone({ eventId: luckyBoxState.eventId, phone });
  };

  return (
    <Wrapper height="100%" width="375px" isColumn>
      <TopNavLayout />
      <PageHeader title="이벤트" />
      <ScrollWrapper>
        {confirmState.visible && <PopConfirmNew {...confirmState} />}
        <EventImage src={EventImg} />
        <EventSection>
          <Wrapper isColumn alignItems="center">
            <EventBadge>STEP 01</EventBadge>
            <EventTitle justifyContent="center" padding="1rem">
              투 두 완료하고 도장받기
            </EventTitle>
            <EventContent alignItems="center" justifyContent="center">
              미완료된 투두리스트 없이 1개 이상의 투두를 완료하면 <br />
              해당일 자정 12시에 도장이 찍힙니다.
            </EventContent>
          </Wrapper>
          <EventCalendar>
            <div>2022년 7월</div>
            <div>
              <Wrapper justifyContent="space-between">
                <DayComponent>일</DayComponent>
                <DayComponent>월</DayComponent>
                <DayComponent>화</DayComponent>
                <DayComponent>수</DayComponent>
                <DayComponent>목</DayComponent>
                <DayComponent>금</DayComponent>
                <DayComponent>토</DayComponent>
              </Wrapper>
              <Wrapper justifyContent="space-between">
                <DateComponent />
                <DateComponent />
                <DateComponent />
                <DateComponent />
                <DateComponent />
                <Day dd="1" stampedList={eventData.stampDates} />
                <Day dd="2" stampedList={eventData.stampDates} />
              </Wrapper>
              <Wrapper justifyContent="space-between">
                {['3', '4', '5', '6', '7', '8', '9'].map((dd) => (
                  <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
                ))}
              </Wrapper>
              <Wrapper justifyContent="space-between">
                {['10', '11', '12', '13', '14', '15', '16'].map((dd) => (
                  <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
                ))}
              </Wrapper>
              <Wrapper justifyContent="space-between">
                {['17', '18', '19', '20', '21', '22', '23'].map((dd) => (
                  <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
                ))}
              </Wrapper>
              <Wrapper justifyContent="space-between">
                {['24', '25', '26', '27', '28', '29', '31'].map((dd) => (
                  <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
                ))}
              </Wrapper>
              <Wrapper justifyContent="space-between">
                <Day dd="31" stampedList={eventData.stampDates} />
              </Wrapper>
            </div>
          </EventCalendar>
        </EventSection>
        <EventSection>
          <Wrapper isColumn alignItems="center">
            <EventBadge>STEP 02</EventBadge>
            <EventTitle justifyContent="center">도장으로 이벤트 응모권 교환</EventTitle>
            <EventContent alignItems="center" justifyContent="center">
              도장 5개당 이벤트 응모권 1개로 교환이 가능합니다.
            </EventContent>
            <Wrapper justifyContent="space-between" margin="1rem">
              <Score isRed title="나의 도장 개수" count={eventData.stampCnt || 0} />
              <Score title="나의 응모권 개수" count={eventData.couponCnt || 0} />
            </Wrapper>
            <EventButton bgColor="#5441FF" onClick={() => onClickExchangeButton()}>
              응모권으로 교환하기
            </EventButton>
          </Wrapper>
        </EventSection>
        <EventSection>
          <Wrapper isColumn alignItems="center">
            <EventBadge>STEP 03</EventBadge>
            <EventTitle justifyContent="center" padding="1rem">
              응모권으로 럭키박스 오픈
            </EventTitle>
            <EventContent alignItems="center" justifyContent="center">
              100% 당첨 럭키박스를 오픈해보세요!
            </EventContent>
            <Wrapper justifyContent="space-between" margin="1rem">
              <LuckyBox />
            </Wrapper>
            <EventButton bgColor="#FF534E" onClick={() => onClickOpenLuckyBoxButton()}>
              럭키 박스 열기
            </EventButton>
          </Wrapper>
        </EventSection>
        {luckyBoxState.visible && (
          <LuckyBoxModal
            closeModal={resetLuckyBoxState}
            item={luckyBoxState.item}
            onClickConfirmButton={enterPhoneNumber}
          />
        )}
      </ScrollWrapper>
    </Wrapper>
  );
};

const Modal = styled.div`
  background-color: white;
  width: 20rem;
  border-radius: 1.25rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & input,
  button {
    margin: 0.5rem 0;
  }
`;

const MentWrapper = styled(Wrapper)`
  font-family: 'NotoLight';

  & > span {
    color: black;
    font-family: 'NotoRegu';
    font-size: 15px;
    font-weight: 500;
    margin: 0.5rem;
  }

  & > div {
    margin: 0.5rem;
    font-size: 0.813rem;
    color: #5f5f5f;
    line-height: 19px;
    text-align: center;
  }
`;
const LuckyBoxModal = ({
  closeModal,
  onClickConfirmButton,
  item,
}: {
  closeModal: () => void;
  onClickConfirmButton: (number: string) => void;
  item: string;
}) => {
  const { value: phoneNumber, onChangeValue } = useInput();

  const setHipen = (value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    onChangeValue(onlyNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3'));
  };
  return (
    <SliderPopUp>
      <Modal>
        <Typography isBold size={1.563}>
          축하합니다!
        </Typography>
        <MentWrapper isColumn>
          <span>{`${item}에 당첨되셨습니다`}</span>
          <div>
            경품 수령을 위해 개인정보를 입력해주세요. <br />
            이 창에서 번호를 입력해주셔야하며, <br />
            잘못 입력된 번호는 책임지지 않습니다.
            <br />
            해당 경품은 7월 23일 일괄지급됩니다
          </div>
        </MentWrapper>
        <TextInput value={phoneNumber} onChange={setHipen} placeholder="핸드폰 번호를 입력해주세요" />
        <Button buttonType="primary" onClick={closeModal}>
          닫기
        </Button>
        <Button buttonType="primary" onClick={() => onClickConfirmButton(phoneNumber)}>
          확인
        </Button>
        <Typography
          size={0.688}
          align="center"
        >{`관련 문의는 todowith@naver.com으로 주시면 \n 빠른 시일 내 답변 드리겠습니다.`}</Typography>
      </Modal>
    </SliderPopUp>
  );
};
