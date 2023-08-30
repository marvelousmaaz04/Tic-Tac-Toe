
let music = new Audio("music.mp3");
let ting = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let isGameOver = false;
let turn = "X";

const changeTurn = () => {
    return turn === "X"?"0":"X";
}

const checkWin = () => {
    let boxTexts = document.getElementsByClassName('boxText');// dont use query selector as it returns only one element that matches

    let wins = [
        [0,1,2, 2.5,5,0],
        [3,4,5, 2.5,15,0],
        [6,7,8, 2.5,25,0],
        [0,3,6, -7.5,15,90],
        [1,4,7, 2.5,15,90],
        [2,5,8, 12.5,15,90],
        [0,4,8, 2.5,15,45],
        [2,4,6, 2.5,15,135],
    ]

    wins.forEach((e) => {
        if(boxTexts[e[0]].innerText !== '' || boxTexts[e[1]].innerText !== '' || boxTexts[e[2]].innerText !== ''){
            if((boxTexts[e[0]].innerText == boxTexts[e[1]].innerText) && (boxTexts[e[1]].innerText == boxTexts[e[2]].innerText)){
                document.querySelector('.info').innerText = boxTexts[e[0]].innerText + " Wins!";
                isGameOver = true;

                // document.querySelector("img").style.width = "200px"; works

                // document.getElementsByTagName("img")[0].style.width = "200px"; works
                document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width = "200px";
                document.querySelector('.line').style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector('.line').style.width = "25vw";
                
                gameover.play();
            }
        }
    })
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxText");
    element.addEventListener("click", () => {
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();
            if(!isGameOver){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
            
        }
    })
})

reset.addEventListener('click', () => {
    let boxTexts = document.querySelectorAll(".boxText"); // remember dot for class because here we are using querySelector
    Array.from(boxTexts).forEach(e => {
        e.innerText = "";
    })
    turn = "X";
    isGameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width = "0px";
    document.querySelector('.line').style.width = "0";
})