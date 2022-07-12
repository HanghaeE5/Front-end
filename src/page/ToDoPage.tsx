import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTodo, fetchTodoList, todoQueryKey, updateTodoFn, updateTodoScope } from '../api/todoApi';
import { Button, ButtonFloating, Wrapper } from '../component/element';
import { Tab } from './../component/element/Tab';
import { Typography } from './../component/element/Typography';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper, TodoListWrapper } from './../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { TodoModal } from './../component/TodoModal';
import { Access, ITodoItem, Sort, TodoData, TodoParams, TodoStatus, TodoStatusFilter } from '../Types/todo';

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
  const [access, setAccess] = useState<Access>('ALL');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'desc',
    page: 0,
    size: 10,
  });

  const [todoData, setTodoData] = useState<ITodoItem>();

  const { data: todoList, isLoading: loadingTodoList } = useQuery<ITodoItem[]>(
    [todoQueryKey.fetchTodo, todoFilter],
    () => fetchTodoList(todoFilter),
    { onSuccess: (data) => console.log(data) },
  );

  const { mutate: addTodoItem } = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(todoQueryKey.fetchTodo);
    },
  });

  const { mutate: updateTodoItem } = useMutation(updateTodoFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(todoQueryKey.fetchTodo);
    },
  });

  const { mutate: updateTodoPublicScope } = useMutation(updateTodoScope, {
    onSuccess: () => alert('변경 완료되었습니다'),
  });

  const getTodoDataFromModal = (todo: TodoData) => {
    if (todoModalState.modalType === 'add') {
      addTodoItem(todo as TodoData);
    } else {
      if (!todo.todoId) return;

      updateTodoItem({
        todoId: todo.todoId,
        params: { ...todo, todoDate: todo.todoDateList[0] },
      });
    }
  };

  const toggleModal = () => setTodoModalState((prev) => ({ ...prev, modalVisible: !prev.modalVisible }));

  const onChangeTab = (todoStatus: TodoStatusFilter) => setTodoFilter((prev) => ({ ...prev, filter: todoStatus }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort }));

  const onClickAccessButton = (accessType: Access) => {
    setAccess(accessType);
    updateTodoPublicScope('ALL');
  };

  const onEditButton = (todo: ITodoItem) => {
    setTodoData(todo);
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
                  buttonType={access === 'ALL' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('ALL')}
                >
                  전체 공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'FRIEND' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('FRIEND')}
                >
                  친구공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'NONE' ? 'primary' : 'default'}
                  onClick={() => onClickAccessButton('NONE')}
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
              modalType={todoModalState.modalType}
              modalTitle={todoModalState.modalType === 'add' ? '투 두 추가하기' : '투 두 수정하기'}
              closeModal={toggleModal}
              getTodoDataFromModal={getTodoDataFromModal}
              todoData={todoModalState.modalType === 'edit' ? todoData : undefined}
            />
          )}
          {!todoModalState.modalVisible && <ButtonFloating onClick={onClickAddButton} />}
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
