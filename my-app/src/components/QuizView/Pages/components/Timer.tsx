import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
  timeIsUp: boolean;
  time: number;
  paused: boolean;
  id: number;
  setVisibleQuote: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeIsOut: React.Dispatch<React.SetStateAction<boolean>>;
  setChosed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer(props: Props) {
  const { time, paused, setChosed, setTimeIsOut, setVisibleQuote, timeIsUp, id } = props;

  function timeIsOut() {
    // display next button
    setChosed(true)
    // show the correct answer
    setVisibleQuote(true)
    setTimeIsOut(true)
  }
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <CountdownCircleTimer
        isPlaying={!paused}
        key={id} // Add key prop to reset the component when timer changes
        initialRemainingTime={time}
        duration={time}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[time, time * 3 / 4, time / 4, 0]}
        size={60}
        strokeWidth={5}
        onComplete={timeIsOut}
      >
        {({ remainingTime }) => (
          <div role="timer" aria-live="assertive" className="text-xl">
            {remainingTime}
          </div>
        )}
      </CountdownCircleTimer>
      <div className='mt-1 text-xs text-gray-50 bg-red-700 rounded w-20 text-bold font-semibold text-center'>{timeIsUp && "Time's up"}</div>
    </div>
  );
}
