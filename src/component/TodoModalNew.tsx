import { ko } from 'date-fns/locale';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ReactComponent as Reset } from '../asset/icons/icon_reset.svg';
import { ReactComponent as Etc } from '../asset/icons/todoIcon/icon_etc.svg';
import { ReactComponent as EtcGray } from '../asset/icons/todoIcon/icon_etc_gray.svg';
import { ReactComponent as Excercise } from '../asset/icons/todoIcon/icon_exercise.svg';
import { ReactComponent as ExcerciseGray } from '../asset/icons/todoIcon/icon_exercise_gray.svg';
import { ReactComponent as PromiseIcon } from '../asset/icons/todoIcon/icon_promise.svg';
import { ReactComponent as PromiseGray } from '../asset/icons/todoIcon/icon_promise_gray.svg';
import { ReactComponent as Shopping } from '../asset/icons/todoIcon/icon_shopping.svg';
import { ReactComponent as ShoppingGray } from '../asset/icons/todoIcon/icon_shopping_gray.svg';
import { ReactComponent as Study } from '../asset/icons/todoIcon/icon_study.svg';
import { ReactComponent as StudyGray } from '../asset/icons/todoIcon/icon_study_gray.svg';

import '../style/day-picker.css';
import { Category, TodoData } from '../Types/todo';
import { Button, TextInput, Typography, Wrapper } from './element';
import {
  Background,
  Calendar,
  CalendarWrapper,
  CategorySection,
  CategoryWrapper,
  CloseButton,
  HeaderTitle,
  ModalContainer,
  StickyButton,
  TodoContents,
} from './styledComponent/TodoModalElements';
import { WarningText } from './WarningText';

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

const getYyyyMmDd = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().split('T')[0];
};

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
    <Wrapper isColumn margin="auto auto auto 4.1rem">
      <Wrapper justifyContent="space-between" margin="0.75rem 0">
        <Button buttonType="ghost" onClick={onClickEveryDay} width="calc(100% - 3.25rem)">
          전체 선택
        </Button>
        <Button buttonType="ghost" onClick={reset} width="3rem">
          <Reset />
        </Button>
      </Wrapper>
      <Button buttonType="default" onClick={onClick}>
        완료
      </Button>
    </Wrapper>
  );
};

const getSelectDate = (selectedDay: Date[] | undefined) => {
  if (!selectedDay) return;

  const firstDate = getYyyyMmDd(selectedDay[0]).replaceAll('-', '.');

  return `${firstDate ? firstDate : ''} ${selectedDay.length > 1 ? `외 ${selectedDay.length - 1}일` : ''}`;
};

