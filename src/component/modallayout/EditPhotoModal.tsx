import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { editPhotoModalState, notiModalState } from '../../recoil/store';
import { Children, useRef, useState } from 'react';
import { PropsWithChildren } from 'react';
import { useMutation } from 'react-query';
import { registerApi, UserApi } from '../../api/callApi';
import { useNavigate } from 'react-router';

const Slide = keyframes`
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
`;

const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
};

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: 34.8rem;
  border-radius: 20px 20px 0px 0px;
  margin: auto auto 0 auto;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-color: #d07272;
`;

const BoxSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #6922bb; */
`;

type rowbox = {
  margin?: string;
};

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  /* background-color: #683b3b; */
`;

const ImgLable = styled.label`
  justify-content: center;
  width: 7.5rem;
  height: 2.5rem;
  background-color: #94cef2;
  border: 1px solid white;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #1763a6;
  }
`;

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

const KoreanFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'NotoBold' : 'NotoMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const EnglishFont = styled.p`
  font-size: ${(props: font) => props.size}rem;

  font-family: ${(props: font) => (props.isBold ? 'OpensansBold' : 'OpensansMed')};
  color: ${(props: font) => props.color};
  display: flex;
  margin: 0 0 0 0;
`;

const CheckFont = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'blue' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const CheckFont2 = styled.p`
  font-size: ${(props: font) => props.size}rem;
  font-family: 'NotoRegu';
  color: ${(props: font) => (props.isCorrect !== undefined ? (props.isCorrect ? 'black' : 'red') : props.color)};
  display: flex;
  margin: 0 0 0 0;
  text-align: left;
`;

const InputInfo = styled.input`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 0 0 10px;
  width: ${(props: box) => props.width}rem;
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  :focus {
    background-color: rgb(220, 237, 255);
  }
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-repeat: 0;
`;

type btnable = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isDisable?: boolean;
};

const BtnAble = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 6px;
  width: ${(props: btnable) => props.width};
  height: ${(props: btnable) => props.height}rem;
  margin: ${(props: btnable) => props.margin};
  background: ${(props: btnable) => (props.isDisable ? '#f3f3f3' : '#8ac2f0')};

  cursor: ${(props: btnable) => (props.isDisable ? '' : 'pointer')};

  &:hover {
    ${(props: btnable) =>
      props.isDisable
        ? ''
        : `color: white;
    background-color: #358edc;`}
  }
`;

const EditPhotoModal = () => {
  const [modalEditPhoto, setModalEditPhoto] = useRecoilState(editPhotoModalState);
  const img: any = useRef();
  const nav = useNavigate();
  const [text, setText] = useState();

  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState({
    img_show: '',
    img_file: '',
  });

  // 파일 저장
  const saveFileImage = (e: any) => {
    setFileImage({
      img_show: URL.createObjectURL(e.target.files[0]),
      img_file: e.target.files[0],
    });
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage.img_show);
    setFileImage({
      img_show: '',
      img_file: '',
    });
  };

  const profilePhotoEditData = useMutation((forms: FormData) => UserApi.profilePhotoEditApi(forms), {
    onSuccess: () => {
      setModalEditPhoto(false);
    },
  });

  const onSubmit = () => {
    const formData = new FormData();
    if (fileImage && text) {
      formData.append('img', fileImage.img_file);
    }
    profilePhotoEditData.mutate(formData);
  };

  return (
    <>
      {modalEditPhoto && (
        <ModalBackground onClick={() => setModalEditPhoto(false)}>
          <BoxWrap
            width={'100%'}
            height={34.8}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <RowBox width="92%" height={1.875} margin={'2.5rem 1.25rem 0rem 1.25rem'}>
              <Box width={'5rem'} margin={'auto auto auto 0rem'}>
                <KoreanFont size={1} color="rgba(147, 147, 147, 1)">
                  프로필사진
                </KoreanFont>
              </Box>
              <Box
                width={'1.5rem'}
                height={1.5}
                margin={'auto 0rem auto auto'}
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(/assets/X.svg)',
                }}
              ></Box>
            </RowBox>

            <RowBox width="92%" height={2} margin={'1rem 1.25rem 0rem 1.25rem'}>
              <ImgLable
                htmlFor="img"
                style={{
                  alignItems: 'center',

                  display: 'flex',
                }}
              >
                <KoreanFont size={1}>사진 업로드</KoreanFont>
              </ImgLable>
              <input
                id="img"
                type="file"
                ref={img}
                accept="image/*"
                onChange={saveFileImage}
                style={{ display: 'none' }}
              />
              {fileImage ? (
                <BtnAble
                  width={'7.5rem'}
                  height={2.5}
                  margin={'0 0 0 1rem'}
                  onClick={() => {
                    deleteFileImage();
                    img.current.value = '';
                  }}
                >
                  <KoreanFont size={1}>삭제</KoreanFont>
                </BtnAble>
              ) : (
                ''
              )}
            </RowBox>

            <Box width={'82%'}>
              {fileImage.img_show ? '' : <Box style={{ margin: 'auto' }}>📷사진 업로드를 클릭! </Box>}
              {fileImage.img_show && <Img alt="sample" src={fileImage.img_show} style={{ margin: 'auto' }} />}
            </Box>

            <BtnAble
              isDisable={!fileImage}
              width={'89%'}
              height={4}
              margin={'7.375rem auto 12.8125rem auto'}
              onClick={
                fileImage
                  ? () => {
                      onSubmit();
                    }
                  : () => {
                      null;
                    }
              }
            >
              사진 변경 완료
            </BtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default EditPhotoModal;
