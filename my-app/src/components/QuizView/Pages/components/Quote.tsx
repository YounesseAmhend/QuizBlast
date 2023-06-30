import { FaRegLightbulb } from 'react-icons/fa';

interface Props {
  visible: boolean;
  text: string | undefined;
}

export default function Quote(props: Props) {
  return (
    <>
      {props.visible && (
        <div className="border-t border-blue-300 p-3 py-4 mt-4">
          <div className="flex items-center">
            <div className="mr-2">
              <FaRegLightbulb className="text-yellow-300 animate-bounce text-xl" style={{ filter: 'drop-shadow(0 0 8px #FFED9D)' }} />
            </div>
            <div>{props.text}</div>
          </div>
        </div>
      )}
    </>
  );
}
