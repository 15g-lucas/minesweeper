import React, { useState, useEffect, useRef } from 'react';
import { Cell } from './Cell';

const createBoard = (rows, cols, mines) => {
    let board = Array(rows).fill(null).map(() => Array(cols).fill(null).map(() => ({
        isMine: false,
        isFlag: false,
        adjacentMines: 0,
        revealed: false,
    })));

    let mineCount = 0;

    while (mineCount < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            mineCount++;
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                let mineCount = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
                            mineCount++;
                        }
                    }
                }
                board[row][col].adjacentMines = mineCount;
            }
        }
    }

    return board;
}

export const Board = ({ rows, cols, mines, setNumberOfFlag }) => {
    const audioShovel = useRef(null);
    const audioExplosion = useRef(null);
    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(createBoard(rows, cols, mines));
    }, [rows, cols, mines]);

    const revealCell = (row, col, board) => {
        if (board[row][col].revealed || board[row][col].isMine) return;

        board[row][col].revealed = true;

        if (board[row][col].adjacentMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        revealCell(newRow, newCol, board);
                    }
                }
            }
        }
    }

    const handleClick = async (row, col) => {
        if (board[row][col].isMine) {
            await audioExplosion.current.play();
            const confirmGame = await confirm('Perdu ! Voulez-vous recommencer ?');
            if (confirmGame) {
                window.location.reload();
            }
        } else {
            audioShovel.current.play();
            const newBoard = [...board];
            revealCell(row, col, newBoard);
            setBoard(newBoard);
        }
    }
    
    const handleRightClick = (row, col) => {
        board[row][col].isFlag = true
        const newBoard = [...board];
        setBoard(newBoard);
    }

    return (
        <div className={'game_zone'}>
            <audio src="/FR_demineur/assets/audio/shovel.mp3" ref={audioShovel}></audio>
            <audio src="/FR_demineur/assets/audio/explosion.mp3" ref={audioExplosion}></audio>

            {board.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            isMine={cell.isMine}
                            isFlag={cell.isFlag}
                            adjacentMines={cell.adjacentMines}
                            revealed={cell.revealed}
                            onClick={() => handleClick(rowIndex, colIndex)}
                            onRightClick={() => handleRightClick(rowIndex, colIndex)}
                            row={rowIndex}
                            col={colIndex}
                            setNumberOfFlag={setNumberOfFlag}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
