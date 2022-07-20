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
import { PublicScope, ITodoItem, Sort, TodoData, TodoParams, TodoStatusFilter, TodoDoneResponse } from '../Types/todo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalGatherState, userInfoState } from '../recoil/store';
import { EvBtn } from '../component/element/BoxStyle';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import { MdTurnedIn } from 'react-icons/md';

const AccessTabList: { label: string; value: TodoStatusFilter | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doingList' },
  { label: '완료', value: 'doneList' },
];

// TODO : util에 있음
const removeDuplicate = <T,>(list: T[], key: keyof T): T[] => {
  return list.reduce((acc: T[], cur) => (acc.find((data: T) => data[key] === cur[key]) ? [...acc] : [...acc, cur]), []);
};

// TODO : context API 써볼까
export const ToDoPage = () => {
  const [bottomRef, isBottom] = useInView();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const [list, setList] = useState<ITodoItem[]>([]);
  const [todoModalState, setTodoModalState] = useState<{ modalVisible: boolean; modalType: 'edit' | 'add' }>({
    modalVisible: false,
    modalType: 'add',
  });
  const [scope, setScope] = useState<PublicScope>(userInfoData?.publicScope || 'ALL');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'desc',
    page: 0,
    size: 20,
  });

  const [todoData, setTodoData] = useState<ITodoItem>();

  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'success',
    title: '',
    button: { text: '확인', onClick: () => setConfirmState((prev) => ({ ...prev, setConfirmState: false })) },
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
        button: {
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

  const onChangeTab = (todoStatus: TodoStatusFilter) =>
    setTodoFilter((prev) => ({ ...prev, filter: todoStatus, page: 0 }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort, page: 0 }));

  const onChangeScope = (accessType: PublicScope) => {
    setScope(accessType);
    updateTodoPublicScope(accessType);
  };

  const editTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '위드 투 두는 수정이 불가합니다.',
        button: { text: '확인', onClick: closeConfirm },
      });

      return;
    }

    setTodoData(todo);
    setTodoModalState({ modalType: 'edit', modalVisible: true });
  };

  const onClickDeleteButton = (todo: ITodoItem) => {
    setConfirmState({
      visible: true,
      iconType: 'warning',
      title: '삭제하시겠습니까?',
      button: {
        text: '닫기',
        onClick: closeConfirm,
      },
      optionalButton: {
        text: '삭제',
        onClick: () => {
          closeConfirm();
          deleteTodoItem(todo);
        },
      },
    });
  };

  const handleDoneTodo = (data: TodoDoneResponse | undefined) => {
    if (!data) {
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '😓실패했어요. 다시 시도해주세요',
        button: { text: '확인', onClick: closeConfirm },
      });
      return;
    }

    const {
      characterInfo: { levelUp, stepUp },
    } = data;
    if (stepUp) {
      console.log(data);
      setmodalGather({ ...modalGather, stepUpModal: true });
      return;
    }
    if (!stepUp && levelUp) {
      setmodalGather({ ...modalGather, levelUpModal: true });
      return;
    }

    setConfirmState((prev) => ({
      ...prev,
      visible: true,
      iconType: 'success',
      title: '투두완료!',
      button: { text: '확인', onClick: closeConfirm },
    }));
  };

  const deleteTodoItem = (todo: ITodoItem) => {
    if (todo.boardId) {
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '위드 투 두는 게시물에서 \n 신청을 취소할 수 있습니다.',
        content: '모집 마감일까지 취소 가능합니다',
        optionalButton: {
          text: '게시물로 이동',
          onClick: () => {
            closeConfirm();
            moveToBoard(todo?.boardId);
          },
        },
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      });
      return;
    }

    setTodoData(todo);
    deleteTodo(todo.todoId);
  };

  const onClickAddButton = () => {
    setTodoModalState({ modalType: 'add', modalVisible: true });
  };

  const moveToBoard = (boardId: number | undefined) => {
    nav(`${PATH.COMMUNITY_POST}/${boardId}`);
  };

  useEffect(() => {
    if (loadingTodoList || !isBottom || todoList?.last) return;

    setTodoFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isBottom, loadingTodoList, todoList]);

  useEffect(() => {
    if (!userInfoData) return;
    setScope(userInfoData.publicScope);
  }, [userInfoData]);

  return (
    <NavLayout>
      <PageLayout title="투 두 리스트">
        <ContentWrapper>
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
                      onClickDeleteButton={onClickDeleteButton}
                      handleDoneTodo={handleDoneTodo}
                    />
                  ))}
                  {list.length ? <div ref={bottomRef} /> : ''}
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
          <EvBtn
            onClick={() => {
              setmodalGather({ ...modalGather, levelUpModal: true });
            }}
          >
            레벨업모달
          </EvBtn>
          <LevelUpModal />
          <EvBtn
            onClick={() => {
              setmodalGather({ ...modalGather, stepUpModal: true });
            }}
          >
            스텝업모달
          </EvBtn>
          <StepUpModal />
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
