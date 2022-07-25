import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { friendApi } from '../api/callApi';
import { Badge } from '../component/element';
import { EvColumnBox, EvFontBox, EvImgBox, EvKoreanFont } from '../component/element/BoxStyle';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import FriendAddModal from '../component/modallayout/FriendAddModal';
import { friendListState, modalGatherState } from '../recoil/store';
import { friendList } from '../Types/user';
import { ReactComponent as Empty } from '../asset/icons/icon_empty.svg';
import { useCommonConfirm } from '../hooks/useCommonConfirm';

const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
  section:nth-of-type(1) {
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    overflow-y: scroll;
    height: 100%;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;

type box = {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isSide?: boolean;
  isCursor?: boolean;
  color?: string;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props: box) => (props.isSide ? '' : 'center')};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  /* background-color: #ffb9b9; */
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  cursor: ${(props: box) => (props.isCursor ? 'pointer' : '')};
  /* background-color: #dcffa0; */
`;

const RowFriendBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  margin: 0;
  /* background-color: #a6e1ff; */
`;

const FriendPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  /* background-color: yellowgreen; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const FriendNameTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto 0.625rem;
  /* background-color: #6922bb; */
`;

type font = {
  size?: number;
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

const IconBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  background-color: ${(props: box) => props.color};
  width: ${(props: box) => props.width};
  height: ${(props: box) => props.height}rem;
  margin: ${(props: box) => props.margin};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  border: none;
`;

