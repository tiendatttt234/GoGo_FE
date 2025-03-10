import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import AdminDashboard from '../pages/AdminDashboard'
import Leaderboard from '../pages/Leaderboard'
import Blogs from '../pages/Blogs'
import BlogDetails from '../pages/BlogDetails'
import AddBlog from './../pages/AddBlog'
import EditBlog from '../pages/EditBlog' // Fix the import path
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />
    }

    return children
}

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/admin' element={<AdminDashboard/>} />
         <Route path='/leaderboard' element={<Leaderboard/>} />
         <Route path='/blogs' element={<Blogs/>} />
         <Route path='/blogs/:id' element={<BlogDetails/>} />
         <Route 
            path="/blogs/add" 
            element={
                <ProtectedRoute>
                    <AddBlog />
                    
                </ProtectedRoute>
            } 
         />
         <Route 
    path="/blogs/edit/:id" 
    element={
        <ProtectedRoute>
            <EditBlog />
        </ProtectedRoute>
    } 
/>
      </Routes>
   )
}

export default Routers
