'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Dream {
  id: number;
  content: string;
  date: string;
}

export default function DreamPage() {
  const [dreamText, setDreamText] = useState('');
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    // ログイン状態の確認
    if (typeof window !== 'undefined') {
      const storedUsername = sessionStorage.getItem('username');
      if (!storedUsername) {
        router.push('/');
      } else {
        setUsername(storedUsername);
        // 保存された夢を読み込む
        const storedDreams = localStorage.getItem('dreams');
        if (storedDreams) {
          setDreams(JSON.parse(storedDreams));
        }
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dreamText.trim()) {
      const newDream: Dream = {
        id: Date.now(),
        content: dreamText,
        date: new Date().toLocaleString('ja-JP'),
      };
      
      const updatedDreams = [newDream, ...dreams];
      setDreams(updatedDreams);
      
      // localStorageに保存
      if (typeof window !== 'undefined') {
        localStorage.setItem('dreams', JSON.stringify(updatedDreams));
      }
      
      setDreamText('');
      alert('夢を記録しました！');
    } else {
      alert('夢の内容を入力してください');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('username');
    }
    router.push('/');
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 mb-1">
                🌙 Dream Journal
              </h1>
              <p className="text-gray-600">
                こんにちは、{username}さん
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ログアウト
            </button>
          </div>
        </div>

        {/* 夢の入力フォーム */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ✨ 今日の夢を記録
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="dream" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                夢の内容
              </label>
              <textarea
                id="dream"
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                rows={8}
                placeholder="今日見た夢について書いてください..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              記録する
            </button>
          </form>
        </div>

        {/* 保存された夢のリスト */}
        {dreams.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📖 記録した夢
            </h2>
            
            <div className="space-y-4">
              {dreams.map((dream) => (
                <div 
                  key={dream.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {dream.date}
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {dream.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
