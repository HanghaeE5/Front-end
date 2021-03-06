import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { enterPhoneFn, exchangeCouponFn, fetchEventFn, openLuckyboxFn } from '../api/eventApi';
import EventImg from '../asset/eventPage.jpg';
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

const ScrollWrapper = styled.div`
  font-family: 'GmarketSans';
  background-color: #130c51;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const EventSection = styled.section`
  background-color: #130c51;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  border-top: 4px solid #251d71;
  box-sizing: border-box;
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
  margin: 0.5rem;
`;

const EventTitle = styled(Wrapper)`
  font-weight: 700;
  color: #ffeb37;
  font-size: 1.625rem;
  padding: 0;
  margin: 0.5rem 0;
`;

const EventContent = styled(Wrapper)`
  color: white;
  font-weight: 400;
  font-size: 0.875rem;
  text-align: center;
  line-height: 20px;
`;

const EventCalendar = styled.div`
  box-sizing: border-box;
  & > div:nth-of-type(1) {
    box-sizing: border-box;
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
    // padding: 0 0.5rem;
  }

  & > div:nth-of-type(2) {
    background-color: white;
    border-radius: 0 0 20px 20px;
    //padding: 0 0.5rem;
  }
`;

const DayComponent = styled.div`
  width: 3rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.813rem;
`;

const DateComponent = styled.div`
  width: 3rem;
  height: 2.5rem;
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
  width: 9.063rem;
  height: 8.125rem;
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
    & > span:nth-of-type(1) {
      font-size: 4rem;
      font-weight: 700;
    }
  }
`;

const Score = ({ title, count, isRed }: { title: string; count: number; isRed?: boolean }) => {
  return (
    <ScoreBox isRed={isRed}>
      <span>{title}</span>
      <div>
        <span>{count}</span>
        <span>???</span>
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
      text: '??????',
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
        title: '????????? ?????? ??????!',
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
      setConfirmState((prev) => ({ ...prev, visible: true, title: '?????????????????????' }));
      resetLuckyBoxState();
    },
  });

  const onClickOpenLuckyBoxButton = () => {
    if (eventData.couponCnt === 0) {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '???????????? ????????????', iconType: 'warning' }));
      return;
    }

    openLuckybox();
  };

  const onClickExchangeButton = () => {
    if (eventData.stampCnt < 5) {
      setConfirmState((prev) => ({ ...prev, visible: true, title: '?????? ????????? ???????????????', iconType: 'warning' }));
      return;
    }

    exchangeCoupon();
  };
  const enterPhoneNumber = (phone: string) => {
    if (!luckyBoxState.eventId) return;

    enterPhone({ eventId: luckyBoxState.eventId, phone });
  };

  return (
    <ScrollWrapper>
      {confirmState.visible && <PopConfirmNew {...confirmState} />}
      <EventImage src={EventImg} />
      <EventSection>
        <Wrapper isColumn padding="1rem" alignItems="center">
          <EventBadge>STEP 01</EventBadge>
          <EventTitle justifyContent="center" padding="1rem">
            ??? ??? ???????????? ????????????
          </EventTitle>
          <EventContent alignItems="center" justifyContent="center">
            ???????????? ??????????????? ?????? 1??? ????????? ????????? ???????????? <br />
            ????????? ?????? 12?????? ????????? ????????????.
          </EventContent>
        </Wrapper>
        <EventCalendar>
          <div>2022??? 7???</div>
          <div>
            <Wrapper justifyContent="space-between" width="305px" padding="0 0.5rem">
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
              <DayComponent>???</DayComponent>
            </Wrapper>
            <Wrapper justifyContent="space-between" width="305px" padding="0 0.5rem">
              <DateComponent />
              <DateComponent />
              <DateComponent />
              <DateComponent />
              <DateComponent />
              <Day dd="1" stampedList={eventData.stampDates} />
              <Day dd="2" stampedList={eventData.stampDates} />
            </Wrapper>
            <Wrapper width="19.063rem" justifyContent="space-between" padding="0 0.5rem">
              {['3', '4', '5', '6', '7', '8', '9'].map((dd) => (
                <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
              ))}
            </Wrapper>
            <Wrapper width="19.063rem" justifyContent="space-between" padding="0 0.5rem">
              {['10', '11', '12', '13', '14', '15', '16'].map((dd) => (
                <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
              ))}
            </Wrapper>
            <Wrapper width="19.063rem" justifyContent="space-between" padding="0 0.5rem">
              {['17', '18', '19', '20', '21', '22', '23'].map((dd) => (
                <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
              ))}
            </Wrapper>
            <Wrapper width="19.063rem" justifyContent="space-between" padding="0 0.5rem">
              {['24', '25', '26', '27', '28', '29', '31'].map((dd) => (
                <Day key={dd} dd={dd} stampedList={eventData.stampDates} />
              ))}
            </Wrapper>
            <Wrapper width="19.063rem" justifyContent="space-between" padding="0 0.25rem">
              <Day dd="31" stampedList={eventData.stampDates} />
            </Wrapper>
          </div>
        </EventCalendar>
      </EventSection>
      <EventSection>
        <Wrapper isColumn padding="2rem" alignItems="center">
          <EventBadge>STEP 02</EventBadge>
          <EventTitle justifyContent="center" padding="1rem">
            ???????????? ????????? ????????? ??????
          </EventTitle>
          <EventContent alignItems="center" justifyContent="center">
            ?????? 5?????? ????????? ????????? 1?????? ????????? ???????????????.
          </EventContent>
          <Wrapper justifyContent="space-between" margin="1rem">
            <Score isRed title="?????? ?????? ??????" count={eventData.stampCnt || 0} />
            <Score title="?????? ????????? ??????" count={eventData.couponCnt || 0} />
          </Wrapper>
          <EventButton bgColor="#5441FF" onClick={() => onClickExchangeButton()}>
            ??????????????? ????????????
          </EventButton>
        </Wrapper>
      </EventSection>
      <EventSection>
        <Wrapper isColumn padding="2rem" alignItems="center">
          <EventBadge>STEP 03</EventBadge>
          <EventTitle justifyContent="center" padding="1rem">
            ??????????????? ???????????? ??????
          </EventTitle>
          <EventContent alignItems="center" justifyContent="center">
            100% ?????? ??????????????? ??????????????????!
          </EventContent>
          <Wrapper justifyContent="space-between" margin="1rem">
            <LuckyBox />
          </Wrapper>
          <EventButton bgColor="#FF534E" onClick={() => onClickOpenLuckyBoxButton()}>
            ?????? ?????? ??????
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
          ???????????????!
        </Typography>
        <MentWrapper isColumn>
          <span>{`${item}??? ?????????????????????`}</span>
          <div>
            ?????? ????????? ?????? ??????????????? ??????????????????. <br />
            ??? ????????? ????????? ????????????????????????, <br />
            ?????? ????????? ????????? ???????????? ????????????.
            <br />
            ?????? ????????? 7??? 23??? ?????????????????????
          </div>
        </MentWrapper>
        <TextInput value={phoneNumber} onChange={setHipen} placeholder="????????? ????????? ??????????????????" />
        <Button buttonType="primary" onClick={closeModal}>
          ??????
        </Button>
        <Button buttonType="primary" onClick={() => onClickConfirmButton(phoneNumber)}>
          ??????
        </Button>
        <Typography
          size={0.688}
          align="center"
        >{`?????? ????????? todowith@naver.com?????? ????????? \n ?????? ?????? ??? ?????? ??????????????????.`}</Typography>
      </Modal>
    </SliderPopUp>
  );
};
