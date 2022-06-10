import React from "react";
import { playAudio } from "../until";

function LibrarySong({ 
    audioRef,
    currentSong, 
    setCurrentSong, 
    songs, 
    id,
    isPlaying,
    setSongs
}){
    
    const songSelectHandler = () => {

        const selectedSong = songs.filter((el) => el.id === id)
        setCurrentSong(selectedSong[0]);

        const newSongs = songs.map((song) => {
            if(song.id === id) {
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
    }
    
    return(
        <div onClick={songSelectHandler} className={`songs ${currentSong.active ? 'selected' : ''}`}>
            <img src={currentSong.cover} alt={currentSong.name} />
            <div className="song-desc">
                <h2 className="songName">{currentSong.name}</h2>
                <h2 className="songArts">{currentSong.artist}</h2>
            </div>
        </div>
    )
}

export default LibrarySong