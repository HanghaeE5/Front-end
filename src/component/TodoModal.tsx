import { useInput } from '../hooks/useInput';
import { Button, TextInput, Wrapper } from './element';
import { WarningText } from './WarningText';
import { BsFillHandbagFill, BsX } from 'react-icons/bs';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import { differenceInCalendarDays } from 'date-fns';
import { Category, ITodoItem, TodoData } from '../Types/todo';
import {
  Background,
  CalendarWrapper,
  CategorySection,
  CategoryWrapper,
  HeaderTitle,
  ModalContainer,
  StickyButton,
  TodoContents,
} from './styledComponent/TodoModalElements';
import styled from 'styled-components';

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

const OverButton = styled(Button)`
  left: 0rem;
  bottom: -1rem;
  position: relative;
  border-radius: 0 0 6px 6px;
`;

const CalendarFooter = ({
  onClick,
  onClickEveryDay,
  reset,
}: {
  onClick: () => void;
  onClickEveryDay: () => void;
  reset: () => void;
}) => {
  return (
    <Wrapper isColumn>
      <Wrapper justifyContent="space-between" margin="0.25rem 0">
        <Button buttonType="default" onClick={onClick} width="calc(100% - 3.25rem)">
          매일 선택
        </Button>
        <Button buttonType="default" onClick={reset} width="3rem">
          초기화
        </Button>
      </Wrapper>
      <OverButton isSquare width="112%">
        선택
      </OverButton>
    </Wrapper>
  );
};

const getSelectDate = (selectedDay: Date[] | undefined) => {
  if (!selectedDay) return;

  const firstDate = selectedDay[0]?.toISOString().split('T')[0];

  return `${firstDate ? firstDate : ''} ${selectedDay.length > 1 ? `외 ${selectedDay.length - 1}건` : ''}`;
};

interface TodoModalProps {
  modalType: 'edit' | 'add';
  modalTitle: string;
  getTodoDataFromModal: (todo: TodoData) => void;
  closeModal: () => void;
  todoData?: ITodoItem;
}
export const TodoModal = ({ modalType, todoData, modalTitle, getTodoDataFromModal, closeModal }: TodoModalProps) => {
  const { value: title, onChangeValue: onChangeTitle } = useInput(todoData?.todoContent);
  const [isTitleRequired, setIsTitleRequired] = useState(false);
  const [category, setCategory] = useState<Category>((todoData?.category as Category) || 'STUDY');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date[] | undefined>(
    todoData ? [new Date(todoData.todoDate)] : [new Date()],
  );

  const onCloseCalendar = () => setShowCalendar(false);

  const onClickCategoryButton = (category: Category) => {
    setCategory(category);
  };

  const onChangeTitleInput = (value: string) => {
    if (value) setIsTitleRequired(false);
    onChangeTitle(value);
  };

  const onClickAddButton = () => {
    setIsTitleRequired(false);

    if (!title) {
      setIsTitleRequired(true);
      return;
    }

    const date = selectedDay?.map((selectedDay) => selectedDay.toISOString().split('T')[0]) || [];

    getTodoDataFromModal({ content: title, category, todoDateList: date, todoId: todoData?.todoId });

    closeModal();
  };

  const onDatePick = (dateList: Date[] | undefined) => {
    if (!dateList) return;

    if (modalType === 'edit') {
      const lastPick = dateList[dateList.length - 1];
      setSelectedDay([lastPick]);
    } else {
      setSelectedDay(dateList);
    }
  };
  return (
    <ModalContainer>
      <Background onClick={() => closeModal()} />
      <TodoContents>
        <HeaderTitle justifyContent="space-between" padding="1.25rem 1.25rem 0 1.25rem">
          <span>{modalTitle}</span>
          <BsX onClick={() => closeModal()} />
        </HeaderTitle>

        <Wrapper isColumn padding="1rem">
          <TextInput
            value={title}
            onChange={onChangeTitleInput}
            placeholder="투 두 제목을 입력해주세요"
            isValidError={isTitleRequired}
          />
          <WarningText>투 두 제목은 필수사항입니다!</WarningText>
        </Wrapper>
        <CategorySection isColumn alignItems="start">
          <span>카테고리</span>
          <div>
            <CategoryItem
              isSelect={category === 'STUDY'}
              onClick={() => onClickCategoryButton('STUDY')}
              icon={<BsFillHandbagFill />}
            >
              스터디
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'EXERCISE'}
              onClick={() => onClickCategoryButton('EXERCISE')}
              icon={<BsFillHandbagFill />}
            >
              운동
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'SHOPPING'}
              onClick={() => onClickCategoryButton('SHOPPING')}
              icon={<BsFillHandbagFill />}
            >
              쇼핑
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'PROMISE'}
              onClick={() => onClickCategoryButton('PROMISE')}
              icon={<BsFillHandbagFill />}
            >
              약속
            </CategoryItem>
            <CategoryItem
              isSelect={category === 'ETC'}
              onClick={() => onClickCategoryButton('ETC')}
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
                  onSelect={onDatePick}
                  fromDate={new Date()}
                  footer={
                    <CalendarFooter
                      onClick={onCloseCalendar}
                      onClickEveryDay={() => console.log('매일')}
                      reset={() => setSelectedDay([new Date()])}
                    />
                  }
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
