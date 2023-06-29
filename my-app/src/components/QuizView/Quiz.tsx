import { useRef } from "react";

interface Props {
    id: number;
    userId: number;
    name: string;
    username: string;
    displayUser(id: number): void;
    setId(id: number): void;
    goView():void,
}
export default function Quiz(props: Props) {
    const { id, name, username, userId, displayUser } = props
    const madeByRef = useRef<HTMLDivElement>(null)
    function Click(id: number){
        
        props.goView()
        props.setId(id)
    }
    return (
        <div className="quiz-element cursor-pointer p-3" key={id} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target !== madeByRef.current) {
              Click(id);
            }
          }}>
            <div className="title">{name}</div>
            <div ref={madeByRef} onClick={()=>displayUser(userId)} className="madeBy">By {username}</div>
        </div>
    );
}