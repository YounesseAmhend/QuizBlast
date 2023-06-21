
interface Props{
    title: string | undefined,
}
export default  function Title(props: Props){
    return(
        <div className="flex justify-center">
            <div className=" text-4xl p-4 font-medium max-[600px]:text-2xl">
                {props.title}
            </div>
        </div>
    )
}