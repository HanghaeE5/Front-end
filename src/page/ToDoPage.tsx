import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { createTodo, deleteTodoFn, fetchTodoList, todoQueryKey, updateTodoFn, updateTodoScope } from '../api/todoApi';
import { Button, ButtonFloating, Wrapper, PopConfirmNew, Tab, Typography, PopConfirmProps } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ScrollWrapper, TodoListWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { PATH } from '../route/routeList';
import {
  PublicScope,
  ITodoItem,
  Sort,
  TodoData,
  TodoParams,
  TodoStatusFilter,
  TodoDoneResponse,
  Category,
} from '../Types/todo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalGatherState, userInfoState } from '../recoil/store';
import { EvBtn } from '../component/element/BoxStyle';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import { ReactComponent as Empty } from '../asset/icons/icon_empty.svg';
import { removeListDuplicate } from '../utils/removeListDuplicate';
import { TodoModalNew, TodoModalProps } from '../component/TodoModalNew';

const AccessTabList: { label: string; value: TodoStatusFilter | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doingList' },
  { label: '완료', value: 'doneList' },
];

const emptyParagraph: { [key in TodoStatusFilter | 'all']: string } = {
  all: `아직 투 두 리스트가 없어요. \n 오른쪽 하단에 버튼을 눌러 추가하거나 \n 커뮤니티에서 위드 투 두에 참여해보세요!`,
  doingList: `진행중인 투 두 리스트가 없어요. \n 오른쪽 하단에 버튼을 눌러 추가하거나 \n 커뮤니티에서 위드 투 두에 참여해보세요!`,
  doneList: `완료한 투 두 리스트가 없어요. \n 혼자서 그리고 함께 투 두 리스트를 완료해보세요!`,
};

