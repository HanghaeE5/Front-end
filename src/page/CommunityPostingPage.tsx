import React, { ChangeEvent, useRef, useState } from 'react';
import { Button, Img, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { useInput } from '../hooks/useInput';
import { BiCamera } from 'react-icons/bi';
import { TodoModal } from '../component/TodoModal';
import { ITodoItem, TodoData } from '../Types/todo';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  communityQueryKey,
  fetchBoardDetailFn,
  postCummunityFn,
  updateBoardFn,
  uploadImageFn,
} from '../api/communityApi';
import { PostType } from '../Types/community';
import { ChallangersSection, ImgPreviewSection } from '../component/styledComponent/CommunityPostingElements';
import { WarningText } from '../component/WarningText';
import { useNavigate, useParams } from 'react-router';
import { PATH } from '../route/routeList';

export const CommunitiPostingPage = () => {
  const nav = useNavigate();
  const { boardId } = useParams();
  const queryClient = useQueryClient();

  const refectchBoardList = () => {
    queryClient.invalidateQueries(communityQueryKey.fetchBoard);
    nav(PATH.COMMUNITY);
  };

  const [postType, setPostType] = useState<PostType>('DAILY');
  const [preview, setPreview] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [todoData, setTodoData] = useState<TodoData>();
  const [requiredError, setRequiredError] = useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  });

  const { value: title, onChangeValue: setTitleValue } = useInput();
  const { value: content, onChangeValue: setContentValue } = useInput();

  const { data } = useQuery([communityQueryKey.fetchBoardDetail], () => fetchBoardDetailFn(Number(boardId)), {
    enabled: !!boardId,
    onSuccess: (data) => {
      setPostType(data.category);
      setContentValue(data.boardContent);
      setTitleValue(data.title);

      if (data.imageUrl) {
        setPreview(data.imageUrl);
      }

      // TODO : 챌린저스 일때 투두 셋팅해야함
      // setTodoData(data.todos);
    },
  });
  console.log(data);

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
    setModalVisible(true);
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

    console.log(title, content);
    if (boardId) {
      // 수정
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
      //추가
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

    setContentValue(value);
  };
  return (
    <NavLayout>
      <PageLayout title="글쓰기">
        <Wrapper isColumn padding="1rem">
          <Wrapper justifyContent="space-between">
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
              챌린저스
            </Button>
          </Wrapper>
          {postType === 'CHALLENGE' && todoData && (
            <ChallangersSection>
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
        <Wrapper isColumn padding="1rem">
          <Button buttonType="dashed" onClick={() => onClickImgUploadButton()}>
            <BiCamera /> &nbsp; 사진 업로드
          </Button>
          {preview && (
            <ImgPreviewSection>
              <Img width="5rem" height="5rem" url={preview} />
              <div>
                <span>사진 업로드는 1장만 가능합니다</span>
                <div>
                  <Button buttonType="ghost" size="small" width="48%" onClick={() => removeImg()}>
                    삭제하기
                  </Button>
                  <Button buttonType="ghost" size="small" width="48%" onClick={() => onClickImgUploadButton()}>
                    변경하기
                  </Button>
                </div>
              </div>
            </ImgPreviewSection>
          )}
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImg} accept="image/*" />
        </Wrapper>
        <Wrapper padding="0 1rem" margin="0.5rem 0">
          <Button onClick={onClickAddPostButton}>{boardId ? '수정하기' : '등록하기'}</Button>
        </Wrapper>
      </PageLayout>
      {modalVisible && (
        <TodoModal
          modalType="add"
          modalTitle="챌린저스 추가하기"
          closeModal={() => setModalVisible(false)}
          getTodoDataFromModal={setTodoDataFromModal}
        />
      )}
    </NavLayout>
  );
};
