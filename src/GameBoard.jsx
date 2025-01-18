import { use } from "react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
const GameBoard = ({ gameRunning, setGameRunning, gameState, setGameState }) => {
    const boardRef = useRef(null);
    const intervalRef = useRef(null);
    const gameStateRef = useRef(null);
    const minCellSize = 25;
    const [colSize, setColSize] = useState(0);
    const [rowSize, setRowSize] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(100);
    const [cellWidth, setCellWidth] = useState({});
    const [cellHeight, setCellHeight] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const draggingRef = useRef(new Set());

    useLayoutEffect(() => {
        const w = boardRef.current.offsetWidth;
        const h = boardRef.current.offsetHeight;
        setColSize(Math.floor(w / minCellSize));
        setRowSize(Math.floor(h / minCellSize));
    },[]);

    useEffect(() => {
        gameStateRef.current = gameState;
    },[gameState]);

    useEffect(() => {
        const handleOutsideMouseUp = () => setIsDragging(false);
        document.addEventListener('mouseup', handleOutsideMouseUp);
        return () => document.removeEventListener('mouseup', handleOutsideMouseUp);
    },[]);

    useEffect(() => {
        if(gameRunning) {
            intervalRef.current = setInterval(() => {
                checkBoardState();
            }, gameSpeed);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    },[gameRunning, gameSpeed]);

    useLayoutEffect(() => {
        function updateSize() {
            const w = boardRef.current.offsetWidth;
            const h = boardRef.current.offsetHeight;
            const newColSize = Math.floor(w / minCellSize);
            const newRowSize = Math.floor(h / minCellSize);
            const squareSize = Math.min(w / newColSize, h / newRowSize);

            setColSize(newColSize);
            setRowSize(newRowSize);
            setGameRunning(false);
            setCellWidth({width:`${squareSize}px`});
            setCellHeight({'minHeight':`${squareSize}px`});
            let temp = [];
            for(let i = 0; i < newRowSize; i++) {
                temp.push([]);
                for(let j = 0; j < newColSize; j++) {
                    temp[i].push({
                        row: i,
                        col: j
                    });
                }
            }
            setGameState(temp);
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const countLiveNeighbors = (grid, x, y) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [ 0, -1],         [ 0, 1],
            [ 1, -1], [ 1, 0], [ 1, 1],
        ];
        return directions.reduce((count, [dx, dy]) => {
            const newRow = x + dx;
            const newCol = y + dy;
            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                count += grid[newRow][newCol].alive ? 1 : 0;
            }
            return count;
        }, 0);
    };

    const checkBoardState = () => {
        setGameState(prevState => {
            let nextState = gameStateRef.current.map(row => row.map(cell => ({ ...cell })));
    
            for (let i = 0; i < gameStateRef.current.length; i++) {
                for (let j = 0; j < gameStateRef.current[i].length; j++) {
                    const aliveNeighbors = countLiveNeighbors(gameStateRef.current, i, j);
        
                    if (gameStateRef.current[i][j].alive) {
                        // Apply rules for live cells
                        nextState[i][j].alive = !(aliveNeighbors < 2 || aliveNeighbors > 3);
                    } else {
                        // Apply rules for dead cells
                        nextState[i][j].alive = aliveNeighbors === 3;
                    }
                }
            }
    
            return nextState;
        })
    };
    
    //TODO: Add Touch support

    const handleMouseDown = (e, i, j) => {
        e.preventDefault();
        setIsDragging(true);
        draggingRef.current = new Set();
        const cellKey = `${i}-${j}`;
        draggingRef.current.add(cellKey);
        toggleCell(i, j);
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    const handleMouseMove = (e, i, j) => {
        
        e.preventDefault();
        if(isDragging){
            const cellKey = `${i}-${j}`;
            if (!draggingRef.current.has(cellKey)) {
                draggingRef.current.add(cellKey);
                toggleCell(i, j);
            }
        }
    }

    const toggleCell = (i, j) => {
        setGameState(prevState => {
            const newState = prevState.map(row => row.map(cell => ({ ...cell })));
            newState[i][j].alive = !newState[i][j].alive;
            return newState;
        })
    }



    return (
        <div className="container xsm:w-full md:w-3/4 xsm:h-full md:h-4/5 rounded-md flex flex-col justify-start mb-4" ref={boardRef}>
            {
                gameState.map((row, i) => {
                    return (
                        <div key={i} className={`flex flex-row w-full justify-start`} style={cellHeight}>
                            {
                                row.map((cell, j) => {
                                    return (
                                        <div key={j} className={`h-full ${cell.alive ? 'bg-green-700' : 'bg-slate-800'} cursor-pointer rounded-sm ${gameRunning ? 'pointer-events-none': ''} ${(!gameRunning && !cell.alive) ? 'hover:bg-blue-700': ''}`}   onMouseDown={(e) => handleMouseDown(e, i,j)} onMouseUp={(e) => handleMouseUp()} onMouseMove={(e) => handleMouseMove(e, i,j)} style={cellWidth}></div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GameBoard;