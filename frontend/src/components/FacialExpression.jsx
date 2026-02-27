import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpression() {
  const videoRef = useRef();
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
    };

    


  return (
    <div className='flex items-end justify-center gap-5'>
      <div className='rounded-xl overflow-hidden w-[300px] h-[200px] ' style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        
        autoPlay
        muted
        
      />
      
    </div>
      <div>
        <button onClick={handleVideoPlay} className='px-4 active:scale-100 hover:scale-95 transition-all py-4 rounded-xl bg-blue-600 text-white'>Start Mood Detection</button>
      </div>
    </div>
    
  );
}