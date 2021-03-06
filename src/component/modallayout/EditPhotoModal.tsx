import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { editPhotoModalState, userPhotoWaitState, userprofilephotoState } from '../../recoil/store';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/callApi';

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
  /* background-color: #d07272; */
`;

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
  width: 25%;
  height: 3rem;
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

export const Img = styled.img`
  width: 100%;
  /* height: 100%; */
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
  type Img = {
    img_show: string;
    img_file: File | string | Blob;
  };

  //?????? ????????? url??? ???????????? state
  const [fileImage, setFileImage] = useRecoilState(userprofilephotoState);

  //?????? ?????? ?????????
  const [userPhotoWait, setUserPhotoWait] = useRecoilState(userPhotoWaitState);

  // ?????? ????????????
  const saveFileImage = (event: React.ChangeEvent) => {
    const e = event.target as HTMLInputElement;
    const files: FileList | null = e.files;

    if (files) {
      setUserPhotoWait({
        img_show: URL.createObjectURL(files[0]),
        img_file: files[0],
      });
    }
  };

  // ?????? ??????
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage.img_show);
    setUserPhotoWait({
      img_show: '',
      img_file: '',
    });
  };
  //?????? ????????? get ??????
  const queryClient = useQueryClient();
  // ???????????? ?????? API
  const profilePhotoEditData = useMutation((forms: FormData) => userApi.profilePhotoEditApi(forms), {
    onSuccess: () => {
      setModalEditPhoto(false);
      queryClient.invalidateQueries('userData'); //userData ?????? query ??????
    },
  });

  const profilePhotoEdit = () => {
    const formData = new FormData();
    if (userPhotoWait) {
      formData.append('file', userPhotoWait.img_file);
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
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <RowBox width="89.3%" height={1.625} margin={'2.5rem 1.25rem 0rem 1.25rem'}>
              <Box width={'6.0625rem'} margin={'auto auto auto 0rem'}>
                <KoreanFont size={1.25} color="#1A1A1A">
                  ????????? ??????
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
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setModalEditPhoto(false);
                }}
              ></Box>
            </RowBox>

            <Box
              width={'20rem'}
              height="20"
              margin="2rem auto 2rem auto"
              style={{
                borderRadius: '50%',
                border: '1px solid #989898',
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${userPhotoWait.img_show})`,
              }}
            >
              {!userPhotoWait.img_show && <Box style={{ margin: 'auto' }}>?????????? ???????????? ??????! </Box>}
            </Box>

            <RowBox width="92%" height={2} margin={'1rem 1.25rem auto 1.25rem'}>
              <ImgLable
                htmlFor="img"
                style={{
                  alignItems: 'center',

                  display: 'flex',
                }}
              >
                <KoreanFont size={1}>?????? ?????????</KoreanFont>
              </ImgLable>
              <input id="img" type="file" accept="image/*" onChange={saveFileImage} style={{ display: 'none' }} />
              {fileImage ? (
                <BtnAble
                  width={'25%'}
                  height={3}
                  margin={'0 0 0 1.5rem'}
                  onClick={() => {
                    console.log('???');
                    setUserPhotoWait({
                      img_show: '/assets/defaultprofile.svg',
                      img_file: '/assets/defaultprofile.svg',
                    });
                  }}
                >
                  <KoreanFont size={1}>???????????????</KoreanFont>
                </BtnAble>
              ) : (
                ''
              )}
              <BtnAble
                isDisable={!userPhotoWait}
                width={'25%'}
                height={3}
                margin={'0 0 0 1.5rem'}
                onClick={
                  userPhotoWait
                    ? () => {
                        profilePhotoEdit();
                      }
                    : () => {
                        null;
                      }
                }
              >
                <KoreanFont size={1}>???????????? ??????</KoreanFont>
              </BtnAble>
            </RowBox>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default EditPhotoModal;
