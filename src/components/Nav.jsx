import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {faMusic} from "@fortawesome/free-solid-svg-icons"

function Nav({setLibraryStatus, libraryStatus}){
    return(
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus) }>
                <FontAwesomeIcon className="musicIcon"  icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav;