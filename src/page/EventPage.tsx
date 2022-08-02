import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { enterPhoneFn, exchangeCouponFn, fetchEventFn, openLuckyboxFn } from '../api/eventApi';
import EventImg from '../asset/icons/eventPage/event.jpg';
import { ReactComponent as Stamp } from '../asset/icons/eventPage/stamp.svg';
import { ReactComponent as LuckyBoxImg } from '../asset/icons/eventPage/luckybox.svg';
import { ReactComponent as Aug1 } from '../asset/icons/eventPage/81.svg';
import { ReactComponent as Aug2 } from '../asset/icons/eventPage/82.svg';
import { ReactComponent as Aug3 } from '../asset/icons/eventPage/83.svg';
import { ReactComponent as Aug4 } from '../asset/icons/eventPage/84.svg';
import { ReactComponent as Aug5 } from '../asset/icons/eventPage/85.svg';

import {
  Button,
  Img,
  PopConfirmNew,
  PopConfirmProps,
  SliderPopUp,
  TextInput,
  Typography,
  Wrapper,
} from '../component/element';

import { FunctionComponent, ReactComponentElement, ReactElement, ReactNode, SVGProps, useState } from 'react';
import { EventResponse } from '../Types/event';
import { useInput } from '../hooks/useInput';
import { PageHeader, PageLayout } from '../component/layout/PageLayout';
import { TopNavBar } from '../component/layout/TopNavBar';
import { PageContentWrapper } from './FriendList';
import { NavLayout } from '../component/layout/NavLayout';

export const EventContentWrapper = styled(PageContentWrapper)`
  width: 100%;
  height: 100%;
  max-width: 768px;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const EventPageContainer = styled(Wrapper)`
  position: relative;
  width: 375px;
`;

const LuckyBox = styled(LuckyBoxImg)`
  border: none;
`;

const ScrollWrapper = styled.div`
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
  font-family: 'GmarketSans';
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
  line-height: 18px;
  font-size: 18px;
`;

const Day = ({ dd, stampedList }: { dd: string; stampedList: string[] }) => {
  const isComplete = stampedList
    .map((date) => date.split('T')[0])
    .includes(`2022-07-${dd.length === 1 ? '0' + dd : dd}`);

  return <DateComponent>{isComplete ? <Stamp /> : dd}</DateComponent>;
};

const AugDayWrapper = styled.div`
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

