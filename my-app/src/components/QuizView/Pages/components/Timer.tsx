import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface Props {
  time: number;
  paused: boolean;
}

export default function Timer(props: Props) {
  const { time, paused } = props;
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    setTimer(time);
  }, [time]);

  function timeIsOut() {
    // Handle timer completion
  }

  return (
    <div className="p-2">
      <CountdownCircleTimer
        isPlaying={!paused}
        key={timer} // Add key prop to reset the component when timer changes
        initialRemainingTime={timer}
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
    </div>
  );
}
