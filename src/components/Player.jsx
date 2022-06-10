import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faAngleLeft, faPlay, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons"
import { playAudio } from "../until";


function Player({
    currentSong, 
    isPlaying, 
    setPlaying, 
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
    setSongs,
    timeUpdateHandler
}){

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });

        setSongs(newSongs);
        playAudio(isPlaying, audioRef)

    }, [currentSong])

    const getTime = (time) => {
        if(time) {
            return (
                Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
            )
        } else {
            return '0:00'
        }
    }

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setPlaying(!isPlaying)
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, current: e.target.value})
    
    }

    const skipTrackHandler = (track) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(track === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if(track === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animatePercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.current)}</p>
               <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="tranck">
                
                <input 
                        type="range" 
                        min={0} 
                        max={songInfo.duration || 0}
                        value = {songInfo.current}
                        onChange = {dragHandler}
                />

                <div style={trackAnim} className="animate-tranck"></div>
               </div>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" onClick={() => skipTrackHandler('skip-back')} size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" onClick={() => skipTrackHandler('skip-forward')} size="2x" icon={faAngleRight} />
            </div>

            <audio 
                onTimeUpdate={timeUpdateHandler} 
                ref={audioRef} src={currentSong.audio}

            ></audio>
        </div>
    )
}

export default Player