export interface TodoModalProps {
  modalTitle: string;
  closeModal: () => void;
  buttonTitle: string;
  onClickButton: (todoData: TodoData) => void;
  todoData?: TodoData;
  isWithTodo?: boolean;
}
export const TodoModalNew = ({
  modalTitle,
  buttonTitle,
  onClickButton,
  todoData,
  closeModal,
  isWithTodo,
}: TodoModalProps) => {
  const [todo, setTodo] = useState<TodoData>(
    todoData || {
      content: '',
      category: 'STUDY',
      todoDateList: [],
    },
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date[]>(
    todoData ? todoData?.todoDateList.map((date) => new Date(date)) : [new Date()],
  );
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const onCloseCalendar = () => setShowCalendar(false);

  const onClickCategoryButton = (category: Category) => {
    setTodo((prev) => ({ ...prev, category }));
  };

  const onChangeTitleInput = (value: string) => {
    setTodo((prev) => ({ ...prev, content: value }));
  };

  const onDatePick = (dateList: Date[] | undefined) => {
    if (!dateList) return;

    if (todo.todoId) {
      setSelectedDay([dateList[dateList.length - 1]]);
      return;
    }
    setSelectedDay(dateList);
  };

  const isSelectedCategory = (thisCategory: Category) => {
    return thisCategory === todo.category;
  };

  const onClickEveryDay = () => {
    const [year, month, today] = new Intl.DateTimeFormat()
      .format(calendarMonth)
      .split('.')
      .map((d) => Number(d));

    const lastDay = new Date(year, month, 0).getDate();

    const allDate: Date[] = [];

    for (let i = today; i <= lastDay; i++) {
      allDate.push(new Date(year, month - 1, i));
    }

    const noDuplicateArray = [...selectedDay, ...allDate]
      .map((date) => new Intl.DateTimeFormat().format(date))
      .reduce<string[]>((acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]), [])
      .map((date) => new Date(date));

    setSelectedDay([...noDuplicateArray]);
  };

  const translateTodoData = () => {
    if (!todo.content) return;

    const date = selectedDay?.map((date) => getYyyyMmDd(date)) || [];

    onClickButton({ ...todo, todoDateList: date });
  };

  return (
    <ModalContainer>
      <Background onClick={() => closeModal()} />
      <TodoContents>
        <HeaderTitle justifyContent="space-between" padding="1.25rem 1rem 0 1rem">
          <span>{modalTitle}</span>
          <CloseButton onClick={() => closeModal()} />
        </HeaderTitle>
        {isWithTodo && (
          <Wrapper padding="0.5rem 1rem">
            <Typography color="#8D8D8D" size={0.875}>
              잠깐! 위 드 투두 게시물은 작성 이후 수정, 삭제가 불가합니다. 제목, 카테고리, 날짜/기간을 유의하여 신중하게
              작성해주세요.
            </Typography>
          </Wrapper>
        )}
        <Wrapper isColumn padding="1rem">
          <TextInput
            inputSize="large"
            inputType="default"
            value={todo.content}
            onChange={onChangeTitleInput}
            placeholder="투두 제목을 입력해주세요"
          />
          <WarningText>투두 제목은 필수사항입니다!</WarningText>
        </Wrapper>
        <CategorySection isColumn alignItems="start">
          <span>카테고리</span>
          <div>
            <CategoryItem
              isSelect={isSelectedCategory('STUDY')}
              onClick={() => onClickCategoryButton('STUDY')}
              icon={isSelectedCategory('STUDY') ? <Study /> : <StudyGray />}
            >
              스터디
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('EXERCISE')}
              onClick={() => onClickCategoryButton('EXERCISE')}
              icon={isSelectedCategory('EXERCISE') ? <Excercise /> : <ExcerciseGray />}
            >
              운동
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('SHOPPING')}
              onClick={() => onClickCategoryButton('SHOPPING')}
              icon={isSelectedCategory('SHOPPING') ? <Shopping /> : <ShoppingGray />}
            >
              쇼핑
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('PROMISE')}
              onClick={() => onClickCategoryButton('PROMISE')}
              icon={isSelectedCategory('PROMISE') ? <PromiseIcon /> : <PromiseGray />}
            >
              약속
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('ETC')}
              onClick={() => onClickCategoryButton('ETC')}
              icon={isSelectedCategory('ETC') ? <Etc /> : <EtcGray />}
            >
              기타
            </CategoryItem>
          </div>
        </CategorySection>
        <Wrapper isColumn padding="1rem 1rem 2rem 1rem">
          <Wrapper justifyContent="space-between" margin="0 0 1rem 0">
            <span>날짜/기간</span>
            <Typography weight={700} size={0.95}>
              {getSelectDate(selectedDay)}
            </Typography>
          </Wrapper>
          <Calendar>
            <Button buttonType="default" size="large" onClick={() => setShowCalendar(true)}>
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
                  onMonthChange={(month: Date) => setCalendarMonth(month)}
                  fromDate={new Date()}
                  footer={
                    <CalendarFooter
                      onClick={onCloseCalendar}
                      onClickEveryDay={onClickEveryDay}
                      reset={() => setSelectedDay([new Date()])}
                    />
                  }
                />
              </CalendarWrapper>
            )}
          </Calendar>
        </Wrapper>
        <StickyButton
          buttonType={todo.content.length === 0 ? 'disable' : 'primary'}
          isSquare
          onClick={translateTodoData}
          size="large"
        >
          {buttonTitle}
        </StickyButton>
      </TodoContents>
    </ModalContainer>
  );
};
