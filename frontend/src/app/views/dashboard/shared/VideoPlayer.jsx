import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([
    '/assets/VideoClips/Gravity_Clip1.mp4',
    '/assets/VideoClips/Gravity_Clip2.mp4',
    '/assets/VideoClips/Gravity_Clip3.mp4',
    '/assets/VideoClips/BladeRunner_Clip1.mp4',
    '/assets/VideoClips/BladeRunner_Clip2.mp4',
    '/assets/VideoClips/BladeRunner_Clip3.mp4'
  ]);

  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideo(videos[randomIndex]);
  }, [videos]);

  return (
    <div>
      {currentVideo && (
        <ReactPlayer
          url={currentVideo}
          controls
          width="640px"
          height="360px"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
