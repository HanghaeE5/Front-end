import { VscDebugStackframeDot } from 'react-icons/vsc';
import { ITodoItem, TodoEvent } from '../Types/todo';
import { Typography, Wrapper } from './element';
import { TodoItemWrapper, TodoLabel, TodoTitle } from './styledComponent/TodoPageComponents';
import styled from 'styled-components';
import { ReactComponent as Trash } from '../asset/icons/can.svg';
import { ReactComponent as DoingIcon } from '../asset/icons/check_doing.svg';
import { ReactComponent as Done } from '../asset/icons/check_done.svg';

const StyledTrash = styled(Trash)`
  width: 1.5rem;
  height: 1.5rem;
`;

const Dot = styled(VscDebugStackframeDot)`
  left: -0.35rem;
`;

export const TodoItem = ({
  todoData,
  onClickEditButton,
  onClickDeleteButton,
  onClickDoneButton,
}: {
  todoData: ITodoItem;
  onClickEditButton: TodoEvent;
  onClickDeleteButton: TodoEvent;
  onClickDoneButton: TodoEvent;
}) => {
  return (
    <>
      <TodoItemWrapper done={todoData.state}>
        <TodoLabel done={todoData.state}>{todoData.boardId ? 'With To Do' : 'My To Do'}</TodoLabel>
        <Wrapper justifyContent="space-between">
          {todoData.state ? <Done /> : <DoingIcon onClick={() => onClickDoneButton(todoData)} />}

          <Wrapper isColumn alignItems="start" justifyContent="space-between" margin="0 0.625rem">
            <TodoTitle>{todoData.todoContent}</TodoTitle>
            <Wrapper>
              <Typography size={0.75}>{todoData.todoDate.replaceAll('-', '.')}</Typography>
              {!todoData.state && (
                <>
                  <Dot />
                  <Typography size={0.75} underline isPointer onClick={() => onClickEditButton(todoData)}>
                    수정
                  </Typography>
                </>
              )}
            </Wrapper>
          </Wrapper>
          <StyledTrash onClick={() => onClickDeleteButton(todoData)} />
        </Wrapper>
      </TodoItemWrapper>
    </>
  );
};
