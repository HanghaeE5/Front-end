import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import {
  createTodo,
  deleteTodoFn,
  fetchTodoList,
  todoQueryKey,
  updateDoneTodo,
  updateTodoFn,
  updateTodoScope,
} from '../api/todoApi';
import { Button, ButtonFloating, Wrapper, PopConfirmNew, Tab, Typography, PopConfirmProps } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { ScrollWrapper, SpinnerWrapper } from '../component/styledComponent/TodoPageComponents';
import { TodoItem } from '../component/TodoItem';
import { PATH } from '../route/routeList';
import { PublicScope, ITodoItem, Sort, TodoData, TodoParams, TodoStatusFilter, Category } from '../Types/todo';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../recoil/store';
import LevelUpModal from '../component/modallayout/LevelUpModal';
import StepUpModal from '../component/modallayout/StepUpModal';
import { ReactComponent as Empty } from '../asset/icons/icon_empty.svg';
import { ReactComponent as Stroke } from '../asset/icons/stroke.svg';
import { removeListDuplicate } from '../utils/removeListDuplicate';
import { TodoModalNew, TodoModalProps } from '../component/TodoModalNew';
import { useCommonConfirm } from '../hooks/useCommonConfirm';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../Types/Interface';
import styled from 'styled-components';

const AccessTabList: { label: string; value: TodoStatusFilter | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '진행', value: 'doingList' },
  { label: '완료', value: 'doneList' },
];

const emptyParagraph: { [key in TodoStatusFilter | 'all']: string } = {
  all: `아직 투두리스트가 없어요. \n 오른쪽 하단에 버튼을 눌러 추가하거나 \n 커뮤니티에서 위드 투두에 참여해보세요!`,
  doingList: `진행중인 투두리스트가 없어요. \n 오른쪽 하단에 버튼을 눌러 추가하거나 \n 커뮤니티에서 위드 투두에 참여해보세요!`,
  doneList: `완료한 투두리스트가 없어요. \n 혼자서 그리고 함께 투두리스트를 완료해보세요!`,
};

