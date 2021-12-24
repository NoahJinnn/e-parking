import './IntroPage.scss'

import React, { useEffect, useState } from 'react'
import { Spinner } from 'rendition'
// import testVideo from "../../assets/video/test.mp4"
import { firebaseAuth, firebaseStorage } from 'src/firebase/firebase.utils'

import IntroMenu from './components/intro-menu/IntroMenu'

export default function IntroPage() {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [videoUrl, setvideoUrl] = useState('')

  useEffect(() => {
    const firebaseEmail = process.env.REACT_APP_FIREBASE_EMAIL || ''
    console.log(firebaseEmail)
    const firebasePass = process.env.REACT_APP_FIREBASE_PASSWORD || ''
    firebaseAuth
      .signInWithEmailAndPassword(firebaseEmail, firebasePass)
      .then(() => {
        firebaseStorage
          .ref('videos/11. Tabs.mp4')
          .getDownloadURL()
          .then((url: string) => {
            setvideoUrl(url)
          })
          .catch((err: Error) => {
            console.log(err)
          })
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="intro-page">
      <Spinner label="Loading..." m={3} emphasized={true} show={!videoUrl} style={{ position: 'absolute' }} />
      {videoUrl && (
        <video className="bg-player" id="background-video" loop={true} autoPlay={true} muted={true}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className={`__shadow-bg ${isShowMenu && 'show-bg'}`} />
      <IntroMenu isShowMenu={isShowMenu} showMenuHandler={setIsShowMenu} />
    </div>
  )
}
