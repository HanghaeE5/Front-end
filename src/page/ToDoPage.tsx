import { useState } from 'react';
import { Button, ButtonFloating, Wrapper } from '../component/element';
import { Tab } from '../component/element/Tab';
import { Typography } from '../component/element/Typography';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper, TodoListWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { TodoModal } from '../component/TodoModal';
import { Access, ITodoItem, Order, TodoData, TodoFiler, TodoStatus, TodoStatusFilter } from '../Types/todo';

const AccessTabList: { label: string; value: TodoStatus | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'done' },
  { label: '전체', value: 'doing' },
];

const TodoList: ITodoItem[] = [
  {
    category: 'study',
    createdDate: '2022-07-09',
    state: false,
    todoContent: '초코 산책 시키고 발 닦아주기',
    todoDate: '2022-07-09',
    todoId: 1,
  },
  {
    category: 'excercise',
    createdDate: '2022-07-09',
    state: false,
    todoContent: '초코 산책 시키고 발 닦아주기',
    todoDate: '2022-07-09',
    todoId: 2,
  },
  {
    category: 'shopping',
    createdDate: '2022-07-09',
    state: true,
    todoContent: '초코 산책 시키고 발 닦아주기',
    todoDate: '2022-07-09',
    todoId: 3,
  },
  {
    category: 'shopping',
    createdDate: '2022-07-09',
    state: true,
    todoContent: '초코 산책 시키고 발 닦아주기',
    todoDate: '2022-07-09',
    todoId: 5,
  },
  {
    category: 'shopping',
    createdDate: '2022-07-09',
    state: true,
    todoContent: '초코 산책 시키고 발 닦아주기',
    todoDate: '2022-07-09',
    todoId: 4,
  },
];

export const ToDoPage = () => {
  const [access, setAccess] = useState<Access>('public');
  const [todoFilter, setTodoFilter] = useState<TodoFiler>({
    todoStatus: 'all',
    order: 'latest',
  });
  const [todoData, setTodoData] = useState<TodoData>();
  const [modalVisible, setModalVisible] = useState(false);
  const setTodoDataFromModal = (todo: TodoData) => {
    console.log('gg');
    // setTodoData(todo);
  };

  const toggleModal = () => setModalVisible((prev) => !prev);

  const onChangeTab = (todoStatus: TodoStatusFilter) => setTodoFilter((prev) => ({ ...prev, todoStatus }));

  const onClickOrderFilter = (order: Order) => setTodoFilter((prev) => ({ ...prev, order }));

  const onClickAccessButton = (accessType: Access) => {
    setAccess(accessType);
  };

  return (
    <NavLayout>
      <PageLayout title="투 두 리스트">
        <ContentWrapper>
          <Wrapper padding="1rem" isColumn alignItems="start">
            <Wrapper isColumn alignItems="start" margin="1rem 0">
              <Typography weight={500} size={1.125}>
                공개 범위 설정
              </Typography>
              <Wrapper justifyContent="space-between" padding="1rem 0">
                <Button
                  width="32%"
                  buttonType={access === 'public' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('public')}
                >
                  전체 공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'freind' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('freind')}
                >
                  친구공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'private' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('private')}
                >
                  비공개
                </Button>
              </Wrapper>
              <Wrapper isColumn alignItems="start" margin="1em 0">
                <Typography weight={500} size={1.125}>
                  나의 TO DO LIST
                </Typography>
                <Tab<TodoStatusFilter>
                  selectedValue={todoFilter.todoStatus}
                  tabList={AccessTabList}
                  onClickItem={onChangeTab}
                />
                <Wrapper width="8rem" justifyContent="space-between">
                  <Typography
                    size={0.875}
                    color={todoFilter.order === 'latest' ? 'black' : '#989898'}
                    weight={400}
                    onClick={() => onClickOrderFilter('latest')}
                  >
                    최신순
                  </Typography>
                  <Typography color={'#989898'}>|</Typography>
                  <Typography
                    size={0.875}
                    color={todoFilter.order === 'old' ? 'black' : '#989898'}
                    isPointer
                    onClick={() => onClickOrderFilter('old')}
                  >
                    오래된순
                  </Typography>
                </Wrapper>
                <TodoListWrapper isColumn margin="1rem 0">
                  {TodoList.map((todo) => (
                    <TodoItem key={todo.todoId} {...todo} />
                  ))}
                </TodoListWrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {modalVisible && <TodoModal closeModal={toggleModal} setTodoDataFromModal={setTodoDataFromModal} />}
          {!modalVisible && <ButtonFloating onClick={toggleModal} />}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