// TODO : context API 써볼까
export const ToDoPage = () => {
  const [bottomRef, isBottom] = useInView();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const [list, setList] = useState<ITodoItem[]>([]);

  const [scope, setScope] = useState<PublicScope>(userInfoData?.publicScope || 'ALL');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'desc',
    page: 0,
    size: 20,
  });

  const [todoModalStateNew, setTodoModalStateNew] = useState<{
    visible: boolean;
    todoProps: TodoModalProps;
  }>({
    visible: false,
    todoProps: {
      modalTitle: '마이 투 두 추가하기',
      closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
      buttonTitle: '추가하기',
      onClickButton: (todo: TodoData) => console.log(todo),
    },
  });

  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'success',
    title: '',
    button: { text: '확인', onClick: () => setConfirmState((prev) => ({ ...prev, setConfirmState: false })) },
  });

  const closeConfirm = () => setConfirmState((prev) => ({ ...prev, visible: false }));

  // TODO : 훅으로 묶어볼까
  const { data: todoList, isLoading: loadingTodoList } = useQuery(
    [todoQueryKey.fetchTodo, todoFilter],
    () => fetchTodoList(todoFilter),
    {
      onSuccess: (data) => {
        if (todoFilter.page === 0) {
          setList([...removeListDuplicate<ITodoItem>(data.content, 'todoId')]);
          return;
        }

        setList((prev) => removeListDuplicate<ITodoItem>([...prev, ...data.content], 'todoId'));
      },
    },
  );

  const refetchTodoList = () => {
    setTodoFilter((prev) => ({ ...prev, page: 0 }));
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

  const { mutate: addTodoItem } = useMutation(createTodo, {
    onSuccess: () => {
      setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
      refetchTodoList();
      setConfirmState({
        visible: true,
        iconType: 'success',
        title: '투두를 등록했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      });
    },
    onError: () =>
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '등록에 실패했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      }),
  });

  const { mutate: updateTodo } = useMutation(updateTodoFn, {
    onSuccess: () => {
      setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
      refetchTodoList();
      setConfirmState({
        visible: true,
        iconType: 'success',
        title: '투두를 수정했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      });
    },
    onError: () =>
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '수정에 실패했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      }),
  });

  const { mutate: deleteTodo } = useMutation(deleteTodoFn, {
    onSuccess: () => {
      setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
      refetchTodoList();
      setConfirmState({
        visible: true,
        iconType: 'success',
        title: '삭제했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      });
    },
    onError: () =>
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '삭제에 실패했습니다.',
        button: {
          text: '확인',
          onClick: closeConfirm,
        },
      }),
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

  const onChangeTab = (todoStatus: TodoStatusFilter) =>
    setTodoFilter((prev) => ({ ...prev, filter: todoStatus, page: 0 }));

  const onClickOrderFilter = (sort: Sort) => setTodoFilter((prev) => ({ ...prev, sort, page: 0 }));

  const onChangeScope = (accessType: PublicScope) => {
    setScope(accessType);
    updateTodoPublicScope(accessType);
  };

  // TODO ITEM 등록, 수정, 삭제
  const onClickAddButton = () => {
    setTodoModalStateNew({
      visible: true,
      todoProps: {
        modalTitle: '마이 투 두 추가하기',
        closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
        buttonTitle: '추가하기',
        onClickButton: (todo: TodoData) => addTodoItem(todo),
      },
    });
  };

  const onClickEditButton = (todoItem: ITodoItem) => {
    if (todoItem.boardId) {
      setConfirmState({
        visible: true,
        iconType: 'warning',
        title: '위드 투 두는 수정이 불가합니다.',
        button: { text: '확인', onClick: closeConfirm },
      });

      return;
    }

    setTodoModalStateNew({
      visible: true,
      todoProps: {
        modalTitle: '마이 투 두 수정하기',
        closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
        buttonTitle: '수정하기',
        todoData: {
          todoId: todoItem.todoId,
          content: todoItem.todoContent,
          category: todoItem.category as Category,
          todoDateList: [todoItem.todoDate],
        },
        onClickButton: (todo: TodoData) =>
          updateTodo({
            todoId: todoItem.todoId,
            params: {
              content: todo.content,
              category: todo.category,
              todoDate: todo.todoDateList[0],
            },
          }),
      },
    });
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

          deleteTodo(todo.todoId);
        },
      },
    });
  };

  // TODO 완료
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
      setUserInfoData({
        ...userInfoData,
        characterInfo: {
          ...userInfoData.characterInfo,
          characterName: data.characterInfo.characterName,
          characterUrl: data.characterInfo.characterUrl,
        },
      });

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

  const moveToBoard = (boardId: number | undefined) => {
    nav(`${PATH.COMMUNITY}/${boardId}`);
  };

  // 무한 스크롤링 로직
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
      {confirmState.visible && <PopConfirmNew {...confirmState} />}
      <LevelUpModal />
      <StepUpModal />
      <PageLayout title="투 두 리스트">
        <Wrapper padding="1rem" isColumn alignItems="start" height="100%">
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
          </Wrapper>
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
          <TodoListWrapper isColumn margin="1rem 0" justifyContent="center">
            {list.length === 0 && (
              <Wrapper isColumn justifyContent="center">
                <Empty />
                <Typography size={0.875} align="center" color="#5F5F5F" weight={400} lineHeight={1.25}>
                  {emptyParagraph[todoFilter.filter]}
                </Typography>
              </Wrapper>
            )}
            {list.length > 0 && (
              <ScrollWrapper isColumn>
                {list.map((todo) => (
                  <TodoItem
                    key={todo.todoId}
                    todoData={todo}
                    onClickEditButton={onClickEditButton}
                    onClickDeleteButton={onClickDeleteButton}
                    handleDoneTodo={handleDoneTodo}
                  />
                ))}
                {list.length ? <div ref={bottomRef} /> : ''}
              </ScrollWrapper>
            )}
          </TodoListWrapper>
        </Wrapper>
        {todoModalStateNew.visible && <TodoModalNew {...todoModalStateNew.todoProps} />}
        {!todoModalStateNew.visible && <ButtonFloating onClick={onClickAddButton} />}
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
      </PageLayout>
    </NavLayout>
  );
};
