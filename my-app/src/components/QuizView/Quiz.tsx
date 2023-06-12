
interface Props {
    id: number;
    name: string;
    username: string;
    setId(id: number): void;
    goView():void,
}
export default function Quiz(props: Props) {
    const { id, name, username } = props
    function Click(id: number){
        props.goView()
        props.setId(id)
    }
    return (
        <div className="quiz-element cursor-pointer p-3" key={id} onClick={()=>Click(id)}>
            <div className="title">{name}</div>
            <div className="madeBy">By {username}</div>
        </div>
    );
}