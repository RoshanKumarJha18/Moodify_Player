import React, { useState } from "react";
import { CgPlayButtonO } from "react-icons/cg";
import { GiPauseButton } from "react-icons/gi";

const Song = () => {
  const [song, setSong] = useState([
    {
      title: "Song Title",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 1",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 2",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
    {
      title: "Song Title 3",
      artist: "Artist Name",
      url: "https://example.com/song.mp3",
    },
  ]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Recommended Songs</h1>
      <div  className="scroll-hidden h-[400px] overflow-y-auto overflow-x-hidden">
        {song.map((elem, idx) => {
          return (
           <div className="flex justify-center ">
             <div key={idx} className="flex items-center  w-[70%] justify-between mb-4 p-4 bg-gray-800 rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">{elem.title}</h2>
                <p className="text-sm text-gray-600">{elem.artist}</p>
              </div>
              <div className="flex items-center gap-4">
                <CgPlayButtonO size={25} className="cursor-pointer hover:text-blue-500" />
                <GiPauseButton size={25} className="cursor-pointer hover:text-blue-500" />
              </div>
            </div>
           </div>
          );
        })}
      </div>
    </div>
  );
};

export default Song;
