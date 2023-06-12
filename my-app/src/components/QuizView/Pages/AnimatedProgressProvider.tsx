import React from "react";
import { Animate } from "react-move";
type GetInterpolator = (begValue?: any, endValue?: any, attr?: string, namespace?: string) => (t: number) => any
export interface HashMap {
  [key: string]: any
}
interface IAnimateProps {
  show?: boolean;
  interpolation?: GetInterpolator;
  start: any;
  enter?: any;
  update?: any;
  leave?: any;
  children: (state: HashMap) => React.ReactElement<any>;
}

interface Props extends Omit<IAnimateProps, "children" | "start" | "update"> {
  repeat?: boolean;
  valueStart?: number;
  valueEnd: number;
  easingFunction: (n: number) => number;
  children: (value: number) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  duration: number;
}

interface State {
  isAnimated: boolean;
}

class AnimatedProgressProvider extends React.Component<Props, State> {
  interval: number | undefined = undefined;

  state: State = {
    isAnimated: false
  };

  static defaultProps: Partial<Props> = {
    valueStart: 0
  };

  componentDidMount() {
    if (this.props.repeat) {
      this.interval = window.setInterval(() => {
        this.setState({
          isAnimated: !this.state.isAnimated
        });
      }, this.props.duration * 1000);
    } else {
      this.setState({
        isAnimated: !this.state.isAnimated
      });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { repeat, valueStart, valueEnd, easingFunction, children, duration, ...rest } = this.props;
    return (
      <Animate
        start={{ value: valueStart! }}
        update={() => ({
          value: [
            this.state.isAnimated ? valueEnd : valueStart!
          ],
          timing: {
            duration: duration / 1000,
            ease: easingFunction
          }
        })}
        {...rest}
      >
        {({ value }) => children(value)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;