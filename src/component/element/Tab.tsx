import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.125rem;
  margin: 0.75rem 0;
  overflow: hidden;
  border-radius: 6px 6px 0 0;
`;

const TabItem = styled.div<{ isSelect: boolean }>`
  height: 3.125rem;
  min-height: 3.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-width: ${({ isSelect }) => (isSelect ? '1px 1px 0px 1px' : '0px 0px 1px 0px')};
  background-color: ${({ isSelect, theme }) => (isSelect ? 'white' : theme.color.grayLight)};
  border-radius: ${({ isSelect }) => (isSelect ? `6px 6px 0 0` : 0)};
  width: 100%;
  cursor: pointer;
`;

interface TabProps<T> {
  selectedValue: T;
  onClickItem: (value: T) => void;
  tabList: { label: string; value: T }[];
}

export const Tab = <T,>({ selectedValue, onClickItem, tabList }: PropsWithChildren<TabProps<T>>) => {
  return (
    <TabWrapper>
      <>
        {tabList.map((tab) => (
          <TabItem
            key={tab.value as unknown as string}
            onClick={() => onClickItem(tab.value)}
            isSelect={selectedValue === tab.value}
          >
            <Typography size={0.875} color="#5F5F5F">
              {tab.label}
            </Typography>
          </TabItem>
        ))}
      </>
    </TabWrapper>
  );
};
