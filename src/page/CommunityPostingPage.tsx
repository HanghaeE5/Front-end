import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Img, TextInput, Wrapper } from '../component/element';
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

export const CommunitiPostingPage = () => {
  const nav = useNavigate();
  const { boardId } = useParams();

  const refectchBoardList = () => {
    nav(PATH.COMMUNITY);
  };

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

  const { mutate: uploadImage } = useMutation(uploadImageFn);
  const { mutate: postBoard } = useMutation(postCummunityFn);
  const { mutate: updateBoard } = useMutation(updateBoardFn);

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
          todoDate: todoDateList[0],
          // TODO : ???????????????
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
      // ??????
      updateBoard(
        {
          boardId: Number(boardId),
          params: {
            board: {
              category: postType,
              content,
              title,
              imageUrl: preview,
            },
            ...todo,
          },
        },
        {
          onSuccess: () => refectchBoardList(),
        },
      );
    } else {
      //??????
      postBoard(
        {
          board: {
            category: postType,
            content,
            title,
            imageUrl: preview,
          },
          ...todo,
        },
        {
          onSuccess: () => refectchBoardList(),
        },
      );
    }
  };

  // TODO : ????????????
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
      <PageLayout title="?????????">
        <ScrollWraper isColumn>
          <Wrapper isColumn padding="1rem">
            <Wrapper justifyContent="space-between">
              <Button
                buttonType={postType === 'DAILY' ? 'primary' : 'default'}
                width="49%"
                onClick={() => setPostType('DAILY')}
              >
                ??????
              </Button>
              <Button
                buttonType={postType === 'CHALLENGE' ? 'primary' : 'default'}
                width="49%"
                onClick={() => onClickChallangersButton()}
              >
                ?????? ??? ???
              </Button>
            </Wrapper>
            {postType === 'CHALLENGE' && todoData && (
              <ChallangersSection onClick={() => onClickChallangersButton()}>
                <span>{todoData.content}</span>
                <span>{`${todoData.todoDateList[0].replaceAll('-', '.')} ${
                  todoData.todoDateList.length > 1 ? `??? ${todoData.todoDateList.length - 1}` : ``
                }`}</span>
              </ChallangersSection>
            )}

            <Wrapper isColumn justifyContent="start" padding="0.5rem 0">
              <TextInput
                value={title}
                onChange={onChangeTitle}
                placeholder="????????? ??????????????????"
                isValidError={requiredError.title}
              />
              <WarningText>?????????????????????!</WarningText>
            </Wrapper>
            <Wrapper isColumn justifyContent="start">
              <TextInput
                type="area"
                value={content}
                onChange={onChangeContent}
                placeholder="????????? ??????????????????"
                isValidError={requiredError.content}
              />
              <WarningText>?????????????????????!</WarningText>
            </Wrapper>
          </Wrapper>
          <Wrapper isColumn padding="1rem">
            <Button buttonType="dashed" onClick={() => onClickImgUploadButton()}>
              <BiCamera /> &nbsp; ?????? ?????????
            </Button>
            {preview && (
              <ImgPreviewSection>
                <Img width="5rem" height="5rem" url={preview} />
                <div>
                  <span>?????? ???????????? 1?????? ???????????????</span>
                  <div>
                    <Button buttonType="ghost" size="small" width="48%" onClick={() => removeImg()}>
                      ????????????
                    </Button>
                    <Button buttonType="ghost" size="small" width="48%" onClick={() => onClickImgUploadButton()}>
                      ????????????
                    </Button>
                  </div>
                </div>
              </ImgPreviewSection>
            )}
            <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImg} accept="image/*" />
          </Wrapper>
          <Wrapper padding="0 1rem" margin="0.5rem 0">
            <Button onClick={onClickAddPostButton}>{boardId ? '????????????' : '????????????'}</Button>
          </Wrapper>
          {modalState.visible && (
            <TodoModal
              editType={modalState.type}
              todoType="with"
              modalTitle="?????? ??? ??? ????????????"
              closeModal={() => setModalState((prev) => ({ ...prev, visible: false }))}
              getTodoDataFromModal={setTodoDataFromModal}
              todoData={modalState.todoData}
            />
          )}
        </ScrollWraper>
      </PageLayout>
    </NavLayout>
  );
};
