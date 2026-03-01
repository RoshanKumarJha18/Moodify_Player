import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

export default function FacialExpression({SetSong}) {
  const videoRef = useRef();
  const [Mood, setMood] = useState();
  const canvasRef = useRef();

   useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    loadModels().then(startVideo);
  }, []);

    const handleVideoPlay = async() => {
       const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
            
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };
        const expressionName = detections[0]?.expressions.asSortedArray()[0]?.expression || 'No face detected';
        console.log(expressionName);
        setMood(expressionName);
        await axios.get(`http://localhost:3000/song?mood=${expressionName}`)
          .then((response) => {
            console.log(response.data);
            SetSong(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching songs:", error);
          });
    };

    

  return (
    <div className='flex items-center justify-center gap-5 mb-6'>
      <div className='rounded-xl overflow-hidden w-[400px] h-[200px] ' style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        
        autoPlay
        muted
        
      />
      
    </div>
      <div>
        <div>
        <h1 className="text-xl font-bold">{!Mood ? 'click to detect the mood ' : `Mood: ${Mood}`}</h1>
      </div>
        <button onClick={handleVideoPlay} className='px-4 cursor-pointer active:scale-100 hover:scale-95 transition-all py-2 rounded-xl bg-blue-600 text-white'>Start Mood Detection</button>
      </div>
      
    </div>
    
  );
}