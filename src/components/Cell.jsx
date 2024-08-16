import React, {useState} from 'react';

export const Cell = ({ adjacentMines, isMine, isFlag, revealed, onClick, onRightClick, row, col, setNumberOfFlag }) => {
    const handleClick = () => {
        if (!revealed) {
            onClick();
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault()
        if (!revealed) {
            onRightClick();
        }
    };

    const backgroundColor = revealed
        ? (row + col) % 2 === 0
            ? '#ecea95'
            : '#e2cb4b'
        : (row + col) % 2 === 0
            ? '#33c74b'
            : '#168c2a';


    let content = '';
    let color = 'black';
    if (revealed) {
        content = isMine ? '💣' : adjacentMines > 0 ? adjacentMines : '';
        if (adjacentMines > 0) {
            switch (adjacentMines) {
                case 1: color = '#fc6500'; break;
                case 2: color = '#382be2'; break;
                case 3: color = '#ee4125'; break;
                case 4: color = '#33c74b'; break;
                case 5: color = '#d723bd'; break;
                case 6: color = '#3ac8dd'; break;
                case 7: color = '#2b3c7b'; break;
                case 8: color = '#8a9138'; break;
                default: color = 'black';
            }
        }
    }else if (isFlag) {
        content = '🚩';
    }

        return (
        <div
            className="cell"
            onClick={handleClick}
            onContextMenu={handleRightClick}
            style={{
                width: '30px',
                height: '30px',
                display: 'inline-block',
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'pointer',
                backgroundColor: backgroundColor,
                color: color,
            }}
        >
            {content}
        </div>
    );
}
