import './MoreModal.scss'

import React from 'react'
import Popup from 'reactjs-popup'
import CloseModalIcon from 'src/components/svg-components/CloseModalIcon'

export default function MoreModal({ open, closeModal }) {
  const items = [
    {
      name: 'Support Center',
      icon: null,
      backgroundImage: 'linear-gradient(to bottom, #acbcff, #5db4ff)',
    },
    {
      name: 'Mua vé tháng',
      icon: null,
      backgroundImage: 'linear-gradient(to bottom, #ffacec, #ff5d82)',
    },
    {
      name: 'Báo cáo sự cố',
      icon: null,
      backgroundImage: 'linear-gradient(to bottom, #ffacac, #ffcd5d)',
    },
  ]

  const renderItems = () => {
    return items.map(({ name, backgroundImage }, idx) => (
      <li className="flex justify-start items-center mv3 w-80 h-15" key={idx}>
        <div className="more-icon mh4" style={{ backgroundImage: `${backgroundImage}` }} />
        <div className="more-name">{name}</div>
      </li>
    ))
  }

  return (
    <div>
      <Popup className="more" open={open} closeOnDocumentClick={true} onClose={closeModal}>
        <>
          <ul className="list flex flex-column items-center justify-center w-100 h-100">{renderItems()}</ul>
          <CloseModalIcon onClickHandler={closeModal} className="flex justify-center pt4" svgClass="more-close__btn" />
        </>
      </Popup>
    </div>
  )
}
