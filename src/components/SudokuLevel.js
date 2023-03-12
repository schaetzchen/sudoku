import PropTypes from "prop-types";
export const SudokuLevel = (props) => {

    const setLevel = () => {
        props.setLevel(props.value);
    }

    return (
        <li
            className="sudoku__level"
            onClick={setLevel}
        >
            {props.value}
        </li>
    );
}

SudokuLevel.propTypes = {
    value: PropTypes.string.isRequired,
    setLevel: PropTypes.func.isRequired
}