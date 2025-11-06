import React from 'react'
import { useAuth } from '../lib/auth'
import Login from '../components/Login'
import DreamForm from '../components/DreamForm'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>夢のノート</h1>
        {user ? (
          <div>
            <span style={{marginRight:12}}>ようこそ、{user.name} さん</span>
            <button className="secondary" onClick={logout}>ログアウト</button>
          </div>
        ) : null}
      </div>

      {!user ? (
        <Login />
      ) : (
        <>
          <DreamForm />
        </>
      )}

      <div style={{marginTop:20}} className="card">
        <h3>保存済みの夢（ローカル）</h3>
        <SavedList />
      </div>
    </div>
  )
}

function SavedList() {
  const [list, setList] = React.useState<string[]>([])

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('dreams')
      if (raw) setList(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  if (list.length === 0) return <div>まだ保存された夢はありません。</div>
  return (
    <ol>
      {list.map((t, i) => (
        <li key={i} style={{marginBottom:8}}>{t}</li>
      ))}
    </ol>
  )
}
