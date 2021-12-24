import React, { useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'rendition'
import OutlineBtn from 'src/components/buttons/OutlineBtn'
import PrimaryBtn from 'src/components/buttons/PrimaryBtn'

export default function SignatureComponent({ onConfirmSignature }) {
  let sigPad: any = useRef(null)
  const [trimmedDataURL, setTrimmedDataURL]: any = useState(null)

  const clear = () => {
    sigPad.clear()
  }

  const trim = () => {
    setTrimmedDataURL({
      trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL('image/png'),
    })
    // onConfirmSignature();
  }

  return (
    <div>
      <div className="card__border2 relative flex justify-center">
        <SignatureCanvas
          canvasProps={{ style: { width: '100%', height: '100%' } }}
          ref={(ref) => {
            sigPad = ref
          }}
        />
      </div>
      <div className="flex justify-around">
        <PrimaryBtn label="Tiếp tục" onClickHandler={trim} />
        <OutlineBtn label="Xóa" onClickHandler={clear} />
      </div>
    </div>
  )
}
