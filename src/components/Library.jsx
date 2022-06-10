import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
    songs, 
    setCurrentSong, 
    audioRef, 
    isPlaying,
    setSongs,
    libraryStatus
}){
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2 className="library__title">Library</h2>
            <div className="Library-songs">
                {songs.map(song => (
                    <LibrarySong 
                        key={song.id} 
                        currentSong = {song}
                        id = {song.id}
                        songs = {songs}
                        setCurrentSong = {setCurrentSong}
                        audioRef = {audioRef}
                        isPlaying = {isPlaying}
                        setSongs = {setSongs}
                    />
                ))}
            </div>

        </div>
    )
}

export default Library