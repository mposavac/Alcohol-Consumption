import React, { useEffect, useState } from 'react';
import { animated, Transition } from 'react-spring/renderprops';

function Results({ show, results, close }) {
  const [width, setWidth] = useState(['0', '0', '0', '0', '0']);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setWidth([results[0], results[1], results[2], results[3], results[4]]);
      }, 500);
    }
    // eslint-disable-next-line
  }, [show]);

  const getWeekendConsumption = () => {
    switch (results[5]) {
      case '1':
        return 'Very low.';
      case '2':
        return 'Low.';
      case '3':
        return 'Medium.';
      case '4':
        return 'High.';
      case '5':
        return 'Very high.';
      default:
        return 'Unknown.';
    }
  };

  const resultClass = () => {
    if (results[5] === '1' || results[5] === '2') return 'green';
    if (results[5] === '3') return 'yellow';
    return 'red';
  };
  return (
    <Transition
      native
      items={show}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {show =>
        show &&
        (properties => (
          <animated.div style={properties} className="results-backgorund">
            <div className="results-container">
              <i className="far fa-times-circle" onClick={close} />
              <div className="results">
                <div className="description">
                  <div className="name">Very low</div>
                  <div className="name">Low</div>
                  <div className="name">Medium</div>
                  <div className="name">High</div>
                  <div className="name">Very high</div>
                </div>
                <div className="graphs">
                  <div
                    className={`bar ${results[5] === '1' && 'green'}`}
                    style={{ width: `${width[0] * 100 || 0.2}%` }}
                  />
                  <div
                    className={`bar ${results[5] === '2' && 'green'}`}
                    style={{ width: `${width[1] * 100 || 0.2}%` }}
                  />
                  <div
                    className={`bar ${results[5] === '3' && 'yellow'}`}
                    style={{ width: `${width[2] * 100 || 0.2}%` }}
                  />
                  <div
                    className={`bar ${results[5] === '4' && 'red'}`}
                    style={{ width: `${width[3] * 100 || 0.2}%` }}
                  />
                  <div
                    className={`bar ${results[5] === '5' && 'red'}`}
                    style={{ width: `${width[4] * 100 || 0.2}%` }}
                  />
                </div>
                <div className="percentages">
                  <div className="percent">{results[0] * 100}%</div>
                  <div className="percent">{results[1] * 100}%</div>
                  <div className="percent">{results[2] * 100}%</div>
                  <div className="percent">{results[3] * 100}%</div>
                  <div className="percent">{results[4] * 100}%</div>
                </div>
              </div>
              <div className="final-result">
                <p>
                  Weekend alcohol consumption probabilty is{' '}
                  <span className={resultClass()}>{getWeekendConsumption()}</span>
                </p>
              </div>
            </div>
          </animated.div>
        ))
      }
    </Transition>
  );
}

export default Results;
