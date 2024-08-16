import './App.css'
import {Board} from "./components/Board.jsx";
import {Timer} from "./components/Timer.jsx";
import {useState} from "react";

function App() {
    const [numberOfFlag, setNumberOfFlag] = useState(0)
    const [isActive, setIsActive] = useState(false)
    
    const handleClick = () => {
      setIsActive(true)
    }

    return (
        <div className="App" onClick={handleClick}>
            <div className="info">
                <Timer isActive={isActive}/>
                <div className="score">
                    {10-numberOfFlag} 💣
                </div>
            </div>
            <Board rows={10} cols={10} mines={10} setNumberOfFlag={setNumberOfFlag}/>
        </div>
    );
}

export default App
