import React, { useState } from 'react'
import { ExternalLink, LogIn, UserCircle, Moon, Sun, Copy } from 'lucide-react'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [profileLink, setProfileLink] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setResult('')
    setLoading(true)
    console.log(profileLink)
    // const usernameMatch = profileLink.match(/https:\/\/society\.ton\.org\/profile\/(.+)/)
    const usernameMatch = profileLink.substring(profileLink.lastIndexOf("/") + 1);
    console.log(usernameMatch); 

    if (!usernameMatch) {
      setError('Invalid profile link. Please make sure you\'ve copied the correct URL.')
      setLoading(false)
      return
    }


    try {
      const response = await fetch(`https://society.ton.org/v1/users/${usernameMatch}/sbts?_start=0&_end=500`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      // console.log(data.data.sbts)

      // console.log(data.data)
      const sbt_list = data.data.sbts
      setCount(data.data.count);
      console.log(count);
      const og = sbt_list.some((item) => item.sbt_collections_id === 1245);
      setResult(og ? "You are an OG champ!" : "You are not an OG champ.");

          } catch (err) {
      setError('An error occurred while fetching data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl max-w-md w-full transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Telescope</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
        
        <div className={`mb-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-6 rounded-lg shadow-md`}>
          <h2 className={`font-semibold text-xl mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Follow these steps:</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-full p-2`}>
                <ExternalLink className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <p className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Go to <a href="https://society.ton.org" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} hover:underline font-medium`}>society.ton.org</a></p>
            </div>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-full p-2`}>
                <LogIn className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <p className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Log in to your TON Society account</p>
            </div>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-full p-2`}>
                <UserCircle className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <p className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Go to your Profile</p>
            </div>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} rounded-full p-2`}>
                <Copy className={`w-6 h-6 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <p className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Copy your profile link</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profileLink" className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your TON Society Profile Link
            </label>
            <input
              type="text"
              id="profileLink"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
              placeholder="Paste your TON Society Profile Link"
              className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-500' : 'focus:ring-purple-500'}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium transition-colors duration-300`}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check OG Status'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className={`mt-4 p-3 rounded-md ${result.includes('OG champ') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            <p>You hold {count} sbts 🎉🎉</p>
            {result}
          </div>
        )}
      </div>


    </div>
  )
}

export default App