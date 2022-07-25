import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { BiTrash } from 'react-icons/bi';
import { ITodoItem, TodoDoneResponse, TodoEvent } from '../Types/todo';
import { Typography, Wrapper } from './element';
import { TodoItemWrapper, TodoLabel } from './styledComponent/TodoPageComponents';
import { useMutation, useQueryClient } from 'react-query';
import { todoQueryKey, updateDoneTodo } from '../api/todoApi';
import styled from 'styled-components';

const Dot = styled(VscDebugStackframeDot)`
  left: -0.35rem;
`;

export const TodoItem = ({
  todoData,
  onClickEditButton,
  onClickDeleteButton,
  handleDoneTodo,
}: {
  todoData: ITodoItem;
  onClickEditButton: TodoEvent;
  onClickDeleteButton: TodoEvent;
  handleDoneTodo: (data: TodoDoneResponse | undefined) => void;
}) => {
  const queryClient = useQueryClient();

  const refectchTodoList = () => {
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

  const { mutate: doneTodo } = useMutation(updateDoneTodo, {
    onSuccess: (data) => {
      refectchTodoList();
      handleDoneTodo(data);
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
      refectchTodoList();
      handleDoneTodo(undefined);
    },
  });

  const onClickDone = () => {
    doneTodo(todoData.todoId);
  };

  return (
    <>
      <TodoItemWrapper done={todoData.state}>
        <TodoLabel done={todoData.state}>{todoData.boardId ? 'With To Do' : 'My To Do'}</TodoLabel>
        {todoData.state ? <AiFillCheckCircle /> : <AiOutlineCheckCircle onClick={onClickDone} />}
        <Wrapper isColumn alignItems="start" justifyContent="space-between" height="2.5rem">
          <Typography>{todoData.todoContent}</Typography>
          <Wrapper>
            <Typography size={0.75}>{todoData.todoDate}</Typography>
            <Dot />
            <Typography size={0.75} underline isPointer onClick={() => onClickEditButton(todoData)}>
              수정
            </Typography>
          </Wrapper>
        </Wrapper>
        <BiTrash onClick={() => onClickDeleteButton(todoData)} />
      </TodoItemWrapper>
    </>
  );
};
