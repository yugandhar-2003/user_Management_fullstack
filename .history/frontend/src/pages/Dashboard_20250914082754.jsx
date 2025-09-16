import React, { useMemo, useState } from 'react'
import { useUsers } from '../context/UserContext'
import UserCard from '../components/UserCard'
import CreateUserModal from './CreateUserModal'


export default function Dashboard(){
const { users, loading } = useUsers()
const [query, setQuery] = useState('')
const [showCreate, setShowCreate] = useState(false)


const filtered = useMemo(()=>{
const q = query.trim().toLowerCase()
if(!q) return users
return users.filter(u=>u.name.toLowerCase().includes(q))
}, [users, query])


return (
<div>
<div className="d-flex gap-2 mb-3 flex-column flex-md-row align-items-start align-items-md-center">
<input className="form-control me-2" placeholder="Search by name..." value={query} onChange={e=>setQuery(e.target.value)} />
<button className="btn bg-pink-500 ms-auto" onClick={()=>setShowCreate(true)}>Create New User</button>
</div>


{loading ? <div>Loading users...</div> : (
<div className="row">
{filtered.map(user=> (
<div key={user.id} className="col-12 col-sm-6 col-lg-4 mb-3">
<UserCard user={user} />
</div>
))}
</div>
)}


{showCreate && <CreateUserModal onClose={()=>setShowCreate(false)} />}
</div>
)
}