const Divider = styled(Stroke)`
  margin: 0 0.75rem;
`;
export const ToDoPage = () => {
  const [bottomRef, isBottom] = useInView();
  const scrollDiv = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  const [list, setList] = useState<ITodoItem[]>([]);

  const [scope, setScope] = useState<PublicScope>(userInfoData?.publicScope || 'ALL');
  const [todoFilter, setTodoFilter] = useState<TodoParams>({
    filter: 'all',
    sort: 'today',
    page: 0,
    size: 50,
  });

  const [todoModalStateNew, setTodoModalStateNew] = useState<{
    visible: boolean;
    todoProps: TodoModalProps;
  }>({
    visible: false,
    todoProps: {
      modalTitle: '마이 투두 추가하기',
      closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
      buttonTitle: '추가하기',
      onClickButton: (todo: TodoData) => console.log(todo),
    },
  });

  const closeTodoModal = () => {
    setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
  };

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
      refetchTodoList();
      closeTodoModal();
      openSuccessConfirm({ title: '등록했습니다' });
    },
    onError: () => openErrorConfirm({}),
  });

  const { mutate: updateTodo } = useMutation(updateTodoFn, {
    onSuccess: () => {
      refetchTodoList();
      closeTodoModal();
      openSuccessConfirm({ title: '수정했습니다.' });
    },
    onError: () => openErrorConfirm({}),
  });

  const { mutate: deleteTodo } = useMutation(deleteTodoFn, {
    onSuccess: () => {
      openSuccessConfirm({ title: '삭제했습니다.', button: { text: '확인', onClick: refetchTodoList } });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      openErrorConfirm({ content: error.response?.data.msg });
    },
  });

  const { mutate: doneTodo } = useMutation(updateDoneTodo, {
    onError: (error) => openErrorConfirm({}),
  });

  const { mutate: updateTodoPublicScope } = useMutation(updateTodoScope, {
    onSuccess: () => queryClient.invalidateQueries('fetchUserInfo'),
    onError: () => openErrorConfirm({}),
  });

  const onChangeTab = (todoStatus: TodoStatusFilter) =>
    setTodoFilter((prev) => ({
      ...prev,
      filter: todoStatus,
      page: 0,
      sort: prev.sort === 'today' && todoStatus !== 'all' ? 'desc' : prev.sort,
    }));

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
        modalTitle: '마이 투두 추가하기',
        closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
        buttonTitle: '추가하기',
        onClickButton: (todo: TodoData) => addTodoItem(todo),
      },
    });
  };

  const onClickEditButton = (todoItem: ITodoItem) => {
    if (todoItem.boardId) {
      openErrorConfirm({ title: '위드 투두는 수정이 불가합니다.' });
      return;
    }

    setTodoModalStateNew({
      visible: true,
      todoProps: {
        modalTitle: '마이 투두 수정하기',
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
          closeConfirm();

          if (todo.boardId) {
            setConfirmState({
              visible: true,
              iconType: 'warning',
              title: '위드 투두는 게시물에서 \n 신청을 취소할 수 있습니다.',
              content: '모집 마감일까지 취소 가능합니다',
              optionalButton: {
                text: '게시물로 이동',
                onClick: () => {
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

  const onClickDoneButton = (todoItem: ITodoItem) => {
    setConfirmState({
      visible: true,
      iconType: 'withTodo',
      title: '완료하시겠습니까?',
      button: {
        text: '닫기',
        onClick: closeConfirm,
      },
      optionalButton: {
        text: '완료',
        onClick: () => {
          closeConfirm();
          doneTodo(todoItem.todoId, {
            onSuccess: (data) => {
              const {
                characterInfo: { levelUp, stepUp, todayDone },
              } = data;

              const tempList = [...list];
              const idx = tempList.findIndex((todo) => todo.todoId === todoItem.todoId);
              tempList.splice(idx, 1, { ...list[idx], state: true });
              setList([...tempList]);

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

              if (todayDone && todayDone <= 10) {
                openSuccessConfirm({
                  title: '투두 완료!',
                  content: `오늘 투두를 ${todayDone}개 완료했어요👍`,
                });
              } else if (todayDone && todayDone > 10) {
                openSuccessConfirm({
                  title: `벌써 ${todayDone}개나 했어요😎`,
                  content: `캐릭터 경험치와 아이템 개수는 하루 10개까지만 반영됩니다. 내일도 열심히 해서 같이 성장해요!`,
                });
              }
            },
          });
        },
      },
    });
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
    {
      confirmState.visible && <PopConfirmNew {...confirmState} />;
    }
    if (!userInfoData) return;
    setScope(userInfoData.publicScope);
  }, [userInfoData]);

  return (
    <NavLayout>
      {confirmState.visible && <PopConfirmNew {...confirmState} />}
      <LevelUpModal />
      <StepUpModal />
      <PageLayout title="투두리스트">
        <ScrollWrapper ref={scrollDiv}>
          <Wrapper isColumn alignItems="start" margin="0 0 1rem 0">
            <Typography weight={500} size={1.125}>
              공개 범위 설정
            </Typography>
            <Wrapper justifyContent="space-between" margin="1rem 0 0 0">
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
          </Wrapper>
          <Wrapper isColumn alignItems="start" margin="1rem 0 0 0">
            <Typography weight={500} size={1.125}>
              나의 투두리스트
            </Typography>
            <Tab<TodoStatusFilter>
              selectedValue={todoFilter.filter}
              tabList={AccessTabList}
              onClickItem={onChangeTab}
            />
          </Wrapper>
          <Wrapper>
            {todoFilter.filter === 'all' && (
              <>
                <Typography
                  size={0.813}
                  color={todoFilter.sort === 'today' ? 'black' : '#989898'}
                  weight={400}
                  isPointer
                  onClick={() => onClickOrderFilter('today')}
                  lineHeight={1.203}
                >
                  당일
                </Typography>
                <Divider />
              </>
            )}
            <Typography
              size={0.813}
              color={todoFilter.sort === 'desc' ? 'black' : '#989898'}
              weight={400}
              isPointer
              onClick={() => onClickOrderFilter('desc')}
              lineHeight={1.203}
            >
              최신순
            </Typography>
            <Divider />
            <Typography
              size={0.813}
              color={todoFilter.sort === 'asc' ? 'black' : '#989898'}
              isPointer
              onClick={() => onClickOrderFilter('asc')}
              lineHeight={1.203}
            >
              오래된순
            </Typography>
          </Wrapper>
          <Wrapper isColumn margin="1rem 0" justifyContent="start">
            {list.length === 0 && (
              <Wrapper isColumn justifyContent="center" height="100%">
                <Empty />
                <Typography size={0.875} align="center" color="#5F5F5F" weight={400} lineHeight={1.25}>
                  {emptyParagraph[todoFilter.filter]}
                </Typography>
              </Wrapper>
            )}
            {list.length > 0 && (
              <>
                {list.map((todo) => (
                  <TodoItem
                    key={todo.todoId}
                    todoData={todo}
                    onClickEditButton={onClickEditButton}
                    onClickDeleteButton={onClickDeleteButton}
                    onClickDoneButton={onClickDoneButton}
                  />
                ))}
                {list.length ? <SpinnerWrapper ref={bottomRef}>df</SpinnerWrapper> : ''}
              </>
            )}
          </Wrapper>
        </ScrollWrapper>
        {todoModalStateNew.visible && <TodoModalNew {...todoModalStateNew.todoProps} />}
        {!todoModalStateNew.visible && <ButtonFloating onClick={onClickAddButton} scrollRef={scrollDiv} />}{' '}
      </PageLayout>
    </NavLayout>
  );
};
