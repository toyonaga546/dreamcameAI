import React, { useState } from 'react'

const DreamForm: React.FC = () => {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const raw = localStorage.getItem('dreams')
      const arr = raw ? JSON.parse(raw) as string[] : []
      arr.unshift(text.trim())
      localStorage.setItem('dreams', JSON.stringify(arr))
      setSaved(true)
      setText('')
      setTimeout(() => setSaved(false), 1500)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card" style={{marginTop:16}}>
      <h2>夢を記入</h2>
      <form onSubmit={onSubmit}>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="ここに夢の内容を書いてください..." />
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button type="submit">確定</button>
          {saved && <div style={{alignSelf:'center'}}>保存しました ✅</div>}
        </div>
      </form>
    </div>
  )
}

export default DreamForm
