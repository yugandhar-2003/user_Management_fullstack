import React, { useState } from 'react'
import { useUsers } from '../context/UserContext'

export default function CreateUserModal({ onClose }){
  const { addUser } = useUsers()
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:{ name:'' }, address:{ street:'', city:'', zipcode:'', geo:{ lat:'', lng:'' } } })

  const handleChange = (path, value)=>{
    setForm(prev=>{
      const next = { ...prev }
      const parts = path.split('.')
      let cur = next
      for(let i=0;i<parts.length-1;i++){
        cur[parts[i]] = { ...cur[parts[i]] }
        cur = cur[parts[i]]
      }
      cur[parts[parts.length-1]] = value
      return next
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!form.name) return alert('Name required')
    try{
      await addUser(form)
      onClose()
    }catch(err){
      alert('Failed to create user: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ background:'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New User (client-side)</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input className="form-control" value={form.name} onChange={e=>handleChange('name', e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input className="form-control" value={form.email} onChange={e=>handleChange('email', e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input className="form-control" value={form.phone} onChange={e=>handleChange('phone', e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Company</label>
                <input className="form-control" value={form.company.name} onChange={e=>handleChange('company.name', e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}