import { useEffect, useRef, useState } from 'react';
import { BiEdit, BiShareAlt, BiX } from 'react-icons/bi';
import { RiMore2Fill } from 'react-icons/ri';

import styled from 'styled-components';
import { Wrapper } from './Wrapper';

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTrigger = styled.div`
  cursor: pointer;
`;

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
  onShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isMine: boolean;
}

export const DropdownMenu = ({ onShare, onEdit, onDelete, isMine }: DropDownMenuProps) => {
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
        <RiMore2Fill />
      </MenuTrigger>
      <Menu isActive={isActive} ref={dropdownRef}>
        <ul>
          <MenuItem>
            <Wrapper justifyContent="space-between" onClick={onShare}>
              <span>공유</span>
              <BiShareAlt />
            </Wrapper>
          </MenuItem>
          {isMine && (
            <>
              <MenuItem>
                <Wrapper justifyContent="space-between" onClick={onEdit}>
                  <span>수정</span>
                  <BiEdit />
                </Wrapper>
              </MenuItem>
              <MenuItem>
                <Wrapper justifyContent="space-between" onClick={onDelete}>
                  <span>삭제</span>
                  <BiX />
                </Wrapper>
              </MenuItem>
            </>
          )}
        </ul>
      </Menu>
    </MenuContainer>
  );
};
