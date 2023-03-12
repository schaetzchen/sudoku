import PropTypes from "prop-types";
export const Cell = (props) => {
    const notesToMap = [1,2,3,4,5,6,7,8,9];

    const selectCell = () => {
        props.setCurrentCell([props.cell.rowIndex, props.cell.colIndex]);
    }

    const getClassNamesForSpan = () => {
        let classNames = "sudoku__cell-number";
        if (props.cell.isDefaultValue && props.cell.value !== 0)
            classNames += " sudoku__cell-number_default";
        if (props.cell.value === props.numberInBold)
            classNames += " sudoku__cell-number_bold";
        if (props.hasError)
            classNames += " sudoku__cell-number_error";
        return classNames;
    }

    return (
        <div
            className={props.isHighlighted ? "sudoku__cell sudoku__cell_highlighted" : "sudoku__cell"}
            onClick={selectCell}
        >
            <span
                className={getClassNamesForSpan()}
            >
                {props.cell.value !== 0 && props.cell.value}
            </span>

            {props.cell.value === 0 && props.cell.notes.length > 0 &&
                <div className="sudoku__notes">
                    {
                        notesToMap.map(note => {
                            return (
                                <span
                                    className={note === props.numberInBold ? 'sudoku__note sudoku__note_bold' : 'sudoku__note'}
                                    key={props.cell.rowIndex.toString() + props.cell.colIndex.toString() + "-" + note}
                                >
                                    {props.cell.notes.includes(note) && note}
                                </span>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

Cell.propTypes = {
    cell: PropTypes.shape({
        rowIndex: PropTypes.number.isRequired,
        colIndex: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        _isDefaultValue: PropTypes.bool.isRequired,
        notes: PropTypes.arrayOf(PropTypes.number)
    })
}