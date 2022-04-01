const resetBtn = document.getElementById('reset')
const textUpdate = document.getElementById('update')


//Create the UI boxes on screen
const createBoxes = (() => {
    const boxContainer = document.getElementById('box-container')

    for(let i = 0; i < 9; i++){
        const sqaure = document.createElement('div')
        sqaure.classList.add('box')
    
        boxContainer.appendChild(sqaure)
       
    }

   
})()

//Create players
const player = (name, symbol) =>{
    return {name,symbol}
}

const playerX = player('Player X', 'X')
const playerO = player('Player O', 'O')

let currentPlayer = playerX.symbol

let gameBoard = ['','','','','','','','','']
let gameActive = true


const boxes = document.querySelectorAll('.box')


boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        playerMove(box, index)
        
    })
})


const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//monitor moves of player
const playerMove = (box, index) => {
    if(boxValid(box) && gameActive){
        box.innerText = currentPlayer
        box.classList.add('taken')
        updateBoard(index)
        resultValidation()
       
  }
    
}
//does current box contain a symbol
const boxValid = (box) => {
    if(box.innerText === playerX.symbol || box.innerText === playerO.symbol){
        textUpdate.innerText = 'Invalid Move!!'
        textUpdate.style.color = 'red'
        return false
    }
   
    return true
}

const updateBoard = (index) => {
    gameBoard[index] = currentPlayer
}
//check results
const resultValidation = () =>{
    let roundWon = false
    for(let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i]
        const a = gameBoard[winCondition[0]]
        const b = gameBoard[winCondition[1]]
        const c = gameBoard[winCondition[2]]
        if(a === '' || b === '' || c === ''){
            continue
        }
        if(a === b && b === c){
            roundWon = true
            break
        }
    }
   
    if(roundWon){
        textUpdate.innerText = `Player ${currentPlayer} has won`
        textUpdate.style.color = 'green'
        setTimeout(()=>{confettiFalling()},200)
        gameActive = false
        return
    }

    if(!gameBoard.includes('')){
        textUpdate.innerText = `It's a tie`
        textUpdate.style.color = '#5f4b8bff'
   }
   changePlayer()
   textUpdate.innerText = `${currentPlayer}'s move`
   textUpdate.style.color = '#5b84b1ff'
}

const changePlayer = () => {
    currentPlayer = currentPlayer === playerX.symbol ? playerO.symbol:playerX.symbol
}


//resets the board for a new round of play
const resetBoard = () =>{
    gameBoard = ['','','','','','','','','']
    gameActive = true
    
    if(currentPlayer === playerO.symbol){
        changePlayer()
        
    }

    boxes.forEach(box => {
        box.innerText = ''
        box.classList.remove('taken')
    })

    textUpdate.innerText = 'Play Game'
    textUpdate.style.color = '#5b84b1ff'
   
}

resetBtn.addEventListener('click', resetBoard)

//Adds a confetti falling effect when someone wins

const confettiFalling = () => {
    const container = document.querySelector('.container')
    const colors = ['red','green', 'blue', 'yellow','orange','pink', 'purple']

    for(let i = 0; i < 1000; i++){
        let div = document.createElement('div')
        div.classList.add('confetti')

        container.appendChild(div)
    }

    const confetti = document.querySelectorAll('.confetti')

    for(let i = 0; i <confetti.length; i++){
        let size = Math.random()*0.01*[i]

        confetti[i].style.width = 5 + size +'px'
        confetti[i].style.height = 16 + size +'px'
        confetti[i].style.left = Math.random() * innerWidth +'px'

        let background = colors[Math.floor(Math.random() * colors.length)]
        confetti[i].style.background = background

        container.children[i].style.transform = 'rotate(' + size*[i] +'deg)'
    }

    
}

