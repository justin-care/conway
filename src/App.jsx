import { useState } from "react"
import GameBoard from "./GameBoard"
function App() {
    const [gameRunning, setGameRunning] = useState(false);
    const [gameState, setGameState] = useState([]);

    const clearBoard = () => {
        if(gameRunning){
            setGameRunning(false);
        }
        let temp = gameState.map(row => row.map(cell => ({ ...cell })));;
        for(let i = 0; i < temp.length; i++) {
            for(let j = 0; j < temp[i].length; j++) {
                temp[i][j].alive = false;
                temp[i][j].aliveNext = false;
                temp[i][j].deadNext = false;
            }
        }
        setGameState(temp);
    }

    //TODO: addin a inputs to change speed, and maybe a few preselected patterns

  return (
    <>
        <div className="flex flex-row items-center justify-between gap-4 my-4  ">
            <h1 className="text-3xl font-bold mt">Conway's Game of Life</h1>
            <button className={`text-xl rounded-md px-6 py-2 pb-3 ${gameRunning ? "bg-red-600" : "bg-green-600"} transition duration-150 `} onClick={() => setGameRunning(!gameRunning)}>{gameRunning ? "Stop" : "Start"}</button>
        </div>
        <GameBoard gameRunning={gameRunning} setGameRunning={setGameRunning} gameState={gameState} setGameState={setGameState} />
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <button className="text-xl rounded-md px-6 py-2 pb-3 bg-purple-500" onClick={clearBoard}>Reset Board</button>
        </div>
    </>
  )
}

export default App
