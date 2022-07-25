import styled, { keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalGatherState, userInfoState } from '../../recoil/store';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/callApi';
import {
  EvAbleFont,
  EvBtn,
  EvBtnAble,
  EvColumnBox,
  EvFontBox,
  EvImgBox,
  EvKoreanFont,
  EvRowBox,
} from '../element/BoxStyle';

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
  z-index: 5;
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
  width: 100%;
  height: 30.68rem;
  border-radius: 20px 20px 0px 0px;
  margin: auto auto 0 auto;
  background-color: #ffffff;
  animation: ${Slide} 0.6s ease;
`;

const ImgLable = styled.label`
  justify-content: center;
  width: 89.3%;
  height: 3.75rem;
  border: 1px dashed #1a1a1a;
  border-radius: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

type font = {
  size: number;
  color?: string;
  isCorrect?: boolean;
  isBold?: boolean;
};

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

const EditPhotoModal = () => {
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);
  type Img = {
    img_show: string;
    img_file: File | string | Blob | undefined;
  };

  //파일 임시 미리봄
  const [userPhotoWait, setUserPhotoWait] = useState<Img>({
    img_show: '',
    img_file: '',
  });

  // 파일 가져오기
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

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(userPhotoWait.img_show);
    setUserPhotoWait({
      img_show: '',
      img_file: '',
    });
  };
  //사진 바꾸고 get 실행
  const queryClient = useQueryClient();
  // 사진파일 저장 API
  const profilePhotoEditData = useMutation((forms: FormData) => userApi.profilePhotoEditApi(forms), {
    onSuccess: () => {
      setmodalGather({ ...modalGather, editPhotoModal: false });
      queryClient.invalidateQueries('userData'); //userData 키값 query 실행
    },
  });

  const profilePhotoEdit = () => {
    const formData = new FormData();
    if (userPhotoWait.img_file != undefined) {
      formData.append('file', userPhotoWait.img_file);
    }
    console.log(userPhotoWait.img_file);
    profilePhotoEditData.mutate(formData);
  };

  useEffect(() => {
    if (userInfoData) {
      setUserPhotoWait({ ...userPhotoWait, img_show: userInfoData.profileImageUrl });
    }
  }, [userInfoData]);

  return (
    <>
      {modalGather.editPhotoModal && (
        <ModalBackground
          onClick={() => {
            setmodalGather({ ...modalGather, editPhotoModal: false });
            setUserPhotoWait({ ...userPhotoWait, img_show: userInfoData.profileImageUrl });
          }}
        >
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EvRowBox width="89.3%" height={1.875} margin={'1.625rem 1.25rem 0rem 1.25rem'}>
              <EvFontBox width={'6.0625rem'} margin={'auto auto auto 0rem'}>
                <EvKoreanFont size={1.25} weight={700} color="#1A1A1A">
                  프로필 편집
                </EvKoreanFont>
              </EvFontBox>
              <EvImgBox
                width={'1rem'}
                height={1}
                margin={'auto 0rem auto auto'}
                isCursor={true}
                url={'url(/assets/X.svg)'}
                onClick={() => {
                  setmodalGather({ ...modalGather, editPhotoModal: false });
                  setUserPhotoWait({ ...userPhotoWait, img_show: userInfoData.profileImageUrl });
                }}
              ></EvImgBox>
            </EvRowBox>

            <EvImgBox
              width={'9.375rem'}
              height={9.375}
              margin="2rem auto 1.81rem auto"
              url={`url(${userPhotoWait.img_show})`}
              style={{
                borderRadius: '50%',
                border: '1px solid #989898',
              }}
            >
              {!userPhotoWait.img_show && <EvImgBox margin={'auto'}>📷사진 업로드를 클릭! </EvImgBox>}
            </EvImgBox>

            <ImgLable htmlFor="img" style={{}}>
              <EvImgBox
                width={'1.5rem'}
                height={1.5}
                margin={'0.1rem 0.25rem 0 0'}
                url={'url(/assets/icon_camera.svg)'}
              ></EvImgBox>
              <EvKoreanFont size={1.06} weight={500}>
                사진 업로드
              </EvKoreanFont>
            </ImgLable>
            <input id="img" type="file" accept="image/*" onChange={saveFileImage} style={{ display: 'none' }} />
            <EvBtn
              width={'89.3%'}
              height={3.75}
              margin={'1rem auto 2.5rem auto'}
              background="#ffffff"
              border="1px solid #1A1A1A"
              onClick={() => {
                setUserPhotoWait({
                  img_show: '/assets/defaultprofile.svg',
                  img_file: '',
                });
              }}
            >
              <EvKoreanFont size={1.06} weight={500}>
                기본이미지로 변경
              </EvKoreanFont>
            </EvBtn>

            <EvBtnAble
              isDisable={userPhotoWait.img_show === userInfoData.profileImageUrl}
              width={'100%'}
              height={3.75}
              margin={'auto 0 0 0'}
              onClick={
                userPhotoWait.img_show != userInfoData.profileImageUrl
                  ? () => {
                      profilePhotoEdit();
                    }
                  : () => {
                      null;
                    }
              }
            >
              <EvAbleFont isDisable={userPhotoWait.img_show === userInfoData.profileImageUrl} size={1}>
                완료하기
              </EvAbleFont>
            </EvBtnAble>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
export default EditPhotoModal;
