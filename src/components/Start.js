import {useState} from 'react';
import {SudokuLevel} from './SudokuLevel'
import PropTypes from "prop-types";
export const Start = (props) => {
    const [levelsVisible, setLevelsVisible] = useState(false);

    return (
        <div className="sudoku__start">
            <h1 className="sudoku__title">
                Sudoku
            </h1>
            <button
                className="sudoku__start-btn"
                onClick={() => {
                    setLevelsVisible(!levelsVisible);
                }}
            >
                New game
            </button>
            <ul className={levelsVisible ? "sudoku__levels sudoku__levels_visible" : "sudoku__levels"}>
                <SudokuLevel
                    key="easy"
                    value="easy"
                    setLevel={props.setLevel}
                />
                <SudokuLevel
                    key="medium"
                    value="medium"
                    setLevel={props.setLevel}
                />
                <SudokuLevel
                    key="hard"
                    value="hard"
                    setLevel={props.setLevel}
                />
                <SudokuLevel
                    key="extreme"
                    value="extreme"
                    setLevel={props.setLevel}
                />
            </ul>
        </div>
    );
}

Start.propTypes = {
    setLevel: PropTypes.func.isRequired
}