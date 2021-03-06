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
          ?????? ??????
        </Button>
        <Button buttonType="ghost" onClick={reset} width="3rem">
          <Reset />
        </Button>
      </Wrapper>
      <Button buttonType="default" onClick={onClick}>
        ??????
      </Button>
    </Wrapper>
  );
};

const getSelectDate = (selectedDay: Date[] | undefined) => {
  if (!selectedDay) return;

  const firstDate = getYyyyMmDd(selectedDay[0]).replaceAll('-', '.');

  return `${firstDate ? firstDate : ''} ${selectedDay.length > 1 ? `??? ${selectedDay.length - 1}???` : ''}`;
};

interface TodoModalProps {
  editType: 'edit' | 'add';
  todoType?: 'with' | 'my';
  modalTitle: string;
  getTodoDataFromModal: (todo: TodoData) => void;
  closeModal: () => void;
  todoData?: ITodoItem;
}
export const TodoModal = ({
  editType,
  todoData,
  todoType = 'my',
  modalTitle,
  getTodoDataFromModal,
  closeModal,
}: TodoModalProps) => {
  const { value: title, onChangeValue: onChangeTitle } = useInput(todoData?.todoContent);
  // const [isTitleRequired, setIsTitleRequired] = useState(false);
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
    // if (value) setIsTitleRequired(false);
    onChangeTitle(value);
  };

  const onClickAddButton = () => {
    // setIsTitleRequired(false);

    if (!title) return;
    // setIsTitleRequired(true);

    const date = selectedDay?.map((date) => getYyyyMmDd(date)) || [];

    getTodoDataFromModal({ content: title, category, todoDateList: date, todoId: todoData?.todoId });

    closeModal();
  };

  const onDatePick = (dateList: Date[] | undefined) => {
    if (!dateList) return;

    setSelectedDay(dateList);
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
        <HeaderTitle justifyContent="space-between" padding="1.25rem 1rem 0 1rem">
          <span>{modalTitle}</span>
          <BsX onClick={() => closeModal()} />
        </HeaderTitle>
        {todoType === 'with' && (
          <Wrapper padding="0.5rem 1rem">
            <Typography color="#8D8D8D" size={0.875}>
              ??????! ??? ??? ??? ??? ???????????? ?????? ?????? ??????, ????????? ???????????????. ??????, ????????????, ??????/????????? ????????????
              ???????????? ??????????????????.
            </Typography>
          </Wrapper>
        )}
        <Wrapper isColumn padding="1rem">
          <TextInput
            inputSize="large"
            inputType="default"
            value={title}
            onChange={onChangeTitleInput}
            placeholder="??? ??? ????????? ??????????????????"
            // isValidError={isTitleRequired}
          />
          <WarningText>??? ??? ????????? ?????????????????????!</WarningText>
        </Wrapper>
        <CategorySection isColumn alignItems="start">
          <span>????????????</span>
          <div>
            <CategoryItem
              isSelect={isSelectedCategory('STUDY')}
              onClick={() => onClickCategoryButton('STUDY')}
              icon={isSelectedCategory('STUDY') ? <Study /> : <StudyGray />}
            >
              ?????????
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('EXERCISE')}
              onClick={() => onClickCategoryButton('EXERCISE')}
              icon={isSelectedCategory('EXERCISE') ? <Excercise /> : <ExcerciseGray />}
            >
              ??????
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('SHOPPING')}
              onClick={() => onClickCategoryButton('SHOPPING')}
              icon={isSelectedCategory('SHOPPING') ? <Shopping /> : <ShoppingGray />}
            >
              ??????
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('PROMISE')}
              onClick={() => onClickCategoryButton('PROMISE')}
              icon={isSelectedCategory('PROMISE') ? <PromiseIcon /> : <PromiseGray />}
            >
              ??????
            </CategoryItem>
            <CategoryItem
              isSelect={isSelectedCategory('ETC')}
              onClick={() => onClickCategoryButton('ETC')}
              icon={isSelectedCategory('ETC') ? <Etc /> : <EtcGray />}
            >
              ??????
            </CategoryItem>
          </div>
        </CategorySection>
        <Wrapper isColumn padding="1rem 1rem 2rem 1rem">
          <Wrapper justifyContent="space-between">
            <span>??????/??????</span>
            <Typography weight={700} size={0.95}>
              {getSelectDate(selectedDay)}
            </Typography>
          </Wrapper>
          <Wrapper margin="1rem 0">
            <Button buttonType="default" size="large" onClick={() => setShowCalendar(true)}>
              ?????? ????????????
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
        <StickyButton
          buttonType={title.length === 0 ? 'disable' : 'primary'}
          isSquare
          onClick={onClickAddButton}
          size="large"
        >
          ????????????
        </StickyButton>
      </TodoContents>
    </ModalContainer>
  );
};
