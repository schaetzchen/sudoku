import {Board} from "./Board";
import {Controls} from "./Controls";
import {Instructions} from "./Instructions";
import {useState} from "react";
import PropTypes from "prop-types";
export const Sudoku = (props) => {
    const [notesMode, setNotesMode] = useState(false);
    const toggleNotesMode = () => {
        setNotesMode(!notesMode);
    };

    return (
        <div
            className="sudoku__game"
        >
            <Board
                level={props.level}
                isNotesMode={notesMode}
                setGameWon={props.setGameWon}
            />
            <div>
                <Instructions />
                <Controls
                    isNotesMode={notesMode}
                    toggleNotesMode={toggleNotesMode}
                    resetLevel={props.resetLevel}
                />
            </div>
        </div>
    );
}

Sudoku.propTypes = {
    level: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    setGameWon: PropTypes.func.isRequired,
    resetLevel: PropTypes.func.isRequired
}