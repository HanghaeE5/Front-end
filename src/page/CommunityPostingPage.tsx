import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Img, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { useInput } from '../hooks/useInput';
import { BiErrorCircle, BiCamera } from 'react-icons/bi';
import { TodoModal } from '../component/TodoModal';
import { Category, TodoData } from '../Types/todo';

const WarningText = styled.div`
  color: ${({ theme }) => theme.color.grayDark};
  width: 100%;
  font-weight: 400;
  font-family: 'NotoRegu';
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.75rem;
`;

const ImgPreviewSection = styled(Wrapper)`
  margin: 0.75rem 0rem;

  & > div:nth-of-type(2) {
    margin-left: 1rem;
    width: 15rem;
    font-family: 'NotoRegu';
    font-weight: 400;
    color: ${({ theme }) => theme.color.grayDark};
    & div {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
      width: 12rem;
    }
  }
`;

const ChallangersSection = styled.div`
  background-color: ${({ theme }) => theme.color.grayDark};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5.875rem;
  border-radius: ${({ theme }) => theme.radius};
  margin: 0.5rem;
  justify-content: center;
  align-items: center;

  & span:nth-of-type(1) {
    color: white;
    font-size: 1.25rem;
    padding: 0.5rem;
  }

  & span:nth-of-type(2) {
    color: #adadad;
    font-size: 0.875rem;
  }
`;

export const CommunitiPostingPage = () => {
  const [postType, setPostType] = useState<'post' | 'challanger'>('post');
  const [preview, setPreview] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [todoData, setTodoData] = useState<TodoData>();

  const { value: title, onChangeValue: onChangeTitle } = useInput();
  const { value: content, onChangeValue: onChangeContent } = useInput();

  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImgUploadButton = () => {
    if (!imageInput.current) return;

    imageInput.current.click();
  };

  const onChangeImg = (input: ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.files);
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();

      const file = input.target.files[0];
      if (!file) return;
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview(reader.result as string);
      };
    }
  };

  const removeImg = () => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }

    setPreview('');
  };

  const onClickChallangersButton = () => {
    setPostType('challanger');
    setModalVisible(true);
  };

  const setTodoDataFromModal = (todo: TodoData) => {
    setTodoData(todo);
  };

  const getDateCount = () => {
    if (!todoData) return;

    const date = Object.keys(todoData.date);

    return `${date[0]} ${date.length > 1 ? `외 ${date.length - 1}` : ``}`;
  };

  return (
    <NavLayout>
      <PageLayout title="글쓰기">
        <Wrapper isColumn padding="1rem">
          <Wrapper justifyContent="space-between">
            <Button
              buttonType={postType === 'post' ? 'primary' : 'default'}
              width="49%"
              onClick={() => setPostType('post')}
            >
              일상
            </Button>
            <Button
              buttonType={postType === 'challanger' ? 'primary' : 'default'}
              width="49%"
              onClick={() => onClickChallangersButton()}
            >
              챌린저스
            </Button>
          </Wrapper>
          {postType === 'challanger' && todoData && (
            <ChallangersSection>
              <span>{todoData.title}</span>
              <span>{getDateCount()}</span>
            </ChallangersSection>
          )}

          <Wrapper isColumn justifyContent="start" padding="0.5rem 0">
            <TextInput value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요" />
            <WarningText>
              <BiErrorCircle />
              필수사항입니다!
            </WarningText>
          </Wrapper>
          <Wrapper isColumn justifyContent="start">
            <TextInput type="area" value={content} onChange={onChangeContent} placeholder="내용을 입력해주세요" />
            <WarningText>
              <BiErrorCircle />
              필수사항입니다!
            </WarningText>
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
          <Button>등록하기</Button>
        </Wrapper>
      </PageLayout>
      {modalVisible && (
        <TodoModal
          modalTitle="챌린저스 추가하기"
          closeModal={() => setModalVisible(false)}
          setTodoDataFromModal={setTodoDataFromModal}
        />
      )}
    </NavLayout>
  );
};
