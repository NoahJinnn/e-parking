import firebase, { auth } from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/remote-config'

const config = {
  apiKey: 'AIzaSyCxjbGcdMhUq3uvGSxd_Zz_i-TWMfbKgR4',
  authDomain: 'e-parking-kiosk-controller.firebaseapp.com',
  databaseURL: 'https://e-parking-kiosk-controller.firebaseio.com',
  projectId: 'e-parking-kiosk-controller',
  storageBucket: 'e-parking-kiosk-controller.appspot.com',
  messagingSenderId: '561694559086',
  appId: '1:561694559086:web:4ed5593474a7ae30b38f7f',
  measurementId: 'G-MENDZLPYXD',
}

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth()

export const firebaseStorage = firebase.storage()

// remoteConfig
const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3000,
}
remoteConfig.defaultConfig = {
  mobile_ios_store_url: 'fetch mobile ios store url failed',
  mobile_android_store_url: 'fetch mobile android store url failed',
}

remoteConfig
  .fetchAndActivate()
  .then(() => {
    const config = remoteConfig.getAll()
    console.log(config)
  })
  .catch((err) => {
    console.error(err)
  })

// setup google sign in
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// firebase app
export default firebase