export const FriendList = () => {
  const [friendList, setFriendList] = useRecoilState(friendListState);
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const [requestFriendList, setRequestFriendList] = useState<friendList>([]);
  const [allowFriendName, setAllowFriendName] = useState<string>('');
  const [rejectRequestFriendName, setrejectRequestFriendName] = useState<string>('');
  const [deleteFriendName, setDeleteFriendName] = useState<string>('');
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { openSuccessConfirm, openErrorConfirm } = useCommonConfirm();

  //친구요청 목록 API
  const getRequestFriendQuery = useQuery('requestFriendLists', friendApi.requestFriendListApi, {
    //여기서 리코일에 저장
    onSuccess: (data) => {
      setRequestFriendList(data.data);
    },
  });
  // console.log(getRequestFriendQuery);

  //친구 목록 API
  const getFriendQuery = useQuery('friendLists', friendApi.friendListApi, {
    //여기서 리코일에 저장
    onSuccess: (data) => {
      setFriendList(data.data);
      console.log(data);
    },
  });

  //친구요청 허락 API
  const allowFriendData = useMutation((nick: { nick: string }) => friendApi.allowFriendApi(nick), {
    onSuccess: (token) => {
      queryClient.invalidateQueries('friendLists');
      queryClient.invalidateQueries('requestFriendLists');
      console.log(token);
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => allowFriend({ nick: allowFriendName }), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const allowFriend = (data: { nick: string }) => {
    allowFriendData.mutate(data);
  };

  //친구삭제 API
  const deleteUserData = useMutation((nick: { nick: string }) => friendApi.deleteFriendApi(nick), {
    onSuccess: () => {
      queryClient.invalidateQueries('friendLists');
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => deleteFriend({ nick: deleteFriendName }), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const deleteFriend = (data: { nick: string }) => {
    deleteUserData.mutate(data);
  };

  //친구 요청 거절 API
  const rejectFriendData = useMutation((nick: { nick: string }) => friendApi.rejectFriendApi(nick), {
    onSuccess: () => {
      queryClient.invalidateQueries('requestFriendLists');
    },
    onError: (error: AxiosError<{ msg: string }>) => {
      if (error.message === 'Request failed with status code 401') {
        setTimeout(() => rejectFriend({ nick: rejectRequestFriendName }), 200);
      } else {
        openErrorConfirm({
          title: error.response?.data.msg,
        });
      }
    },
  });

  const rejectFriend = (data: { nick: string }) => {
    rejectFriendData.mutate(data);
  };
  console.log(friendList);

  return (
    <NavLayout>
      <PageLayout title="친구 목록">
        <ContentWrapper>
          {/* 요청 온 친구 */}
          <Box width="4.75rem" margin="1.875rem auto 0rem 5.3% ">
            <KoreanFont size={0.9375} color="#1A1A1A">
              요청 온 친구
            </KoreanFont>
          </Box>
          <Box width="89%" margin="0.9375rem auto 0 auto" style={{ gap: '1.25rem' }}>
            {requestFriendList.map((requestfriend) => {
              return (
                <RowFriendBox key={requestfriend.id}>
                  <RowBox
                    isCursor={true}
                    onClick={() => {
                      nav(`/friend/page/${requestfriend.nick}`);
                    }}
                  >
                    <FriendPhotoBox
                      style={{
                        backgroundImage: `url(${requestfriend.profileImageUrl})`,
                      }}
                    ></FriendPhotoBox>
                    <FriendNameTextBox>
                      <KoreanFont size={1}>{requestfriend.nick}</KoreanFont>
                    </FriendNameTextBox>
                    <Badge>Lv.8</Badge>
                  </RowBox>
                  <RowBox width="20%" height="2.5" margin="0 0 0 auto">
                    <Box
                      isCursor={true}
                      width={'1.5rem'}
                      height={2.5}
                      onClick={() => {
                        setAllowFriendName(requestfriend.nick);
                        allowFriend({ nick: requestfriend.nick });
                      }}
                    >
                      <KoreanFont size={0.81}>수락</KoreanFont>
                    </Box>
                    <Box
                      width={'1'}
                      height={0.75}
                      margin="auto 0.625rem"
                      style={{
                        border: '1px solid #DDDDDD',
                      }}
                    ></Box>
                    <Box
                      isCursor={true}
                      width={'1.5rem'}
                      height={2.5}
                      onClick={() => {
                        setrejectRequestFriendName(requestfriend.nick);
                        rejectFriend({ nick: requestfriend.nick });
                      }}
                    >
                      <KoreanFont size={0.81}>거절</KoreanFont>
                    </Box>
                  </RowBox>
                </RowFriendBox>
              );
            })}
          </Box>

          {/* // 내 친구 */}
          <Box width="2.8125rem" margin="2.5rem auto 0rem 5.3% ">
            <KoreanFont size={0.9375} color="#1A1A1A">
              내 친구
            </KoreanFont>
          </Box>
          <Box width="89%" margin="0.9375rem auto 0 auto" style={{ gap: '1.25rem' }}>
            {friendList.length === 0 ? (
              <EvColumnBox width={'16rem'} height={10} margin="3rem auto auto auto">
                <EvImgBox margin="0 auto">
                  <Empty />
                </EvImgBox>
                <EvFontBox margin="1.25rem auto auto auto">
                  <EvKoreanFont align="center" isWhiteSpace={true} size={0.875} lineHeight={'20px'} color="#5F5F5F">
                    {`아직 추가하신 친구가 없어요.\n오른쪽 하단 + 버튼을 눌러\n친구를 추가할 수 있습니다!`}
                  </EvKoreanFont>
                </EvFontBox>
              </EvColumnBox>
            ) : (
              friendList.map((myfriend) => {
                return (
                  <RowFriendBox key={myfriend.id}>
                    <RowBox
                      isCursor={true}
                      onClick={() => {
                        nav(`/friend/page/${myfriend.nick}`);
                      }}
                    >
                      <FriendPhotoBox
                        style={{
                          backgroundImage: `url(${myfriend.profileImageUrl})`,
                        }}
                      ></FriendPhotoBox>
                      <FriendNameTextBox>
                        <KoreanFont size={1}>{myfriend.nick}</KoreanFont>
                      </FriendNameTextBox>
                      <Badge>{`Lv.${myfriend.characterLevel}`}</Badge>
                    </RowBox>
                    <Box
                      isCursor={true}
                      width={'1.5rem'}
                      height={2.5}
                      margin="auto 0 auto auto"
                      onClick={() => {
                        setDeleteFriendName(myfriend.nick);
                        deleteFriend({ nick: myfriend.nick });
                      }}
                    >
                      <KoreanFont size={0.81}>삭제</KoreanFont>
                    </Box>
                  </RowFriendBox>
                );
              })
            )}
          </Box>

          {/* 친구추가버튼 */}
          <IconBox
            width={'2.81rem'}
            height={2.81}
            style={{
              bottom: '3rem',
              right: '5%',
              position: 'absolute',
              backgroundImage: 'url(/assets/Plusbtn.svg)',
              zIndex: 50,
            }}
            onClick={() => {
              setmodalGather({ ...modalGather, friendAddModal: true });
            }}
          ></IconBox>
          <FriendAddModal />
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
