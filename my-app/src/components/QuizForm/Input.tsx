import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props{
    visible: boolean,
    input: string
    addOptionKey(event: React.KeyboardEvent<HTMLInputElement>): void,
    changeInput(event: React.ChangeEvent<HTMLInputElement>): void
}
export default function Input(props: Props){
    return (
        <>
            {props.visible && 
            <div onKeyDown={props.addOptionKey}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control name="options" autoFocus value={props.input} onChange={props.changeInput} type="text" placeholder="Add option"/>
                </Form.Group>
            </div>}
        </>
    )
}