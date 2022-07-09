import styled, { keyframes } from 'styled-components';
import { useInput } from '../hooks/useInput';
import { Button, TextInput, Wrapper } from './element';
import { WarningText } from './WarningText';
import { BsFillHandbagFill, BsX } from 'react-icons/bs';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker, Row, RowProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
// import '../style/day-picker.css';
import { ko } from 'date-fns/locale';
import { differenceInCalendarDays } from 'date-fns';
import { Category, TodoData } from '../Types/todo';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  background-color: black;
  opacity: 0.65;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

// TODO : Modal 중복많아서 하나도 빼보기
const Slide = keyframes`
    0% {
        transform: translateY(20%);
    }

    100% {
        transform: translateY(0);
    }
`;

const TodoContents = styled.div`
  height: 35.75rem;
  bottom: 0;
  width: 100%;
  position: absolute;
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: ${Slide} 0.6s ease;
`;

const HeaderTitle = styled(Wrapper)`
  font-size: 1.25rem;
  font-weight: 700;

  & > svg {
    font-size: 1.5rem;
  }
`;
const CategoryWrapper = styled.div<{ isSelect: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme, isSelect }) => (isSelect ? 'black' : theme.color.grayMedium)};
    border-radius: ${({ theme }) => theme.radius};
    padding: 1rem;
    width: 4.375rem;
    height: 4.375rem;
    margin-left: 1rem;
  }

  & > span {
    margin: 0.25rem;
    text-align: center;
    padding-left: 1rem;
  }
`;

const CategorySection = styled(Wrapper)`
  border-top: 0.5rem solid ${({ theme }) => theme.color.grayLight};
  border-bottom: 0.5rem solid ${({ theme }) => theme.color.grayLight};
  padding: 1rem 0;

  & > span {
    margin: 0 0 1rem 1rem;
  }

  & > div {
    width: 100%;
    overflow-x: scroll;
    display: flex;
  }
`;
const CalendarWrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  position: fixed;
  bottom: 8rem;
  left: 2rem;
  box-shadow: 0px 3px 10px -4px rgba(0, 0, 0, 0.77);
`;
const StickyButton = styled(Button)`
  position: absolute;
  bottom: 3.75rem;
`;

interface CategoryItemProps {
  icon: ReactNode;
  onClick: () => void;
  isSelect: boolean;
}

const CategoryItem = ({ icon, isSelect, onClick, children }: PropsWithChildren<CategoryItemProps>) => {
  return (
    <CategoryWrapper isSelect={isSelect} onClick={onClick}>
      <div>{icon}</div>
      <span>{children}</span>
    </CategoryWrapper>
  );
};

const CalendarFooter = ({ onClick }: { onClick: () => void }) => {
  return (
    <Wrapper>
      <Button buttonType="default" onClick={onClick}>
        선택
      </Button>
    </Wrapper>
  );
};

function isPastDate(date: Date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}

function OnlyFutureRow(props: RowProps) {
  const isPastRow = props.dates.every(isPastDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
}

const getSelectDate = (selectedDay: Date[] | undefined) => {
  if (!selectedDay) return;

  const firstDate = selectedDay[0]?.toISOString().split('T')[0];

  return `${firstDate ? firstDate : ''} ${selectedDay.length > 1 ? `외 ${selectedDay.length - 1}건` : ''}`;
};

interface TodoModalProps {
  setTodoDataFromModal: (todo: TodoData) => void;
  closeModal: () => void;
}
export const TodoModal = ({ setTodoDataFromModal, closeModal }: TodoModalProps) => {
  const { value: title, onChangeValue: onChangeTitle } = useInput();
  const [category, setCategory] = useState<Category>('study');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date[] | undefined>([]);

  const onCloseCalendar = () => setShowCalendar(false);

  const onClickCategoryButton = (category: Category) => {
    setCategory(category);
  };

  const onClickAddButton = () => {
    if (!title || !selectedDay?.length) return;

    const date: { [key in string]: null } = {};

    selectedDay?.forEach((selectedDay) => {
      const dateKey = selectedDay.toISOString().split('T')[0];
      date[dateKey] = null;
    });

    setTodoDataFromModal({ title, category, date });
    closeModal();
  };

  return (
    <ModalContainer>
      <Background onClick={() => closeModal()} />
      <TodoContents>
        <HeaderTitle justifyContent="space-between" padding="1.25rem 1.25rem 0 1.25rem">
          <span>챌린저스 추가하기</span>
          <BsX onClick={() => closeModal()} />
        </HeaderTitle>

        <Wrapper isColumn padding="1rem">
          <TextInput value={title} onChange={onChangeTitle} placeholder="투 두 제목을 입력해주세요" />
          <WarningText>투 두 제목은 필수사항입니다!</WarningText>
        </Wrapper>
        <CategorySection isColumn alignItems="start">
          <span>카테고리</span>
          <div>
            <CategoryItem
              isSelect={category === 'study'}
              onClick={() => onClickCategoryButton('study')}
              icon={<BsFillHandbagFill />}
            >
              스터디
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'excercise'}
              onClick={() => onClickCategoryButton('excercise')}
              icon={<BsFillHandbagFill />}
            >
              운동
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'shopping'}
              onClick={() => onClickCategoryButton('shopping')}
              icon={<BsFillHandbagFill />}
            >
              쇼핑
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'promise'}
              onClick={() => onClickCategoryButton('promise')}
              icon={<BsFillHandbagFill />}
            >
              약속
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'etc'}
              onClick={() => onClickCategoryButton('etc')}
              icon={<BsFillHandbagFill />}
            >
              기타
            </CategoryItem>
          </div>
        </CategorySection>
        <Wrapper isColumn padding="1rem">
          <Wrapper justifyContent="space-between">
            <span>날짜/기간</span>
            <span>{getSelectDate(selectedDay)}</span>
          </Wrapper>
          <Wrapper margin="1rem 0">
            <Button buttonType="ghost" onClick={() => setShowCalendar(true)}>
              날짜 변경하기
            </Button>
            {showCalendar && (
              <CalendarWrapper>
                <DayPicker
                  mode="multiple"
                  locale={ko}
                  styles={{}}
                  min={1}
                  selected={selectedDay}
                  onSelect={setSelectedDay}
                  fromDate={new Date()}
                  components={{ Row: OnlyFutureRow }}
                  footer={<CalendarFooter onClick={onCloseCalendar} />}
                />
              </CalendarWrapper>
            )}
          </Wrapper>
        </Wrapper>
        <StickyButton isSquare onClick={onClickAddButton} size="large">
          추가하기
        </StickyButton>
      </TodoContents>
    </ModalContainer>
  );
};
