'use client'

import { useState } from 'react'

export default function Home() {
  const [profileUrl, setProfileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze profile')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">LinkedIn Profile Analyzer</h1>
        <p className="text-gray-600">Analyze LinkedIn profiles and generate a 2025 year-in-review story</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="Enter LinkedIn profile URL or username"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {result.profile?.name || 'N/A'}</p>
              <p><strong>Headline:</strong> {result.profile?.headline || 'N/A'}</p>
              <p><strong>Posts Found:</strong> {result.posts?.length || 0}</p>
            </div>
          </div>

          {result.posts && result.posts.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Recent Posts (Last 12 Months)</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {result.posts.map((post: any, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <p className="text-gray-800">{post.content}</p>
                    {post.engagement && (
                      <p className="text-sm text-gray-500 mt-2">
                        {post.engagement.likes} likes • {post.engagement.comments} comments
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.story && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">🎉 2025 Year in Review</h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {result.story}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
