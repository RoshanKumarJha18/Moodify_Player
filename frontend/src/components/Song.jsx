import { CgPlayButtonO } from "react-icons/cg";
import { GiPauseButton } from "react-icons/gi";
import { useRef, useState } from "react";

const Song = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Recommended Songs</h1>
      <div className="scroll-hidden h-[400px] overflow-y-auto overflow-x-hidden">
        {song.map((elem, idx) => {
          return (
            <div className="flex justify-center ">
              <div
                key={idx}
                className="flex items-center  w-[70%] justify-between mb-4 p-4 bg-gray-800 rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">{elem.title}</h2>
                  <p className="text-sm text-gray-600">{elem.artist}</p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Hide default controls */}
                  <audio ref={audioRef} src={elem.audio}></audio>

                  {!isPlaying ? (
                    <CgPlayButtonO
                      size={25}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={handlePlay}
                    />
                  ) : (
                    <GiPauseButton
                      size={25}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={handlePause}
                    />
                  )}
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
