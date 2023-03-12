import {useState} from 'react';
export const Instructions = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="sudoku__instructions-container">
            <button
                className="sudoku__instructions-btn-show"
                onClick={() => {setVisible(true);}}
            >
                Instructions
            </button>
            <div className={visible ? "sudoku__instructions sudoku__instructions_visible" : "sudoku__instructions"}>
                <span className="sudoku__instructions-span">
                    Each row, each column, and each 3x3 box must contain the numbers 1-9 exactly once each. <br/><br/>
                    Use numbers on your keyboard to leave a number or a note in the selected cell. <br/> <br/>
                    Click with your mouse on a cell to select it. Click outside the board to unselect cells. <br/> <br/>
                    You can also highlight a particular number on the board by clicking the corresponding key on your keyboard.
                </span>
                <button
                    className="sudoku__instructions-btn-close"
                    onClick={() => {setVisible(false);}}
                >
                    Close
                </button>
            </div>
        </div>
    );
}