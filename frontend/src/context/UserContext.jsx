import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000'
})

export function UserProvider({ children }){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function fetchUsers(){
      setLoading(true)
      try{
        const res = await api.get('/api/users')
        setUsers(res.data)
      }catch(err){
        console.error('Failed to load users', err)
      }finally{
        setLoading(false)
      }
    }
    fetchUsers()
  },[])

  const addUser = async (user)=>{
    try{
      const payload = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website || null,
        company: { name: user.company?.name || user.companyName, catchPhrase: user.company?.catchPhrase },
        address: {
          street: user.address?.street,
          city: user.address?.city,
          zipcode: user.address?.zipcode,
          geo: { lat: user.address?.geo?.lat, lng: user.address?.geo?.lng }
        }
      }
      const res = await api.post('/api/users', payload)
      setUsers(prev=>[...prev, res.data])
    } catch(err){
      console.error('Create user failed', err)
      throw err
    }
  }

  const updateUser = async (id, updates) => {
    try {
      const res = await api.put(`/api/users/${id}`, updates)
      setUsers(prev => prev.map(u => String(u.id) === String(id) ? res.data : u))
    } catch (err) {
      console.error('Update failed', err)
      throw err
    }
  }

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/users/${id}`)
      setUsers(prev => prev.filter(u => String(u.id) !== String(id)))
    } catch (err) {
      console.error('Delete failed', err)
      throw err
    }
  }

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}