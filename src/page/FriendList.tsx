import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Img, Select, SelectOption, TextInput, Wrapper } from '../component/element';
import { NavLayout } from '../component/layout/NavLayout';
import { PageLayout } from '../component/layout/PageLayout';
import { PostCard } from '../component/PostCard';
import { CommunitySearchControl, Post } from '../Types/community';

const ContentWrapper = styled.div`
  height: 100%;
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
export const FriendList = () => {
  return (
    <NavLayout>
      <PageLayout title="친구 목록">
        <ContentWrapper>
          <section></section>
        </ContentWrapper>
      </PageLayout>
    </NavLayout>
  );
};
