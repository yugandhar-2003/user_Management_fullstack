import React, { useMemo, useState } from 'react'
import { useUsers } from '../context/UserContext'
import UserCard from '../components/UserCard'
import CreateUserModal from './CreateUserModal'

export default function Dashboard() {
  const { users, loading } = useUsers()
  const [query, setQuery] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(u => u.name.toLowerCase().includes(q))
  }, [users, query])

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            className="w-full md:w-1/3 bg-white border border-slate-300 text-slate-900 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2.5 transition duration-200"
            placeholder="Search by name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            className="w-full md:w-auto bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 px-5 py-2.5 transition-all duration-200 ease-in-out hover:scale-105"
            onClick={() => setShowCreate(true)}
          >
            Create New User
          </button>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 font-semibold text-xl mt-16">
            Loading users...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(user => (
                   <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

  
        {showCreate && <CreateUserModal onClose={() => setShowCreate(false)} />}
      </div>
    </div>
  )
}