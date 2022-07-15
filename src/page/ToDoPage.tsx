import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { createTodo, deleteTodoFn, fetchTodoList, todoQueryKey, updateTodoFn, updateTodoScope } from '../api/todoApi';
import { Button, ButtonFloating, Wrapper, PopConfirmNew, Tab, Typography, PopConfirmProps } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ContentWrapper, TodoListWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { TodoModal } from '../component/TodoModal';
import { PATH } from '../route/routeList';
import { PublicScope, ITodoItem, Sort, TodoData, TodoParams, TodoStatusFilter } from '../Types/todo';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/store';

const AccessTabList: { label: string; value: TodoStatusFilter | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doingList' },
  { label: '완료', value: 'doneList' },
];

const confirmTitle: { [key in 'edit' | 'delete']: string } = {
  delete: `위드 투두는 게시물에서 \n 신청을 취소할 수 있습니다.`,
  edit: '위드 투 두는 수정이 불가합니다.',
};

const confirmContent: { [key in 'edit' | 'delete']: string } = {
  delete: '모집 마감일까지 취소 가능합니다.',
  edit: '',
};

// TODO : util에 있음
const removeDuplicate = <T,>(list: T[], key: keyof T): T[] => {
  return list.reduce((acc: T[], cur) => (acc.find((data: T) => data[key] === cur[key]) ? [...acc] : [...acc, cur]), []);
};

// TODO : context API 써볼까
export const ToDoPage = () => {
  const [bottomRef, isBottom] = useInView();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const userInfo = useRecoilValue(userInfoState);

  const [list, setList] = useState<ITodoItem[]>([]);
  const [todoModalState, setTodoModalState] = useState<{ modalVisible: boolean; modalType: 'edit' | 'add' }>({
    modalVisible: false,
    modalType: 'add',
  });
  const [scope, setScope] = useState<PublicScope>(userInfo?.publicScope || 'ALL');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'desc',
    page: 0,
    size: 4,
  });

  const [todoData, setTodoData] = useState<ITodoItem>();
  const [confirmStateOld, setConfirmStateOld] = useState<{ confirmVisible: boolean; confirmType: 'edit' | 'delete' }>({
    confirmVisible: false,
    confirmType: 'edit',
  });

  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'success',
    title: '',
    rightButton: { text: '확인', onClick: () => console.log('확인') },
  });

  const closeConfirm = () => setConfirmState((prev) => ({ ...prev, visible: false }));

  const { data: todoList, isLoading: loadingTodoList } = useQuery(
    [todoQueryKey.fetchTodo, todoFilter],
    () => fetchTodoList(todoFilter),
    {
      onSuccess: (data) => {
        if (todoFilter.page === 0) {
          setList([...removeDuplicate<ITodoItem>(data.content, 'todoId')]);
          return;
        }

        setList((prev) => removeDuplicate<ITodoItem>([...prev, ...data.content], 'todoId'));
      },
    },
  );

  const refetchTodoList = () => {
    setTodoFilter((prev) => ({ ...prev, page: 0 }));
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

  // TODO : 훅으로 묶어볼까
  const { mutate: addTodoItem } = useMutation(createTodo, {
    onSuccess: () => refetchTodoList(),
  });

  const { mutate: updateTodo } = useMutation(updateTodoFn, {
    onSuccess: () => refetchTodoList(),
  });

  const { mutate: deleteTodo } = useMutation(deleteTodoFn, {
    onSuccess: () => refetchTodoList(),
  });

  const { mutate: updateTodoPublicScope } = useMutation(updateTodoScope, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchUserInfo');
      setConfirmState({
        visible: true,
        iconType: 'success',
        title: '변경되었습니다',
        rightButton: {
          text: '확인',
          onClick: closeConfirm,
        },
      });
    },
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

  const toggleConfirm = () => setConfirmStateOld((prev) => ({ ...prev, confirmVisible: !prev.confirmVisible }));

  const onChangeTab = (todoStatus: TodoStatusFilter) =>
    setTodoFilter((prev) => ({ ...prev, filter: todoStatus, page: 0 }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort, page: 0 }));

  const onChangeScope = (accessType: PublicScope) => {
    setScope(accessType);
    updateTodoPublicScope('ALL');
  };

  const editTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      setConfirmStateOld({ confirmVisible: true, confirmType: 'edit' });
      return;
    }

    setTodoData(todo);
    setTodoModalState({ modalType: 'edit', modalVisible: true });
  };

  const deleteTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      ``;
      setConfirmStateOld({ confirmVisible: true, confirmType: 'delete' });
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

  useEffect(() => {
    if (loadingTodoList || !isBottom || todoList?.last) return;

    setTodoFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isBottom, loadingTodoList, todoList]);

  return (
    <NavLayout>
      <PageLayout title="투 두 리스트">
        <ContentWrapper>
          {confirmStateOld.confirmVisible && (
            <PopConfirmNew
              iconType="warning"
              title={confirmTitle[confirmStateOld.confirmType]}
              content={confirmContent[confirmStateOld.confirmType]}
              rightButton={{ text: '확인', onClick: () => toggleConfirm() }}
              leftButton={
                confirmStateOld.confirmType === 'delete'
                  ? {
                      text: '게시물로 이동',
                      onClick: () => moveToBoard(),
                    }
                  : undefined
              }
            />
          )}
          {confirmState.visible && <PopConfirmNew {...confirmState} />}
          <Wrapper padding="1rem" isColumn alignItems="start">
            <Wrapper isColumn alignItems="start" margin="1rem 0">
              <Typography weight={500} size={1.125}>
                공개 범위 설정
              </Typography>
              <Wrapper justifyContent="space-between" padding="1rem 0">
                <Button
                  width="32%"
                  buttonType={scope === 'ALL' ? 'primary' : 'default'}
                  onClick={() => onChangeScope('ALL')}
                >
                  전체 공개
                </Button>
                <Button
                  width="32%"
                  buttonType={scope === 'FRIEND' ? 'primary' : 'default'}
                  onClick={() => onChangeScope('FRIEND')}
                >
                  친구공개
                </Button>
                <Button
                  width="32%"
                  buttonType={scope === 'NONE' ? 'primary' : 'default'}
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
                  {list.map((todo) => (
                    <TodoItem
                      key={todo.todoId}
                      todoData={todo}
                      onClickEditButton={editTodoItem}
                      onClickDeleteButton={deleteTodoItem}
                    />
                  ))}
                  <div ref={bottomRef} />
                </TodoListWrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          {todoModalState.modalVisible && (
            <TodoModal
              editType={todoModalState.modalType}
              modalTitle={todoModalState.modalType === 'add' ? '마이 투 두 추가하기' : '마이 투 두 수정하기'}
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
