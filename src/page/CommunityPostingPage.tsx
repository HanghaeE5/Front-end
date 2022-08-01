import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Img, PopConfirmNew, PopConfirmProps, TextInput, Typography, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { BiCamera } from 'react-icons/bi';
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
import { ChallangersSection, ImgButton, ScrollWraper } from '../component/styledComponent/CommunityPostingElements';
import { WarningText } from '../component/WarningText';
import { useNavigate, useParams } from 'react-router';
import { PATH } from '../route/routeList';

import { PostCard } from '../component/PostCard';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/store';
import { TodoModalNew, TodoModalProps } from '../component/TodoModalNew';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

export const CommunitiPostingPage = () => {
  const nav = useNavigate();
  const { boardId } = useParams();

  const userInfo = useRecoilValue(userInfoState);
  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  const refectchBoardList = () => {
    nav(PATH.COMMUNITY);
  };

  const [todoData, setTodoData] = useState<TodoData>();

  const [requiredError, setRequiredError] = useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  });

  const [post, setPost] = useState<{ postType: PostType; title: string; content: string; preview?: string }>({
    postType: 'DAILY',
    title: '',
    content: '',
    preview: '',
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

  // CRUD query
  useQuery([communityQueryKey.fetchBoardDetail], () => fetchBoardDetailFn(Number(boardId)), {
    enabled: !!boardId,
    onSuccess: (data) => {
      setPost({ postType: data.category, title: data.title, content: data.boardContent, preview: data.imageUrl });

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
    onSuccess: (data) => setPost((prev) => ({ ...prev, preview: data })),
    onError: () => openErrorConfirm({ title: '사진 업로드에 실패했습니다.' }),
  });

  const { mutate: addBoard } = useMutation(postCummunityFn, {
    onSuccess: () =>
      openSuccessConfirm({ title: '게시글을 등록했습니다.', button: { text: '확인', onClick: refectchBoardList } }),
    onError: () => openSuccessConfirm({}),
  });

  const { mutate: updateBoard } = useMutation(updateBoardFn, {
    onSuccess: () =>
      openSuccessConfirm({ title: '게시글을 수정했습니다.', button: { text: '확인', onClick: refectchBoardList } }),
    onError: () => openErrorConfirm({ title: '게시글 등록에 실패했습니다.' }),
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

    uploadImage(formData);
  };

  const removeImg = () => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }

    setPost((prev) => ({ ...prev, preview: '' }));
  };

  const addWithTodo = () => {
    setPost((prev) => ({ ...prev, postType: 'CHALLENGE' }));

    if (todoData) return;

    setTodoModalStateNew({
      visible: true,
      todoProps: {
        isWithTodo: true,
        modalTitle: '위드 투두 추가하기',
        closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
        buttonTitle: '추가하기',
        onClickButton: (todo: TodoData) => {
          setTodoData(todo);
          setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
        },
      },
    });
  };

  const editWithTodo = () => {
    setTodoModalStateNew({
      visible: true,
      todoProps: {
        isWithTodo: true,
        modalTitle: '위드 투두 수정하기',
        closeModal: () => setTodoModalStateNew((prev) => ({ ...prev, visible: false })),
        buttonTitle: '수정하기',
        todoData,
        onClickButton: (todo: TodoData) => {
          setTodoData(todo);
          setTodoModalStateNew((prev) => ({ ...prev, visible: false }));
        },
      },
    });
  };

  const onClickAddPostButton = () => {
    if (!post.title || !post.content || (post.postType === 'CHALLENGE' && !todoData)) return;

    const todo = post.postType === 'CHALLENGE' ? { todo: todoData } : undefined;

    addBoard({
      board: {
        category: post.postType,
        content: post.content,
        title: post.title,
        imageUrl: post.preview,
      },
      ...todo,
    });
  };

  const onClickEditPostButton = () => {
    if (!post.title || !post.content) return;

    updateBoard({
      boardId: Number(boardId),
      params: {
        board: {
          category: post.postType,
          content: post.content,
          title: post.title,
          imageUrl: post.preview,
        },
        todo: todoData,
      },
    });
  };

  // TODO : 리팩토링
  const onChangeTitle = (value: string) => {
    if (requiredError.title) {
      setRequiredError((prev) => ({ ...prev, title: false }));
    }

    setPost((prev) => ({ ...prev, title: value }));
  };

  const onChangeContent = (value: string) => {
    if (requiredError.content) {
      setRequiredError((prev) => ({ ...prev, content: false }));
    }

    if (value.length > 2000) return;

    setPost((prev) => ({ ...prev, content: value }));
  };
  return (
    <NavLayout>
      <PageLayout title="글쓰기">
        <Wrapper height="100%">
          <ScrollWraper isColumn height="100%">
            <PostCard.PostHeader userImg={userInfo?.profileImageUrl} userName={userInfo?.nick} />
            <Wrapper isColumn padding="0 1rem">
              <Wrapper justifyContent="space-between" padding="0 0 0.5rem 0">
                <Button
                  buttonType={post.postType === 'DAILY' ? 'primary' : 'default'}
                  width="49%"
                  onClick={() => setPost((prev) => ({ ...prev, postType: 'DAILY' }))}
                >
                  일상
                </Button>
                <Button
                  buttonType={post.postType === 'CHALLENGE' ? 'primary' : 'default'}
                  width="49%"
                  onClick={() => addWithTodo()}
                >
                  위드 투두
                </Button>
              </Wrapper>
              {post.postType === 'CHALLENGE' && todoData && (
                <ChallangersSection onClick={() => editWithTodo()}>
                  <span>{todoData.content}</span>
                  <span>{`${todoData.todoDateList[0]} ${
                    todoData.todoDateList.length > 1 ? `외 ${todoData.todoDateList.length - 1}` : ``
                  }`}</span>
                </ChallangersSection>
              )}

              <Wrapper isColumn justifyContent="start" padding="0.625rem 0">
                <TextInput
                  value={post.title}
                  onChange={onChangeTitle}
                  placeholder="제목을 입력해주세요"
                  isValidError={requiredError.title}
                />
                <WarningText>필수사항입니다!</WarningText>
              </Wrapper>
              <Wrapper isColumn justifyContent="start" margin="0.625rem 0">
                <TextInput
                  type="area"
                  value={post.content}
                  onChange={onChangeContent}
                  placeholder="내용을 입력해주세요"
                  isValidError={requiredError.content}
                />
                <WarningText>필수사항입니다!</WarningText>
              </Wrapper>
            </Wrapper>
            <Wrapper isColumn margin="0.625rem 0" padding="0 1rem">
              <Button size="large" buttonType="dashed" onClick={() => onClickImgUploadButton()}>
                <BiCamera /> &nbsp; 사진 업로드
              </Button>
              {post.preview && (
                <Wrapper margin="0.75rem 0rem">
                  <Img width="5rem" height="5rem" url={post.preview} />
                  <Wrapper isColumn alignItems="start" padding="0 0.75rem">
                    <Typography size={0.813} color="#696969" weight={400}>
                      사진 업로드는 1장만 가능합니다
                    </Typography>
                    <Wrapper width="10rem" justifyContent="space-between" margin="0.5rem 0 0 0">
                      <ImgButton onClick={() => removeImg()}>삭제하기</ImgButton>
                      <ImgButton onClick={() => onClickImgUploadButton()}>변경하기</ImgButton>
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
              <Button
                buttonType={
                  !post.title || !post.content || (post.postType === 'CHALLENGE' && !todoData) ? 'disable' : 'primary'
                }
                size="large"
                onClick={boardId ? onClickEditPostButton : onClickAddPostButton}
              >
                {boardId ? '수정하기' : '등록하기'}
              </Button>
            </Wrapper>
            {todoModalStateNew.visible && <TodoModalNew {...todoModalStateNew.todoProps} />}
          </ScrollWraper>
        </Wrapper>
      </PageLayout>
    </NavLayout>
  );
};
