import { ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { createTodo, deleteTodoFn, fetchTodoList, todoQueryKey, updateTodoFn, updateTodoScope } from '../api/todoApi';
import { Button, ButtonFloating, Wrapper } from '../component/element';
import { PopConfirmNew } from '../component/element/PopConfirmNew';
import { Tab } from '../component/element/Tab';
import { Typography } from '../component/element/Typography';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper, TodoListWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { TodoModal } from '../component/TodoModal';
import { PATH } from '../route/routeList';
import { Access, ITodoItem, Sort, TodoData, TodoParams, TodoStatus, TodoStatusFilter } from '../Types/todo';

const AccessTabList: { label: string; value: TodoStatus | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doing-list' },
  { label: '완료', value: 'done-list' },
];

const confirmTitle: { [key in 'edit' | 'delete']: string } = {
  delete: `위드 투두는 게시물에서 \n 신청을 취소할 수 있습니다.`,
  edit: '위드 투 두는 수정이 불가합니다.',
};

const confirmContent: { [key in 'edit' | 'delete']: string } = {
  delete: '모집 마감일까지 취소 가능합니다.',
  edit: '',
};

export const ToDoPage = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const refectchTodoList = () => {
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

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
  const [confirmState, setConfirmState] = useState<{ confirmVisible: boolean; confirmType: 'edit' | 'delete' }>({
    confirmVisible: false,
    confirmType: 'edit',
  });

  const { data: todoList, isLoading: loadingTodoList } = useQuery<ITodoItem[]>(
    [todoQueryKey.fetchTodo, todoFilter],
    () => fetchTodoList(todoFilter),
  );

  const { mutate: addTodoItem } = useMutation(createTodo, {
    onSuccess: () => refectchTodoList(),
  });

  const { mutate: updateTodo } = useMutation(updateTodoFn, {
    onSuccess: () => refectchTodoList(),
  });

  const { mutate: deleteTodo } = useMutation(deleteTodoFn, {
    onSuccess: () => refectchTodoList(),
  });

  const { mutate: updateTodoPublicScope } = useMutation(updateTodoScope, {
    onSuccess: () => alert('변경 완료되었습니다'),
  });

  const getTodoDataFromModal = (todo: TodoData) => {
    if (todoModalState.modalType === 'add') {
      addTodoItem(todo as TodoData);
    } else {
      if (!todo.todoId) return;

      updateTodo({
        todoId: todo.todoId,
        params: { ...todo, todoDate: todo.todoDateList[0] },
      });
    }
  };

  const toggleModal = () => setTodoModalState((prev) => ({ ...prev, modalVisible: !prev.modalVisible }));

  const toggleConfirm = () => setConfirmState((prev) => ({ ...prev, confirmVisible: !prev.confirmVisible }));

  const onChangeTab = (todoStatus: TodoStatusFilter) => setTodoFilter((prev) => ({ ...prev, filter: todoStatus }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort }));

  const onChangeScope = (accessType: Access) => {
    setAccess(accessType);
    updateTodoPublicScope('ALL');
  };

  const editTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      setConfirmState({ confirmVisible: true, confirmType: 'edit' });
      return;
    }

    setTodoData(todo);
    setTodoModalState({ modalType: 'edit', modalVisible: true });
  };

  const deleteTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      setConfirmState({ confirmVisible: true, confirmType: 'delete' });
      return;
    }

    setTodoData(todo);
    deleteTodo(todo.todoId);
  };

  const onClickAddButton = () => {
    setTodoModalState({ modalType: 'add', modalVisible: true });
  };

  const moveToBoard = () => {
    if (!todoData?.boardId) return;

    toggleConfirm();
    nav(`${PATH.COMMUNITY_POST}/${todoData?.boardId}`);
  };

  return (
    <NavLayout>
      <PageLayout title="투 두 리스트">
        <ContentWrapper>
          {confirmState.confirmVisible && (
            <PopConfirmNew
              confirmType="warning"
              title={confirmTitle[confirmState.confirmType]}
              content={confirmContent[confirmState.confirmType]}
              rightButton={{ text: '확인', onClick: () => toggleConfirm() }}
              leftButton={
                confirmState.confirmType === 'delete'
                  ? {
                      text: '게시물로 이동',
                      onClick: () => moveToBoard(),
                    }
                  : undefined
              }
            />
          )}
          <Wrapper padding="1rem" isColumn alignItems="start">
            <Wrapper isColumn alignItems="start" margin="1rem 0">
              <Typography weight={500} size={1.125}>
                공개 범위 설정
              </Typography>
              <Wrapper justifyContent="space-between" padding="1rem 0">
                <Button
                  width="32%"
                  buttonType={access === 'ALL' ? 'primary' : 'default'}
                  onClick={() => onChangeScope('ALL')}
                >
                  전체 공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'FRIEND' ? 'primary' : 'default'}
                  onClick={() => onChangeScope('FRIEND')}
                >
                  친구공개
                </Button>
                <Button
                  width="32%"
                  buttonType={access === 'NONE' ? 'primary' : 'default'}
                  onClick={() => onChangeScope('NONE')}
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
                    <TodoItem
                      key={todo.todoId}
                      todoData={todo}
                      onClickEditButton={editTodoItem}
                      onClickDeleteButton={deleteTodoItem}
                    />
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
