import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { GrTrash } from 'react-icons/gr';
import { ITodoItem } from '../Types/todo';
import { Typography, Wrapper } from './element';
import { TodoItemWrapper } from './styledComponent/TodoPageComponents';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTodo, todoQueryKey, updateDoneTodo } from '../api/todoApi';

export const TodoItem = ({
  category,
  state,
  todoContent,
  todoDate,
  todoId,
  onClickEditButton,
}: ITodoItem & { onClickEditButton: () => void }) => {
  const queryClient = useQueryClient();

  const refectchTodoList = () => {
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

  const { mutate: doneTodo } = useMutation(updateDoneTodo, {
    onSuccess: () => refectchTodoList(),
  });

  const { mutate: deleteTodoItem } = useMutation(deleteTodo, {
    onSuccess: (data) => refectchTodoList(),
  });

  const onClickDone = () => {
    doneTodo(todoId);
  };

  const removeItem = () => {
    deleteTodoItem(todoId);
  };

  return (
    <TodoItemWrapper done={state}>
      <>{state ? <AiFillCheckCircle /> : <AiOutlineCheckCircle onClick={onClickDone} />}</>
      <Wrapper isColumn alignItems="start" justifyContent="space-between" height="2.5rem">
        <Typography weight={700}>{todoContent}</Typography>
        <Wrapper>
          <Typography size={0.75}>{todoDate}</Typography>
          <VscDebugStackframeDot />
          <Typography size={0.75} underline isPointer onClick={onClickEditButton}>
            수정
          </Typography>
        </Wrapper>
      </Wrapper>
      <GrTrash onClick={removeItem} />
    </TodoItemWrapper>
  );
};
