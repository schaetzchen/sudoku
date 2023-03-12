import {Cell} from "./Cell";
import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const getEmptyArray = () => {
    return [[false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false]];
};

const sudokuCellFactory = (rowIndex, colIndex, value = 0, isDefaultValue = false, notes = []) => {
    return {
        rowIndex: rowIndex,
        colIndex: colIndex,
        value: value,
        _isDefaultValue: isDefaultValue,
        notes: [...notes],
        get isDefaultValue() {
            return this._isDefaultValue;
        }
    };
};

const createCellValues = (level) => {
    const values = [];
    level.forEach((row, rowIndex) => {
        const newRow = [];
        row.forEach((value, columnIndex) => {
            newRow.push(sudokuCellFactory(rowIndex, columnIndex, value, value !== 0));
        });
        values.push(newRow);
    });
    return values;
}

export const Board = (props) => {

    const [cells, setCells] = useState(createCellValues(props.level));
    const [currentCellIndex, setCurrentCellIndex] = useState([]);
    const [highlightedCells, setHighlightedCells] = useState(getEmptyArray());
    const [numberInBold, setNumberInBold] = useState();
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // To unselect cells when clicked outside the board
    const handleClickOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(document.getElementById("sudoku-board"));
        if (!domNode || !domNode.contains(event.target)) {
            setCurrentCellIndex([]);
        }
    }

    // To make numbers bold on keyPress
    const handleKeyDownOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(document.getElementById("sudoku-board"));
        if (!domNode || !domNode.contains(event.target)) {
            if (event.key >= '1' && event.key <= '9' && currentCellIndex.length === 0) {
                setNumberInBold(+event.key);
            } else {
                setNumberInBold(0);
            }
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDownOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDownOutside);
        }
    }, []);

    const setCellsHelper = (newCell) => {
        setCells(prev => {
            let newArray = [];
            for (let i = 0; i < prev.length; i++)
                newArray.push([...prev[i]]);
            newArray[newCell.rowIndex][newCell.colIndex] = newCell;
            return newArray;
        });
    }

    const checkIfInSquare = (squareNum, row, column) => {
        return ((column >= (3 * (squareNum % 3)) && column <= (2 + 3 * (squareNum % 3))) &&
            (row >= (3 * (Math.floor(squareNum / 3))) && row <= (2 + 3 * (Math.floor(squareNum / 3)))));
    };

    const getSquareNumber = (row, column) => {
        return (Math.floor(row / 3) * 3 + Math.floor(column / 3));
    };

    const highlight = (row, column) => {
        setHighlightedCells(() => {
            const newArray = getEmptyArray();
            newArray[row] = [true, true, true, true, true, true, true, true, true];
            const squareNumber = getSquareNumber(row, column);
            for (let i = 0; i < newArray.length; i++) {
                newArray[i][column] = true;
                for (let j = 0; j < newArray[i].length; j++) {
                    if (checkIfInSquare(squareNumber, i, j))
                        newArray[i][j] = true;
                }
            }
            return newArray;
        })
    };

    // To make sure cells get highlighted properly
    useEffect(() => {
        if (currentCellIndex.length === 0) {
            setHighlightedCells(getEmptyArray());
            setNumberInBold(0);
            return;
        }
        highlight(currentCellIndex[0], currentCellIndex[1]);
        setNumberInBold(cells[currentCellIndex[0]][currentCellIndex[1]].value);
    }, [currentCellIndex, cells]);

    const removeValue = (row, column) => {
        if (props.level[row][column] !== 0)
            return;

        setCellsHelper(sudokuCellFactory(row, column, 0));
    };

    const removeNotesWhenValueAdded = (row, column, value) => {
        const squareNumber = getSquareNumber(row, column);
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                if (checkIfInSquare(squareNumber, i, j) ||
                i === row || j === column)
                    if (cells[i][j].notes.includes(value)) {
                        const index = cells[i][j].notes.indexOf(value);
                        const newCell = sudokuCellFactory(
                            i, j, cells[i][j].value, cells[i][j].isDefaultValue, cells[i][j].notes);
                        newCell.notes.splice(index, 1);
                        setCellsHelper(newCell);
                    }
            }
        }
    }

    const handleKeyPress = (event) => {
        if ((event.key === 'Backspace' || event.key === 'Delete') && currentCellIndex.length !== 0)
            removeValue(currentCellIndex[0], currentCellIndex[1]);

        if (event.key < '1' || event.key > '9' || currentCellIndex.length === 0)
            return;

        if (props.isNotesMode) {
            const cell = cells[currentCellIndex[0]][currentCellIndex[1]];
            const newCell = sudokuCellFactory(cell.rowIndex, cell.colIndex, cell.isDefaultValue ? cell.value : 0, cell.isDefaultValue, cell.notes);
            const index = newCell.notes.indexOf(+event.key);
            if (index > -1)
                newCell.notes.splice(index, 1);
            else
                newCell.notes.push(+event.key);

            setCellsHelper(newCell);
            return;
        }

        if (props.level[currentCellIndex[0]][currentCellIndex[1]] === 0) {
            removeNotesWhenValueAdded(currentCellIndex[0], currentCellIndex[1], +event.key);
            setCellsHelper(sudokuCellFactory(currentCellIndex[0], currentCellIndex[1], +event.key));
        }
    };

    const checkCellForError = (row, column) => {
        const cellValue = cells[row][column].value;
        if (cellValue === 0 || props.level[row][column] === cellValue)
            return false;
        const square = getSquareNumber(row, column);
        for (let i = 0; i < cells.length; i++) {
            if ((cells[i][column].value === cellValue && i !== row) ||
                (cells[row][i].value === cellValue && i !== column)) {
                return true;
            }
            for (let j = 0; j < cells[i].length; j++)
                if (checkIfInSquare(square, i, j) && cells[i][j].value === cellValue && i !== row && j !== column)
                    return true;
        }
        return false;
    };

    const checkIfGameWon = () => {
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++)
                if (cells[i][j].value === 0 || checkCellForError(i, j))
                    return false;
        }
        return true;
    }

    if (checkIfGameWon()) {
        props.setGameWon();
    }

    return (
        <div
            className="sudoku__board"
            id="sudoku-board"
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            {squares.map(square => {
                return (
                    <div className="sudoku__square" key={square}>
                        {cells.map((row, rowIndex) => {
                            return row.map((value, colIndex) => {
                                if (checkIfInSquare(square, rowIndex, colIndex)) {
                                    return (
                                        <Cell
                                            key={rowIndex.toString() + colIndex.toString()}
                                            cell={value}
                                            isHighlighted={highlightedCells[rowIndex][colIndex]}
                                            numberInBold={numberInBold}
                                            setCurrentCell={setCurrentCellIndex}
                                            hasError={checkCellForError(rowIndex, colIndex)}
                                        />
                                    );
                                }
                            })
                        })
                        }
                    </div>
                )
            })
            }
        </div>
    );
}

Board.propTypes = {
    level: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    isNotesMode: PropTypes.bool.isRequired,
    setGameWon: PropTypes.func.isRequired
}