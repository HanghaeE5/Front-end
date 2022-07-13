import { useEffect, useRef, useState } from 'react';
import { BiDotsVerticalRounded, BiEdit, BiShareAlt, BiX } from 'react-icons/bi';

import styled from 'styled-components';
import { Wrapper } from './Wrapper';

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTrigger = styled.div``;

const Menu = styled.div<{ isActive: boolean }>`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 30px;
  right: 0;
  width: 120px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  ${({ isActive }) =>
    isActive &&
    ` opacity: 1;
  visibility: visible;
  transform: translateY(0)`};

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    border-bottom: 1px solid #dddddd;
    padding: 1rem;
    font-size: 1rem;

    & svg {
      font-size: 1.25rem;
    }

    cursor: pointer;
  }
`;

const MenuItem = styled.li``;

interface DropDownMenuProps {
  onLogout: () => void;
  onPwEdit: () => void;
}

export const ProfileDropdownMenu = ({ onLogout, onPwEdit }: DropDownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  // TODO : 코드추출, 외부 클릭시 사라지게
  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as Node)) {
        // setIsActive(!isActive);
      }
    };
    console.log(isActive);
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <MenuContainer>
      <MenuTrigger onClick={onClick}>
        <BiDotsVerticalRounded />
      </MenuTrigger>
      <Menu isActive={isActive} ref={dropdownRef}>
        <ul>
          <MenuItem>
            <Wrapper justifyContent="space-between" onClick={onLogout}>
              <span>로그아웃</span>
              <BiShareAlt />
            </Wrapper>
          </MenuItem>
          <MenuItem>
            <Wrapper justifyContent="space-between" onClick={onPwEdit}>
              <span>비밀번호 변경</span>
              <BiEdit />
            </Wrapper>
          </MenuItem>
        </ul>
      </Menu>
    </MenuContainer>
  );
};
