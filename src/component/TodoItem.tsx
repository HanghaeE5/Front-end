import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { GrTrash } from 'react-icons/gr';
import { ITodoItem } from '../Types/todo';
import { Typography, Wrapper } from './element';
import { TodoItemWrapper } from './styledComponent/TodoPageComponents';

export const TodoItem = ({ category, state, todoContent, todoDate, todoId }: ITodoItem) => {
  const onClickDone = () => {
    console.log(todoId);
  };

  const removeItem = () => {
    console.log(todoId);
  };

  return (
    <TodoItemWrapper done={state}>
      <>{state ? <AiFillCheckCircle /> : <AiOutlineCheckCircle onClick={onClickDone} />}</>
      <Wrapper isColumn alignItems="start" justifyContent="space-between" height="2.5rem">
        <Typography weight={700}>{todoContent}</Typography>
        <Wrapper>
          <Typography size={0.75}>{todoDate}</Typography>
          <VscDebugStackframeDot />
          <Typography size={0.75} underline isPointer>
            수정
          </Typography>
        </Wrapper>
      </Wrapper>
      <GrTrash onClick={removeItem} />
    </TodoItemWrapper>
  );
};
