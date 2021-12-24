import './Prompter.scss'

import React, { useState } from 'react'
import Popup from 'reactjs-popup'

import OutlineBtn from '../buttons/OutlineBtn'
import PrimaryBtn from '../buttons/PrimaryBtn'
import AlertPrompterIcon from '../svg-components/AlertPrompterIcon'
import PrompterBg from '../svg-components/PrompterBg'
import SuccessPrompterBg from '../svg-components/SuccessPrompterBg'
import SuccessPrompterIcon from '../svg-components/SuccessPrompterIcon'
import WarnPrompterIcon from '../svg-components/WarnPrompterIcon'
import ModalLayout from './ModalLayout'

export interface Prompter {
  type?: string
  promptTitle: string
  promptContent: string
  onAlertClick?: any
  onSuccessClick?: any
  onWarnClick?: any
  onInfoClickYes?: any
  onInfoClickNo?: any
  close?: any
}

let openPrompter: (prompterOptions: Prompter) => void

function Prompter() {
  const [isPrompterOpen, setIsPrompterOpen] = useState(false)
  const [prompterOptions, setPrompterOptions] = useState<Prompter>()

  openPrompter = (options: Prompter) => {
    setPrompterOptions(options)
    setIsPrompterOpen(true)
  }

  return (
    <div>
      <Popup
        contentStyle={{ border: 0, padding: 0, borderRadius: '15px' }}
        overlayStyle={{ top: '-30%' }}
        open={isPrompterOpen}
        closeOnDocumentClick={false}>
        {(close) => PrompterModal({ ...prompterOptions, close } as Prompter)}
      </Popup>
    </div>
  )
}

const PrompterModal = ({
  type = 'alert',
  promptTitle = '',
  promptContent = '',
  onAlertClick,
  onSuccessClick,
  onWarnClick,
  onInfoClickYes,
  onInfoClickNo,
  close,
}: Prompter) => {
  const onSingleClick = () => {
    switch (type) {
      case 'alert':
        return () => {
          onAlertClick()
          close()
        }
      case 'warn':
        return () => {
          onWarnClick()
          close()
        }
      case 'success':
        return () => {
          onSuccessClick()
          close()
        }
    }
  }

  const renderBg = () => {
    switch (type) {
      case 'alert':
      case 'warn':
      case 'info':
        return <PrompterBg stroke={renderColor()} />
      case 'success':
        return <SuccessPrompterBg stroke={renderColor()} />
    }
  }

  const renderColor = () => {
    switch (type) {
      case 'alert':
        return '#f05757'
      case 'warn':
        return '#fe9108'
      case 'success':
        return '#4192ff'
      case 'info':
        return '#ff5a1d'
    }
  }

  const renderIcon = () => {
    switch (type) {
      case 'alert':
        return <AlertPrompterIcon />
      case 'warn':
        return <WarnPrompterIcon />
      case 'success':
        return <SuccessPrompterIcon />
      case 'info':
        return <div className="prompter-info--icon">?</div>
    }
  }
  const onClosePrompter = () => {
    close()
  }
  return (
    <ModalLayout
      content={
        <div className="flex flex-column justify-center items-center mb4">
          <div className="relative mv4">
            {renderBg()}
            <div className={`prompter-icon prompter-icon--${type}`}>{renderIcon()}</div>
          </div>
          <title className={`flex tc mv3 prompt-text  prompt-text--${type}`}>{promptTitle}</title>
          <div className="flex tc prompt-text--content">{promptContent}</div>
        </div>
      }
      footer={
        <div className="f3 mb4">
          {type === 'info' ? (
            <div className="flex ph3 pv3">
              <OutlineBtn btnColor="#ff5a1d" style={{ width: '200px' }} onClickHandler={onClosePrompter} label="No" />
              <span className="w-10" />
              <PrimaryBtn btnColor="#ff5a1d" style={{ width: '200px' }} onClickHandler={onClosePrompter} label="Yes" />
            </div>
          ) : (
            <PrimaryBtn btnColor={renderColor()} label="Thử lại" onClickHandler={onSingleClick} />
          )}
        </div>
      }
    />
  )
}

export default Prompter
export { openPrompter }
