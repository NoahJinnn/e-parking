import React from 'react'
import ExitCorner from 'src/components/svg-components/ExitCorner'
import CloseBtn from 'src/components/svg-components/CloseBtn'
import './PageHeader.scss'

import { useLocation } from 'react-router-dom'
import LeftHeader from './LeftHeader'
import { useHistory } from 'react-router'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'

function PageHeader() {
  const { pathname } = useLocation()
  const history = useHistory()

  const onCloseCheckinSession = () => {
    history.push('/')
  }
  const [onDebounceClick] = useDebounceClick()

  const onCloseCheckinClick = () => {
    onDebounceClick(onCloseCheckinSession)
  }

  return (
    <div className="page-header">
      {!(pathname === '/checkin/success' || pathname === '/checkout/success') && <LeftHeader />}
      {(pathname === '/checkin/success' || pathname === '/checkout/success') && (
        <div>
          <CloseBtn onClickHandler={onCloseCheckinClick} className="page-header__close-btn-container" svgClass="page-header__close-btn" />
          <ExitCorner className="page-header__exit-corner" />
        </div>
      )}
    </div>
  )
}

export default PageHeader
