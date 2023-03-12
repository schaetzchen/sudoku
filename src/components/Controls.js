import PropTypes from "prop-types";
export const Controls = (props) => {
    return (
        <div className="sudoku__controls">
            <button
                className="sudoku__control-btn"
                onClick={props.resetLevel}
            >
                New Game
            </button>
            <button
                className="sudoku__control-btn"
                onClick={props.toggleNotesMode}
            >
                {props.isNotesMode ? "Notes: ON" : "Notes: OFF"}
            </button>
        </div>
    );
}

Controls.propTypes = {
    isNotesMode: PropTypes.bool.isRequired,
    toggleNotesMode: PropTypes.func.isRequired,
    resetLevel: PropTypes.func.isRequired
}