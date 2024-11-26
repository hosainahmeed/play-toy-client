import { createContext, useState, useEffect } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup
} from 'firebase/auth'
import app from '../../firebase/firebase.config'
import { GoogleAuthProvider } from 'firebase/auth'

export const AuthContext = createContext()

function AuthProvider ({ children }) {
  const auth = getAuth(app)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const provider = new GoogleAuthProvider()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
      .then(result => {
        setUser(result.user)
        setLoading(false)
      })
      .catch(error => {
        console.error('Google Sign-In error:', error.message)
        setLoading(false)
        throw error
      })
  }

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth).finally(() => setLoading(false))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  const userInfo = {
    user,
    createUser,
    loginUser,
    logOut,
    googleSignIn,
    loading,
    setUser
  }

  return (
    <AuthContext.Provider value={userInfo}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
