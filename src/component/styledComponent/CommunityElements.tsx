import styled from 'styled-components';

export const ContentWrapper = styled.div`
  height: calc(100% - 3.75rem);
  section:nth-of-type(1) {
    max-height: 10rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }

  section:nth-of-type(2) {
    height: calc(100% - 6.5rem);

    overflow-y: scroll;
    background-color: ${({ theme }) => theme.color.grayLight};
  }
`;
