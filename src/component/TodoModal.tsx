import { useInput } from '../hooks/useInput';
import { Button, TextInput, Wrapper } from './element';
import { WarningText } from './WarningText';
import { BsFillHandbagFill, BsX } from 'react-icons/bs';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import { differenceInCalendarDays } from 'date-fns';
import { Category, TodoData } from '../Types/todo';
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

const isPastDate = (date: Date) => {
  return differenceInCalendarDays(date, new Date()) < 0;
};

const OnlyFutureRow = (props: RowProps) => {
  const isPastRow = props.dates.every(isPastDate);
  if (isPastRow) return <></>;
  return <Row {...props} />;
};

const getSelectDate = (selectedDay: Date[] | undefined) => {
  if (!selectedDay) return;

  const firstDate = selectedDay[0]?.toISOString().split('T')[0];

  return `${firstDate ? firstDate : ''} ${selectedDay.length > 1 ? `외 ${selectedDay.length - 1}건` : ''}`;
};

interface TodoModalProps {
  modalTitle: string;
  setTodoDataFromModal: (todo: TodoData) => void;
  closeModal: () => void;
  todoData?: TodoData;
}
export const TodoModal = ({ todoData, modalTitle, setTodoDataFromModal, closeModal }: TodoModalProps) => {
  const { value: title, onChangeValue: onChangeTitle } = useInput(todoData?.content);
  const [isRequired, setIsRequired] = useState(false);
  const [category, setCategory] = useState<Category>(todoData?.category || 'STUDY');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date[] | undefined>(
    todoData ? [new Date(todoData.todoDate)] : [new Date()],
  );

  const onCloseCalendar = () => setShowCalendar(false);

  const onClickCategoryButton = (category: Category) => {
    setCategory(category);
  };

  const onChangeTitleInput = (value: string) => {
    if (value) setIsRequired(false);
    onChangeTitle(value);
  };

  const onClickAddButton = () => {
    setIsRequired(false);

    if (!title) {
      setIsRequired(true);
      return;
    }

    const date = selectedDay?.map((selectedDay) => selectedDay.toISOString().split('T')[0]) || [];

    setTodoDataFromModal({ content: title, category, todoDate: date[0] || '', todoDateList: date });
    closeModal();
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
            isValidError={isRequired}
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
