import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

export interface IModalLayout extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactElement
  content?: React.ReactElement
  footer?: React.ReactElement
}

export default function ModalLayout({ header, content, footer, className }: IModalLayout) {
  return (
    <div className={className}>
      {header && <ModalHeader>{header}</ModalHeader>}
      {content && <ModalContent>{content}</ModalContent>}
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </div>
  )
}

const ModalHeader = styled.div.attrs({
  className: 'flex justify-center',
})``

const ModalContent = styled.div.attrs({
  className: 'flex-column items-center justify-center',
})``

const ModalFooter = styled.div.attrs({
  className: 'flex justify-center',
})``
