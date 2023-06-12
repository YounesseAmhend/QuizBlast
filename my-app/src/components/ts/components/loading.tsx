import 'react-spinner-animated/dist/index.css';
const LoadLib = require("react-spinner-animated");
interface Props{
    loaded: boolean;
}


export default function Loading(props: Props){
    return (
        <>
            {!props.loaded &&
            <div className="flex justify-center align-middle"><LoadLib.HalfMalf center={false} height={"120px"} /></div>
            }
        </>
    )
}