import React, { useState } from 'react'
import { useAuth } from '../lib/auth'

const Login: React.FC = () => {
  const [name, setName] = useState('')
  const { login } = useAuth()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    login(name.trim())
  }

  return (
    <div className="card">
      <h2>ログイン</h2>
      <form onSubmit={onSubmit}>
        <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="あなたの名前" />
        <div style={{display:'flex', gap:8}}>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default Login
