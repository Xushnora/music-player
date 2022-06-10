import { useRef, useState } from 'react';
import './App.css';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import data from './data.js'
import Conatiner from './Layout/Container';

function App() {

  // ref
  const audioRef = useRef(null);

  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    current: 0,
    duration: 0,
    animatePercentage: 0
  })

  const [libraryStatus, setLibraryStatus] = useState(false)

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundcurrent = Math.round(current)
    const roundduration = Math.round(duration)
    const animate = Math.round((roundcurrent / roundduration)*100);

    setSongInfo({...songInfo, current, duration, animatePercentage: animate})
  }

  return (
    <div className="App">
      <Conatiner>
        <div className={`container-small ${libraryStatus ? 'ml' : ''}`}>
          <Nav 
            libraryStatus = {libraryStatus}
            setLibraryStatus = {setLibraryStatus}
          />
          <Song currentSong = {currentSong} />
          <Player 
            audioRef = {audioRef}
            currentSong = {currentSong}
            isPlaying = {isPlaying}
            setPlaying = {setPlaying}
            setSongInfo = {setSongInfo}
            songInfo = {songInfo}
            songs = {songs}
            setCurrentSong = {setCurrentSong}
            setSongs = {setSongs}
            timeUpdateHandler = {timeUpdateHandler}
            />

        </div>
        <Library
          audioRef = {audioRef} 
          songs = {songs}
          setSongs = {setSongs}
          setCurrentSong = {setCurrentSong}
          isPlaying = {isPlaying}
          libraryStatus = {libraryStatus}
        />
      </Conatiner>
    </div>
  );
}

export default App;
