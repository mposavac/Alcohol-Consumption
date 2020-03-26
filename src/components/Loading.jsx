import React from 'react';
import { animated, Transition } from 'react-spring/renderprops';

export default function Loading({ isLoading }) {
  return (
    <Transition
      native
      items={isLoading}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {show =>
        show &&
        (properties => (
          <animated.div style={properties} className="loading">
            <div className="holder">
              <div id="glass">
                <div id="beer" />
              </div>
              <div id="poignet" />
              <div id="mousse_1" />
              <div id="mousse_2" />
              <div id="mousse_3" />
              <div id="mousse_4" />
              <div id="mousse_5" />
              <div id="mousse_volante" />
              <div id="mousse_interieur" />
              <div id="mousse_interieur_2" />
              <div id="mousse_interieur_3" />
              <div id="mousse_interieur_4" />
            </div>
          </animated.div>
        ))
      }
    </Transition>
  );
}
