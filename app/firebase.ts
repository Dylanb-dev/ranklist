// Config file
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyA7K7QPti-hkmAgI4cv4yzd5iL2Upgl8Uw',
  authDomain: 'ranklist-54a8d.firebaseapp.com',
  databaseURL: 'https://ranklist-54a8d.firebaseio.com',
  projectId: 'ranklist-54a8d',
  storageBucket: 'ranklist-54a8d.appspot.com',
  messagingSenderId: '174891621679',
  appId: '1:174891621679:web:c4519680bb6c00ea'
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())

export const db = firebase.firestore()
export const auth = firebase.auth
