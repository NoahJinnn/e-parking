import './AnimatedKeyboard.scss'
import 'react-simple-keyboard/build/css/index.css'

import React, { HTMLAttributes } from 'react'
import Keyboard from 'react-simple-keyboard'
import { animated, Transition } from 'react-spring/renderprops'

export interface IAnimatedKeyboardProps extends HTMLAttributes<HTMLDivElement> {
  animationTrigger: any
  from: object
  enter: object
  leave: object
  animatedStyle?: object
  className?: string
  layout: any
  layoutName?: string
  keyboardRef: any
  onKeyPress: any
  maxLength?: number
  keyboardType?: string
}

export default function AnimatedKeyboard({
  id,
  animationTrigger,
  from,
  enter,
  leave,
  animatedStyle,
  className,
  layout,
  layoutName = 'default',
  keyboardRef,
  onKeyPress,
  maxLength,
  keyboardType = 'default',
}: IAnimatedKeyboardProps) {
  const attachRefToKeyboardEle = (r) => {
    keyboardRef.current = r
  }

  return (
    <Transition native={true} items={animationTrigger} from={from} enter={enter} leave={leave}>
      {(items) =>
        items &&
        ((props: any) => (
          <animated.div id={id} style={{ ...props, ...animatedStyle }} className={`${className}`}>
            {animationTrigger && (
              <Keyboard
                baseClass="virtual-keyboard"
                layout={layout}
                layoutName={layoutName}
                keyboardRef={attachRefToKeyboardEle}
                onKeyPress={onKeyPress}
                maxLength={maxLength}
                buttonTheme={[
                  {
                    class: `${keyboardType === 'default' ? 'hg-down' : null}`,
                    buttons: '\u21b4',
                  },
                ]}
              />
            )}
          </animated.div>
        ))
      }
    </Transition>
  )
}
