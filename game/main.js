const fruit = document.getElementById('fruit');
const bowl = document.getElementById('bowl');
const scoreSpan = document.getElementById('scoreSpan');
const speedSpan = document.getElementById('speedSpan');
const lifeSpan = document.getElementById('lifeSpan');

const fruits = ["💰","💸","💳","💷","💶","💵","💴","🪙"]

let fruitTop = 0
let fruitSide=45; 
let speed = 0.3;

let bowlSide = 45;

let score = 0;
let life = 5;
const smile = "🤑";

function moveFruit() { 
    // fruit.style.top = '100px'
    setInterval(() => {
        fruitTop += speed;
        fruit.style.top = `${fruitTop}%`;

        // console.log(fruit.style.top)
        if (fruitTop > 97) {
            
            // console.log(fruitSide)
            // console.log(bowlSide)

            if (Math.abs(fruitSide - bowlSide) < 5) { 
                // alert("Fruit caught!");
                score++;
                scoreSpan.innerHTML = score;
                life++;
                lifeSpan.innerHTML =smile.repeat(life);
                if (score % 5 === 0) {
                    speed += 0.05;
                    // speedSpan.innerHTML = speed;
                     life++;
                lifeSpan.innerHTML =smile.repeat(life);
                } 
            }
            fruitTop = 0
            fruitSide = Math.floor(Math.random() * 95)
            fruit.style.left = `${fruitSide}%`
            // alert('ss')
            life--;
            if (life < 0) gameOver();
            lifeSpan.innerHTML = smile.repeat(life);
            fruit.innerHTML =fruits[ Math.floor(Math.random() * fruits.length)]
        }

    },10)

}



function moveBowl() {

    document.addEventListener('keydown',(e)=>{
        // console.log(e.code);

         if (e.code === 'ArrowLeft' && bowlSide > 0) {
            bowlSide -= 1; // Move left
        } else if (e.code === 'ArrowRight' && bowlSide < 94) {
            bowlSide += 1; // Move right
        }
        bowl.style.left = `${bowlSide}%`;
    })
    
}

function gameOver() {
    alert('GAME OVER!');
    life = 5;
    lifeSpan.innerHTML =smile.repeat(life);
    fruitTop = 0
    speed = 0.3;

    bowlSide = 45;

    score = 0;
    scoreSpan.innerHTML = score;
}

moveFruit()

moveBowl()