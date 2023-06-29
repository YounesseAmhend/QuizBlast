import { ChangeEvent } from "react";


interface Props{
    text: string;
    setText(text: string): void;
}
const ExplicationInput = ({text, setText}: Props) => {


    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length < 501) {
            setText(event.target.value);
        }
    };

    return (
    <div className="mb-3 relative rounded-lg border border-gray-300 bg-white p-4 max[600px]:p-3">
        <textarea
            className="w-full h-auto max-h-32 resize-y outline-none"
            value={text}
            onChange={handleChange}
            placeholder="Enter your Explication here ..."
        ></textarea>
        <div className="absolute bottom-2 right-2 text-gray-500 text-sm max[600px]:text-xs">
        {text.length} / 500
        </div>
    </div>
    );
};

export default ExplicationInput;
    
