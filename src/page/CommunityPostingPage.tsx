import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Img, PopConfirmNew, PopConfirmProps, TextInput, Typography, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { useInput } from '../hooks/useInput';
import { BiCamera } from 'react-icons/bi';
import { TodoModal } from '../component/TodoModal';
import { Category, ITodoItem, TodoData } from '../Types/todo';
import { useMutation, useQuery } from 'react-query';
import {
  communityQueryKey,
  fetchBoardDetailFn,
  postCummunityFn,
  updateBoardFn,
  uploadImageFn,
} from '../api/communityApi';
import { PostType } from '../Types/community';
import {
  ChallangersSection,
  ImgPreviewSection,
  ScrollWraper,
} from '../component/styledComponent/CommunityPostingElements';
import { WarningText } from '../component/WarningText';
import { useNavigate, useParams } from 'react-router';
import { PATH } from '../route/routeList';
import { usePopConfirm } from '../hooks/usePopConfirm';
import { usePopConfirmState } from '../hooks/usePopConfirmState';
import { PostCard } from '../component/PostCard';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/store';

export const CommunitiPostingPage = () => {
  const nav = useNavigate();
  const { boardId } = useParams();

  const userInfo = useRecoilValue(userInfoState);

  const refectchBoardList = () => {
    nav(PATH.COMMUNITY);
  };

  const [confirmState, setConfirmState] = useState<PopConfirmProps & { visible: boolean }>({
    visible: false,
    iconType: 'warning',
    title: '',
    button: {
      text: '확인',
      onClick: () => {
        console.log('gg');
      },
    },
  });
  const [postType, setPostType] = useState<PostType>('DAILY');
  const [preview, setPreview] = useState('');
  const [modalState, setModalState] = useState<{ visible: boolean; type: 'edit' | 'add'; todoData?: ITodoItem }>({
    visible: false,
    type: 'add',
    todoData: undefined,
  });
  const [todoData, setTodoData] = useState<TodoData>();
  const [requiredError, setRequiredError] = useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  });

  const { value: title, onChangeValue: setTitleValue } = useInput();
  const { value: content, onChangeValue: setContentValue } = useInput();

  useQuery([communityQueryKey.fetchBoardDetail], () => fetchBoardDetailFn(Number(boardId)), {
    enabled: !!boardId,
    onSuccess: (data) => {
      setPostType(data.category);
      setContentValue(data.boardContent);
      setTitleValue(data.title);

      if (data.imageUrl) {
        setPreview(data.imageUrl);
      }

      if (data.todos) {
        const { todoContent, category, todoDate } = data.todos[0];
        setTodoData({
          category: category as Category,
          todoDateList: todoDate,
          content: todoContent,
        });
      }
    },
  });

  const { mutate: uploadImage } = useMutation(uploadImageFn, {
    onError: () =>
      setConfirmState((prev) => ({
        ...prev,
        visible: true,
        title: `사진 업로드에 실패했습니다.`,
        content: '다시 시도해주세요',
        button: { text: '닫기', onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })) },
      })),
  });
  const { mutate: postBoard } = useMutation(postCummunityFn, {
    onError: () =>
      setConfirmState((prev) => ({
        ...prev,
        visible: true,
        title: '게시글 등록에 실패했습니다.',
        button: { text: '닫기', onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })) },
      })),
  });
  const { mutate: updateBoard } = useMutation(updateBoardFn, {
    onError: () =>
      setConfirmState((prev) => ({
        ...prev,
        visible: true,
        title: '게시글 등록에 실패했습니다.',
        button: { text: '닫기', onClick: () => setConfirmState((prev) => ({ ...prev, visible: false })) },
      })),
  });

  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImgUploadButton = () => {
    if (!imageInput.current) return;

    imageInput.current.click();
  };

  const onChangeImg = (input: ChangeEvent<HTMLInputElement>) => {
    if (!input.target.files) return;
    const formData = new FormData();
    formData.append('file', input.target.files[0]);

    uploadImage(formData, {
      onSuccess: (data) => setPreview(data),
    });
  };

  const removeImg = () => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }

    setPreview('');
  };

  const onClickChallangersButton = () => {
    setPostType('CHALLENGE');

    if (todoData) {
      const { content, category, todoDateList } = todoData;
      setModalState({
        visible: true,
        type: 'edit',
        todoData: {
          category: category as Category,
          todoContent: content,
          todoDate: String(todoDateList[0]),
          // TODO : 데이터틀림
          todoId: 1000000000,
          state: false,
        },
      });
    } else {
      setModalState({
        visible: true,
        type: 'add',
      });
    }
  };

  const setTodoDataFromModal = (todo: TodoData | ITodoItem) => {
    setTodoData(todo as TodoData);
  };

  const onClickAddPostButton = () => {
    if (!title) {
      setRequiredError((prev) => ({ ...prev, title: true }));
      return;
    }

    if (!content) {
      setRequiredError((prev) => ({ ...prev, content: true }));
      return;
    }

    const todo = postType === 'CHALLENGE' ? { todo: todoData } : undefined;

    if (boardId) {
      // 수정
      // updateBoard(
      //   {
      //     boardId: Number(boardId),
      //     params: {
      //       board: {
      //         category: postType,
      //         content,
      //         title,
      //         imageUrl: preview,
      //       },
      //       ...todo,
      //     },
      //   },
      //   {
      //     onSuccess: () => refectchBoardList(),
      //   },
      // );
    } else {
      //추가
      // postBoard(
      //   {
      //     board: {
      //       category: postType,
      //       content,
      //       title,
      //       imageUrl: preview,
      //     },
      //     ...todo,
      //   },
      //   {
      //     onSuccess: () => refectchBoardList(),
      //   },
      // );
    }
  };

  // TODO : 리팩토링
  const onChangeTitle = (value: string) => {
    if (requiredError.title) {
      setRequiredError((prev) => ({ ...prev, title: false }));
    }

    setTitleValue(value);
  };

  const onChangeContent = (value: string) => {
    if (requiredError.content) {
      setRequiredError((prev) => ({ ...prev, content: false }));
    }

    if (value.length > 2000) return;

    setContentValue(value);
  };
  return (
    <NavLayout>
      {confirmState.visible && <PopConfirmNew {...confirmState} />}
      <PageLayout title="글쓰기">
        <Wrapper height="100%">
          <ScrollWraper isColumn height="100%">
            <PostCard.PostHeader userImg={userInfo.profileImageUrl} userName={userInfo.nick} />
            <Wrapper isColumn padding="0 1rem">
              <Wrapper justifyContent="space-between" padding="0 0 0.5rem 0">
                <Button
                  buttonType={postType === 'DAILY' ? 'primary' : 'default'}
                  width="49%"
                  onClick={() => setPostType('DAILY')}
                >
                  일상
                </Button>
                <Button
                  buttonType={postType === 'CHALLENGE' ? 'primary' : 'default'}
                  width="49%"
                  onClick={() => onClickChallangersButton()}
                >
                  위드 투 두
                </Button>
              </Wrapper>
              {postType === 'CHALLENGE' && todoData && (
                <ChallangersSection onClick={() => onClickChallangersButton()}>
                  <span>{todoData.content}</span>
                  <span>{`${todoData.todoDateList[0]} ${
                    todoData.todoDateList.length > 1 ? `외 ${todoData.todoDateList.length - 1}` : ``
                  }`}</span>
                </ChallangersSection>
              )}

              <Wrapper isColumn justifyContent="start" padding="0.5rem 0">
                <TextInput
                  value={title}
                  onChange={onChangeTitle}
                  placeholder="제목을 입력해주세요"
                  isValidError={requiredError.title}
                />
                <WarningText>필수사항입니다!</WarningText>
              </Wrapper>
              <Wrapper isColumn justifyContent="start">
                <TextInput
                  type="area"
                  value={content}
                  onChange={onChangeContent}
                  placeholder="내용을 입력해주세요"
                  isValidError={requiredError.content}
                />
                <WarningText>필수사항입니다!</WarningText>
              </Wrapper>
            </Wrapper>
            <Wrapper isColumn padding="0 1rem">
              <Button size="large" buttonType="dashed" onClick={() => onClickImgUploadButton()}>
                <BiCamera /> &nbsp; 사진 업로드
              </Button>
              {preview && (
                <Wrapper margin="0.75rem 0rem">
                  <Img width="5rem" height="5rem" url={preview} />
                  <Wrapper isColumn alignItems="start" padding="0 0.75rem">
                    <Typography size={0.813} color="#696969" weight={400}>
                      사진 업로드는 1장만 가능합니다
                    </Typography>
                    <Wrapper width="10rem" justifyContent="space-between" margin="0.5rem 0 0 0">
                      <Button buttonType="ghost" size="small" width="48.5%" onClick={() => removeImg()}>
                        삭제하기
                      </Button>
                      <Button buttonType="ghost" size="small" width="48.5%" onClick={() => onClickImgUploadButton()}>
                        변경하기
                      </Button>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              )}
              <input
                type="file"
                name="image"
                multiple
                hidden
                ref={imageInput}
                onChange={onChangeImg}
                accept="image/*"
              />
            </Wrapper>
            <Wrapper padding="0 1rem" margin="0.75rem 0">
              <Button size="large" onClick={onClickAddPostButton}>
                {boardId ? '수정하기' : '등록하기'}
              </Button>
            </Wrapper>
            {modalState.visible && (
              <TodoModal
                editType={modalState.type}
                todoType="with"
                modalTitle="위드 투 두 추가하기"
                closeModal={() => setModalState((prev) => ({ ...prev, visible: false }))}
                getTodoDataFromModal={setTodoDataFromModal}
                todoData={modalState.todoData}
              />
            )}
          </ScrollWraper>
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
