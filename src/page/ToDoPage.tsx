import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTodo, fetchTodoList, todoQueryKey, updateTodoScope } from '../api/todoApi';
import { Button, ButtonFloating, Wrapper } from '../component/element';
import { Tab } from '../component/element/Tab';
import { Typography } from '../component/element/Typography';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper, TodoListWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { TodoModal } from '../component/TodoModal';
import { Access, Category, ITodoItem, Sort, TodoData, TodoParams, TodoStatus, TodoStatusFilter } from '../Types/todo';

const AccessTabList: { label: string; value: TodoStatus | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doing-list' },
  { label: '완료', value: 'done-list' },
];

export const ToDoPage = () => {
  const queryClient = useQueryClient();

  const [todoModalState, setTodoModalState] = useState<{ modalVisible: boolean; modalType: 'edit' | 'add' }>({
    modalVisible: false,
    modalType: 'add',
  });
  const [access, setAccess] = useState<Access>('public');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'desc',
    page: 1,
    size: 10,
  });

  const [todoData, setTodoData] = useState<TodoData>();

  const { data: todoList, isLoading: loadingTodoList } = useQuery<ITodoItem[]>(
    [todoQueryKey.fetchTodo, todoFilter],
    () => fetchTodoList(todoFilter),
    { onSuccess: (data) => console.log(data) },
  );

  const { mutate: addTodoItem } = useMutation(createTodo, {
    onSuccess: (data) => {
      console.log('addTodo', data);
      queryClient.invalidateQueries(todoQueryKey.fetchTodo);
    },
  });

  const { mutate: updateTodoPublicScope } = useMutation(updateTodoScope, {
    onSuccess: (data) => {
      console.log('scope', data);
    },
  });

  const setTodoDataFromModal = (todo: TodoData) => {
    addTodoItem(todo);
  };

  const toggleModal = () => setTodoModalState((prev) => ({ ...prev, modalVisible: !prev.modalVisible }));

  const onChangeTab = (todoStatus: TodoStatusFilter) => setTodoFilter((prev) => ({ ...prev, filter: todoStatus }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort }));

  const onClickAccessButton = (accessType: Access) => {
    setAccess(accessType);
    updateTodoPublicScope('ALL');
  };

  const onEditButton = ({ category, todoContent, todoId, todoDate }: ITodoItem) => {
    setTodoData({
      content: todoContent,
      category: category as Category,
      todoDate: todoDate,
      todoDateList: [],
      todoId,
    });
    setTodoModalState({ modalType: 'edit', modalVisible: true });
  };

  const onClickAddButton = () => {
    setTodoModalState({ modalType: 'add', modalVisible: true });
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
                  selectedValue={todoFilter.filter}
                  tabList={AccessTabList}
                  onClickItem={onChangeTab}
                />
                <Wrapper width="8rem" justifyContent="space-between">
                  <Typography
                    size={0.875}
                    color={todoFilter.sort === 'desc' ? 'black' : '#989898'}
                    weight={400}
                    onClick={() => onClickOrderFilter('desc')}
                  >
                    최신순
                  </Typography>
                  <Typography color={'#989898'}>|</Typography>
                  <Typography
                    size={0.875}
                    color={todoFilter.sort === 'asc' ? 'black' : '#989898'}
                    isPointer
                    onClick={() => onClickOrderFilter('asc')}
                  >
                    오래된순
                  </Typography>
                </Wrapper>
                <TodoListWrapper isColumn margin="1rem 0">
                  {todoList?.map((todo) => (
                    <TodoItem key={todo.todoId} onClickEditButton={() => onEditButton(todo)} {...todo} />
                  ))}
                </TodoListWrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {todoModalState.modalVisible && (
            <TodoModal
              modalTitle={todoModalState.modalType === 'add' ? '투 두 추가하기' : '투 두 수정하기'}
              closeModal={toggleModal}
              setTodoDataFromModal={setTodoDataFromModal}
              todoData={todoModalState.modalType === 'edit' ? todoData : undefined}
            />
          )}
          {!todoModalState.modalVisible && <ButtonFloating onClick={onClickAddButton} />}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
