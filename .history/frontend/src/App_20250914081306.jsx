import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UserDetails from './components/UserDetails'

export default function App(){
  return (
    <div>
      

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/user/:id" element={<UserDetails/>} />
        </Routes>
      </main>

      <footer className="text-center py-4">Built by Yugandhar</footer>
    </div>
  )
}