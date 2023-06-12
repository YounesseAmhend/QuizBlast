import React from "react";
import Form from 'react-bootstrap/Form';

interface Props{
  changeFocus(event: React.KeyboardEvent<HTMLInputElement>):void,
  changeInputQuestion(event: React.ChangeEvent<HTMLInputElement>): void,
  value: string,
  Ref: React.RefObject<HTMLInputElement>,
}
export function QuestionInput({
  changeFocus,
  changeInputQuestion,
  value,
  Ref,
}: Props){
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control ref={Ref} type="text" onChange={changeInputQuestion} value={value} autoFocus onKeyDown={changeFocus} placeholder="Enter Question" />
      </Form.Group>
    </>
  );
}