import React from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import bgCheckout from 'src/assets/pic/bg-checkout.svg'
import PageHeader from 'src/components/header/PageHeader'
import ProgressFooter from 'src/components/progress-footer/ProgressFooter'
import styled from 'styled-components'

import SuccessCard from '../../components/success-card/SuccessCard'
import CheckoutOptionsCard from './checkout-options-card/CheckoutOptionsCard'
import OtpCheckout from './checkout-otp-card/OtpCheckout'
import PhoneNumberCheckout from './checkout-phone-card/PhoneNumberCheckout'
import PaymentDetailCard from './payment-detail-card/PaymentDetailCard'
import PaymentMobileCard from './payment-mobile-card/PaymentMobileCard'
import PaymentVisaCard from './payment-visa-card/PaymentVisaCard'
import RatingCard from './rating-card/RatingCard'

export default function CheckoutPage() {
  const { path } = useRouteMatch()
  const currentUrl = useLocation()
  const transitions = useTransition(currentUrl, (location) => location.pathname, {
    config: { mass: 1, tension: 200, friction: 18 },
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { display: 'none', transform: 'translateX(-100%)' },
  })

  return (
    <div className="check-in-out-page">
      <BackgroundCheckout>
        <img src={bgCheckout} alt="Houses picture" />
      </BackgroundCheckout>
      <PageHeader />
      <ProgressFooter isCheckin={false} />
      {transitions.map(({ item: location, props, key }) => (
        <animated.div className="check-in-out-page__body" key={key} style={props}>
          <Switch location={location}>
            <Route exact={true} path={path}>
              <CheckoutOptionsCard />
            </Route>
            <Route exact={true} path={`${path}/passcode`}>
              <PhoneNumberCheckout />
            </Route>
            <Route exact={true} path={`${path}/passcode/otp`}>
              <OtpCheckout />
            </Route>
            <Route exact={true} path={`${path}/payment`}>
              <PaymentDetailCard />
            </Route>
            <Route exact={true} path={`${path}/payment/visa`}>
              <PaymentVisaCard />
            </Route>
            <Route exact={true} path={`${path}/payment/mobile`}>
              <PaymentMobileCard />
            </Route>
            <Route exact={true} path={`${path}/rating`}>
              <RatingCard />
            </Route>
            <Route exact={true} path={`${path}/success`}>
              <SuccessCard />
            </Route>
          </Switch>
        </animated.div>
      ))}
    </div>
  )
}

const BackgroundCheckout = styled.div.attrs({
  className: 'h-100 w-100 absolute',
})`
  opacity: 40%;
  background-size: contain;
  display: flex;
  flex-direction: column-reverse;
`
