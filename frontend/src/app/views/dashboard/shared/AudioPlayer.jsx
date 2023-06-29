import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = () => {
    // eslint-disable-next-line
    const [audioFiles, setAudios] = useState([
    '/assets/AudioClips/aHkLpZsYtR.mp3',
    '/assets/AudioClips/qWdEfGjIhT.mp3',
    '/assets/AudioClips/bNxMvPlKoJ.mp3',
    '/assets/AudioClips/cVbNmLkPoI.mp3',
    '/assets/AudioClips/qWeRtYuIoP.mp3',
    '/assets/AudioClips/mNbVcXzAsD.mp3',
    '/assets/AudioClips/zXcVbNmLoI.mp3',
    '/assets/AudioClips/aSdFgHjKlP.mp3',
    '/assets/AudioClips/qWeRtZUKoP.mp3',
    '/assets/AudioClips/pOiUyTrEsD.mp3',
    '/assets/AudioClips/zXcVbNmLoP.mp3',
    '/assets/AudioClips/ZUkltYuIoP.mp3',
    '/assets/AudioClips/pOkouUrEsD.mp3',
    '/assets/AudioClips/ZxcVbnmAqs.mp3',
    '/assets/AudioClips/WerTyuIoPz.mp3',
    '/assets/AudioClips/LkjHgfDsAx.mp3',
    '/assets/AudioClips/QweOlUuIop.mp3',
    '/assets/AudioClips/pOiuytReWq.mp3',
    '/assets/AudioClips/vBnmQwertY.mp3',
    '/assets/AudioClips/ZxcVbnmAsd.mp3',
    '/assets/AudioClips/gHjklpoiUt.mp3',
    '/assets/AudioClips/asdFghjklz.mp3',
    '/assets/AudioClips/bNmAsdfghJ.mp3',
    '/assets/AudioClips/poiUytReWs.mp3',
    '/assets/AudioClips/XwCvBnMlKj.mp3',
    '/assets/AudioClips/RfDsGhJkLm.mp3',
    '/assets/AudioClips/ZbVnMqWsEr.mp3',
    '/assets/AudioClips/JtYuIqWpAs.mp3',
    '/assets/AudioClips/KjNmLkIuHj.mp3',
    '/assets/AudioClips/DgThKpFsXd.mp3',
    '/assets/AudioClips/CbVmNkLjMh.mp3',
    '/assets/AudioClips/RvBnMkLpQw.mp3',
    '/assets/AudioClips/ZxVbNkLjHg.mp3',
    '/assets/AudioClips/TsWqErYhUj.mp3',
    '/assets/AudioClips/BnMlKjHgFv.mp3',
    '/assets/AudioClips/GdHsKfJlMq.mp3',
    '/assets/AudioClips/YnTgHmJbFs.mp3',
    '/assets/AudioClips/WpAsDfGhJk.mp3',
    '/assets/AudioClips/MnBhFgJkLp.mp3',
    '/assets/AudioClips/QwErTyUqWi.mp3',]);

    const [currentAudio, setCurrentAudio] = useState('');

      
        useEffect(() => {
          const randomIndex = Math.floor(Math.random() * audioFiles.length);
          setCurrentAudio(audioFiles[randomIndex]);
        }, [audioFiles]);
      
        return (
          <div>
            {currentAudio && (
              <ReactAudioPlayer 
              src={currentAudio} 
              controls />
            )}
          </div>
        );
      };
      
      export default AudioPlayer;

