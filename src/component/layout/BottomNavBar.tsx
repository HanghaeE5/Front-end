import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper } from '../element';
import { ReactNode } from 'react';
import { ReactComponent as ChatOn } from '../../asset/icons/nav/chat_on.svg';
import { ReactComponent as ChatOff } from '../../asset/icons/nav/chat_off.svg';
import { ReactComponent as CommunityOn } from '../../asset/icons/nav/community_on.svg';
import { ReactComponent as CommunityOff } from '../../asset/icons/nav/community_off.svg';
import { ReactComponent as FriendOff } from '../../asset/icons/nav/friend_off.svg';
import { ReactComponent as FriendOn } from '../../asset/icons/nav/friend_on.svg';
import { ReactComponent as HomeOn } from '../../asset/icons/nav/home_on.svg';
import { ReactComponent as HomeOff } from '../../asset/icons/nav/home_off.svg';
import { ReactComponent as TodoOn } from '../../asset/icons/nav/td_on.svg';
import { ReactComponent as TodoOff } from '../../asset/icons/nav/td_off.svg';

import { PATH } from '../../route/routeList';
import { useRecoilState } from 'recoil';
import { modalGatherState } from '../../recoil/store';

const NavWrapper = styled(Wrapper)`
  padding-top: 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.grayMedium};
  z-index: 10;
  height: 3.375rem;
  & div {
    cursor: pointer;

    &:hover {
      svg {
        transform: scale(1.2);
        transition: 0.2s ease;
      }
    }
  }
`;

interface MenuItemProps {
  isCurrentMenu: boolean;
  icon: ReactNode;
  selectIcon: ReactNode;
  onClick: () => void;
}

const MenuItem = ({ isCurrentMenu, onClick, icon, selectIcon }: MenuItemProps) => {
  return (
    <Wrapper justifyContent="center" onClick={() => onClick()}>
      {isCurrentMenu ? selectIcon : icon}
    </Wrapper>
  );
};
export const BottomNavLayout = () => {
  const nav = useNavigate();
  const [modalGather, setmodalGather] = useRecoilState(modalGatherState);
  const isCurrentMenu = (menuPath: string) => window.location.pathname.includes(menuPath);
  const movePage = (path: string) => {
    nav(path);
  };

  return (
    <NavWrapper
      onClick={() => {
        setmodalGather({
          levelUpModal: false,
          stepUpModal: false,
          editNicknameModal: false,
          notiModal: false,
          editPhotoModal: false,
          profileMenuModal: false,
          friendAddModal: false,
        });
      }}
      justifyContent="center"
    >
      <MenuItem
        icon={<HomeOff />}
        selectIcon={<HomeOn />}
        isCurrentMenu={window.location.pathname === PATH.MAIN}
        onClick={() => movePage(PATH.MAIN)}
      />
      <MenuItem
        icon={<CommunityOff />}
        selectIcon={<CommunityOn />}
        isCurrentMenu={isCurrentMenu(PATH.COMMUNITY)}
        onClick={() => movePage(PATH.COMMUNITY)}
      />
      <MenuItem
        icon={<TodoOff />}
        selectIcon={<TodoOn />}
        isCurrentMenu={isCurrentMenu(PATH.TODO)}
        onClick={() => movePage(PATH.TODO)}
      />
      <MenuItem
        icon={<FriendOff />}
        selectIcon={<FriendOn />}
        isCurrentMenu={isCurrentMenu(PATH.FRIEND)}
        onClick={() => movePage(PATH.FRIEND)}
      />
      <MenuItem
        icon={<ChatOff />}
        selectIcon={<ChatOn />}
        isCurrentMenu={isCurrentMenu(PATH.CHAT)}
        onClick={() => movePage(PATH.CHAT)}
      />
    </NavWrapper>
  );
};
