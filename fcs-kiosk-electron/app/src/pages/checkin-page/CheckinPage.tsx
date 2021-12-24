import React from 'react'
import { useLocation } from 'react-router'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components'

import bgCheckin from '../../assets/pic/bg-checkin.svg'
import PageHeader from '../../components/header/PageHeader'
import ProgressFooter from '../../components/progress-footer/ProgressFooter'
import SuccessCard from '../../components/success-card/SuccessCard'
import { checkinSession, CheckinSessionContext } from './CheckinSessionContext'
import CarStatusCard from './components/car-status-card/CarStatusCard'
import CheckinOptionsCard from './components/checkin-options-card/CheckinOptionsCard'
import ConfirmCard from './components/confirm-card/ConfirmCard'
import FacialRecognizationCard from './components/facial-card/FacialRecognizationCard'
import OtpCheckin from './components/otp-checkin/OtpCheckin'
import PhoneNumberCheckin from './components/phone-number-checkin/PhoneNumberCheckin'

function CheckinPage() {
  const { path } = useRouteMatch()
  const currentUrl = useLocation()
  const transitions = useTransition(currentUrl, (location) => location.pathname, {
    config: { mass: 1, tension: 200, friction: 18 },
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { display: 'none', transform: 'translateX(-100%)' },
  })

  return (
    <CheckinSessionContext.Provider value={checkinSession}>
      <div className="check-in-out-page">
        <BackgroundCheckin>
          <img src={bgCheckin} alt="Houses picture" />
        </BackgroundCheckin>
        <PageHeader />
        <ProgressFooter isCheckin={true} />
        {transitions.map(({ item: location, props, key }) => (
          <animated.div className="check-in-out-page__body" key={key} style={props}>
            <Switch location={location}>
              <Route exact={true} path={path}>
                <ConfirmCard />
              </Route>
              <Route exact={true} path={`${path}/car-status`}>
                <CarStatusCard />
              </Route>
              <Route exact={true} path={`${path}/options-card`}>
                <CheckinOptionsCard />
              </Route>
              <Route exact={true} path={`${path}/options-card/facial`}>
                <FacialRecognizationCard />
              </Route>
              <Route exact={true} path={`${path}/options-card/passcode`}>
                <PhoneNumberCheckin />
              </Route>
              <Route exact={true} path={`${path}/options-card/passcode/otp`}>
                <OtpCheckin />
              </Route>
              <Route exact={true} path={`${path}/success`}>
                <SuccessCard />
              </Route>
            </Switch>
          </animated.div>
        ))}
      </div>
    </CheckinSessionContext.Provider>
  )
}

export default CheckinPage

const BackgroundCheckin = styled.div.attrs({
  className: 'h-100 w-100 absolute',
})`
  opacity: 40%;
  background-size: contain;
  display: flex;
  flex-direction: column-reverse;
`
