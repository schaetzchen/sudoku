import './sass/style.css'
import {Start} from './components/Start'
import {Sudoku} from './components/Sudoku';
import {useState} from 'react';
import {levels} from "./levels";

function App() {
    const [level, setLevel] = useState("");
    const [gameWon, setGameWon] = useState(false);
    const getNewLevel = (level) => {
        switch (level) {
            case "easy":
                return levels.easy[Math.floor(Math.random() * levels.easy.length)];

            case "medium":
                return levels.medium[Math.floor(Math.random() * levels.medium.length)];

            case "hard":
                return levels.hard[Math.floor(Math.random() * levels.hard.length)];

            case "extreme":
                return levels.extreme[Math.floor(Math.random() * levels.extreme.length)];

            default:
                return levels.easy[0];
        }
    }

    return (
        <div className="sudoku">
            {(!level && !gameWon) && <Start
                setLevel={(level) => {
                    setLevel(level);
                }}
            />}
            {(level && !gameWon) && <Sudoku
                level={getNewLevel(level)}
                setGameWon={() => {setGameWon(true)}}
                resetLevel={() => {setLevel("")}}
            />}
            {gameWon &&
                <div className="sudoku__game-won">
                    <h2 className="sudoku__game-won-title">Congratulations!</h2>
                    <span className="sudoku__game-won-span">You did a great job.</span>
                    <button
                        className="sudoku__game-won-btn"
                        onClick={() => {
                            setLevel("");
                            setGameWon(false);
                        }}
                    >
                        Try again?
                    </button>
                </div>
            }
        </div>
    );
}

export default App;
