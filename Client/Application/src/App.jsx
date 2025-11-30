import { createContext, useState } from 'react'
import './App.css'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllMovies from './Pages/AllMovies/AllMovies'
import MyReviews from './Pages/MyReviews/MyReviews'
import AllReviews from './Pages/AllReviews/AllReviews'
import EditProfile from './Pages/EditProfile/EditProfile'
import ChangePassword from './Pages/ChangePassword/ChangePassword'
import MovieReviews from './Pages/MovieReviews/MovieReviews.jsx'
import EditReview from './Pages/EditReview/EditReview.jsx'
import { ToastContainer } from 'react-toastify'
export const AuthContext = createContext() //create context
function App() {
  const [user, setUser] = useState(null)
  return (

    <div>
      <AuthContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='register'
            element={<Register />} />
            <Route path='login'
            element={<Login/>}/>
          <Route path='/'
             element={<Navigate to='/login' />} />
          <Route path='allMovies'
            element={<AllMovies /> } />
          <Route path='myReviews'
            element={<MyReviews />} />
          <Route path='allReviews'
            element={<AllReviews />} />
          <Route path='editProfile'
            element={<EditProfile />} />
          <Route path='movieReviews'
            element={<MovieReviews />} />
          <Route path='changePassword'
            element={<ChangePassword />} />
          <Route path='editReview'
            element={<EditReview />} />
        </Routes>
      </AuthContext.Provider>
      <ToastContainer/>
    </div>
  )
}

export default App
