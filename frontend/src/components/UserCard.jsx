import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCard({ user }){
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{user.name}</h5>
        <p className="mb-1"><strong>Email:</strong> {user.email}</p>
        <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
        <p className="mb-2"><strong>Company:</strong> {user.company?.name || user.companyName}</p>
        <div className="mt-auto d-flex justify-content-end">
          <Link to={`/user/${user.id}`} className="btn btn-outline-primary btn-sm">View</Link>
        </div>
      </div>
    </div>
  )
}