const AugDateImg = styled.img`
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

const AugDay = ({
  dateIcon,
  stampedList,
  yyyyMmDd,
}: {
  dateIcon: ReactElement;
  stampedList: string[];
  yyyyMmDd: string;
}) => {
  const isComplete = stampedList.map((date) => date.split('T')[0]).includes(yyyyMmDd);
  return <AugDayWrapper>{isComplete ? <Stamp /> : dateIcon}</AugDayWrapper>;
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
export const EventPage = () => {
  const [eventData, setEventData] = useState<EventResponse>({ couponCnt: 0, stampCnt: 0, stampDates: [] });
  const [luckyBoxState, setLuckyBoxState] = useState<{
    visible: boolean;
    eventId: number | undefined;
    item: string;
    itemImg: string;
  }>({
    visible: false,
    eventId: undefined,
    item: '',
    itemImg: '',
  });

  const resetLuckyBoxState = () => {
    setLuckyBoxState({ visible: false, eventId: undefined, item: '', itemImg: '' });
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
    onSuccess: (data) =>
      setLuckyBoxState({ visible: true, eventId: data.eventId, item: data.name, itemImg: data.imageUrl }),
  });

  const { mutate: enterPhone } = useMutation(enterPhoneFn, {
    onSuccess: (data) => {
      setConfirmState((prev) => ({
        ...prev,
        visible: true,
        title: '😎8월 6일 지급예정입니다!😎',
        iconType: 'success',
      }));
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
    if (eventData.stampCnt < 1) {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '도장 개수가 부족합니다', iconType: 'warning' }));
      return;
    }

    exchangeCoupon();
  };
  const enterPhoneNumber = (phone: string) => {
    if (!luckyBoxState.eventId) return;

    enterPhone(
      { eventId: luckyBoxState.eventId, phone },
      {
        onSuccess: () => refetch(),
      },
    );
  };

  return (
    <NavLayout>
      <PageLayout title="이벤트">
        <EventContentWrapper>
          <EventPageContainer height="100%" isColumn>
            {/* <TopNavBar /> */}
            <ScrollWrapper>
              {confirmState.visible && <PopConfirmNew {...confirmState} />}
              <EventImage src={EventImg} />
              <EventSection>
                <Wrapper isColumn alignItems="center">
                  <EventBadge>STEP 01</EventBadge>
                  <EventTitle justifyContent="center" padding="1rem">
                    투두 완료하고 도장받기
                  </EventTitle>
                  <EventContent alignItems="center" justifyContent="center">
                    당일 미완료된 투두리스트 없이 1개 이상의 투두를 완료하면 <br />
                    해당일 자정 12시에 도장이 찍힙니다.
                  </EventContent>
                </Wrapper>
                <EventCalendar>
                  <div>2022년 7월 - 8월</div>
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
                      {['24', '25', '26', '27', '28', '29', '30'].map((dd) => (
                        <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
                      ))}
                    </Wrapper>
                    <Wrapper justifyContent="space-between">
                      <Day dd={'31'} stampedList={eventData.stampDates} />
                      <AugDay stampedList={eventData.stampDates} yyyyMmDd="2022-08-01" dateIcon={<Aug1 />} />
                      <AugDay stampedList={eventData.stampDates} yyyyMmDd="2022-08-02" dateIcon={<Aug2 />} />
                      <AugDay stampedList={eventData.stampDates} yyyyMmDd="2022-08-03" dateIcon={<Aug3 />} />
                      <AugDay stampedList={eventData.stampDates} yyyyMmDd="2022-08-04" dateIcon={<Aug4 />} />
                      <AugDay stampedList={eventData.stampDates} yyyyMmDd="2022-08-05" dateIcon={<Aug5 />} />
                      <Day dd="" stampedList={eventData.stampDates} />
                    </Wrapper>
                  </div>
                </EventCalendar>
              </EventSection>
              <EventSection>
                <Wrapper isColumn alignItems="center">
                  <EventBadge>STEP 02</EventBadge>
                  <EventTitle justifyContent="center">도장으로 이벤트 응모권 교환</EventTitle>
                  <EventContent alignItems="center" justifyContent="center">
                    도장 1개당 이벤트 응모권 1개로 교환이 가능합니다.
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
                  itemImg={luckyBoxState.itemImg}
                  onClickConfirmButton={enterPhoneNumber}
                />
              )}
            </ScrollWrapper>
          </EventPageContainer>
        </EventContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};

const Modal = styled.div`
  background-color: white;
  width: 20rem;
  border-radius: 1.25rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & input,
  button {
    margin: 0.5rem 0;
  }

  & > span:nth-of-type(1) {
    border: 4px solid white;
  }
`;

const MentWrapper = styled(Wrapper)`
  font-family: 'Noto Sans KR';

  & > span {
    color: black;
    font-size: 15px;
    font-weight: 500;
    margin: 0.25rem;
  }

  & > div {
    font-weight: 400;
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
  itemImg,
}: {
  closeModal: () => void;
  onClickConfirmButton: (number: string) => void;
  item: string;
  itemImg: string;
}) => {
  const { value: phoneNumber, onChangeValue } = useInput();

  const setHipen = (value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');
    onChangeValue(onlyNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3'));
  };
  return (
    <SliderPopUp onClickBackground={closeModal}>
      <Modal>
        <Typography weight={700} size={1.563}>
          축하합니다!
        </Typography>
        <Img url={itemImg} type="profile" width="120px" height="120px" />
        <MentWrapper isColumn>
          <span>{`${item}에 당첨되셨습니다`}</span>
          <div>
            경품 수령을 위해 개인정보를 입력해주세요. <br />
            이 창에서 번호를 입력해주셔야하며, <br />
            잘못 입력된 번호는 책임지지 않습니다.
            <br />
            해당 경품은 8월 6일 일괄지급됩니다
          </div>
        </MentWrapper>
        <TextInput
          inputSize="small"
          value={phoneNumber}
          onChange={setHipen}
          placeholder="핸드폰 번호를 입력해주세요"
          align="center"
        />
        <Button buttonType="primary" onClick={() => onClickConfirmButton(phoneNumber)}>
          확인
        </Button>
        <Typography
          size={0.688}
          align="center"
          weight={400}
          lineHeight={1.063}
          color="#272727"
        >{`관련 문의는 todowith@naver.com으로 주시면 \n 빠른 시일 내 답변 드리겠습니다.`}</Typography>
      </Modal>
    </SliderPopUp>
  );
};
