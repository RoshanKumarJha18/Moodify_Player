import React from 'react'
import FacialExpression from './components/FacialExpression'
import Song from './components/Song'
import { useState } from 'react'

const App = () => {
  const [song, setSong] = useState([]);
  return (
    <div className="bg-black text-white h-[100%] w-screen p-10 overflow-x-hidden">
       <h1 className="text-6xl font-bold text-center mb-10">Moodify Song Player</h1>
      <FacialExpression SetSong={setSong} />
      <Song song={song} />
    </div>
  )
}

export default App