import { ko } from 'date-fns/locale';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { BsX } from 'react-icons/bs';
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
import { useInput } from '../hooks/useInput';
import '../style/day-picker.css';
import { Category, ITodoItem, TodoData } from '../Types/todo';
import { Button, TextInput, Typography, Wrapper } from './element';
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
    <Wrapper isColumn>
      <Wrapper justifyContent="space-between" margin="0.75rem 0">
        <Button buttonType="ghost" onClick={onClickEveryDay} width="calc(100% - 3.25rem)">
          매일 선택
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

    const date = selectedDay?.map((date) => getYyyyMmDd(date)) || [];

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

  const isSelectedCategory = (thisCategory: Category) => {
    return thisCategory === category;
  };

  const onClickEveryDay = () => {
    const [year, month, today] = new Intl.DateTimeFormat()
      .format(new Date())
      .split('.')
      .map((d) => Number(d));

    const lastDay = new Date(year, month, 0).getDate();

    const allDate = [];

    for (let i = today; i <= lastDay; i++) {
      allDate.push(new Date(year, month - 1, i));
    }

    setSelectedDay([...allDate]);
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
            inputSize="large"
            inputType="default"
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
          <Wrapper justifyContent="space-between">
            <span>날짜/기간</span>
            <Typography weight={700} size={0.95}>
              {getSelectDate(selectedDay)}
            </Typography>
          </Wrapper>
          <Wrapper margin="1rem 0">
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
          </Wrapper>
        </Wrapper>
        <StickyButton isSquare onClick={onClickAddButton} size="large">
          추가하기
        </StickyButton>
      </TodoContents>
    </ModalContainer>
  );
};
