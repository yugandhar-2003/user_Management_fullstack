import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useUsers } from '../context/UserContext'

export default function UserDetails(){
  const { id } = useParams()
  const { users, deleteUser } = useUsers()
  const navigate = useNavigate()
  const user = users.find(u=>String(u.id) === String(id))

  if(!user) return (
    <div>
      <p>User not found.</p>
      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  )

  const handleDelete = async () => {
    if(!confirm('Delete this user?')) return
    try{
      await deleteUser(user.id)
      navigate('/')
    }catch(err){
      alert('Delete failed')
    }
  }

  return (
    <div>
      <Link to="/" className="btn btn-link mb-3">← Back to Dashboard</Link>
      <div className="card">
        <div className="card-body">
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>

          <h5 className="mt-3">Address</h5>
          <p>{user.address?.street || user.addressStreet}, {user.address?.suite || ''} {user.address?.city || user.addressCity} - {user.address?.zipcode || user.addressZipcode}</p>

          <h6>Geo-location</h6>
          <p>Lat: {user.address?.geo?.lat || user.geoLat} | Lng: {user.address?.geo?.lng || user.geoLng}</p>

          <h5 className="mt-3">Company</h5>
          <p><strong>{user.company?.name || user.companyName}</strong></p>
          <p>{user.company?.catchPhrase || user.companyCatchPhrase}</p>

          <div className="mt-3">
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}