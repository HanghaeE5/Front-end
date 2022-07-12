import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { GrTrash } from 'react-icons/gr';
import { ITodoItem, TodoEvent } from '../Types/todo';
import { Typography, Wrapper } from './element';
import { TodoItemWrapper } from './styledComponent/TodoPageComponents';
import { useMutation, useQueryClient } from 'react-query';
import { todoQueryKey, updateDoneTodo } from '../api/todoApi';

export const TodoItem = ({
  todoData,
  onClickEditButton,
  onClickDeleteButton,
}: {
  todoData: ITodoItem;
  onClickEditButton: TodoEvent;
  onClickDeleteButton: TodoEvent;
}) => {
  const queryClient = useQueryClient();

  const refectchTodoList = () => {
    queryClient.invalidateQueries(todoQueryKey.fetchTodo);
  };

  const { mutate: doneTodo } = useMutation(updateDoneTodo, {
    onSuccess: () => refectchTodoList(),
  });

  const onClickDone = () => {
    doneTodo(todoData.todoId);
  };

  return (
    <TodoItemWrapper done={todoData.state}>
      <>{todoData.state ? <AiFillCheckCircle /> : <AiOutlineCheckCircle onClick={onClickDone} />}</>
      <Wrapper isColumn alignItems="start" justifyContent="space-between" height="2.5rem">
        <Typography weight={700}>{todoData.todoContent}</Typography>
        <Wrapper>
          <Typography size={0.75}>{todoData.todoDate}</Typography>
          <VscDebugStackframeDot />
          <Typography size={0.75} underline isPointer onClick={() => onClickEditButton(todoData)}>
            수정
          </Typography>
        </Wrapper>
      </Wrapper>
      <GrTrash onClick={() => onClickDeleteButton(todoData)} />
    </TodoItemWrapper>
  );
};
