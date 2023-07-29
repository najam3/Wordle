

const words = ["FAIRY", "CROWN", "TRIED", "TOMBS"]

const arr = words[Math.floor(Math.random() * words.length)].split("");
console.log(arr)
let input = [];
const result = document.querySelectorAll('#result');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('#keys');
let resultIndex = 0;
let guesses = [[]];
let currentGuess = 0;
let position = 0;
let positionTracker = [];
let myArr = []

  const startGame = (e) => {
    const letter = e.target.innerText;
    
    if (/^[a-zA-Z]$/.test(letter)) {
      if(positionTracker.length === 5) return;
      input.push(letter);
      guesses[currentGuess].push(letter);
      position++;
      positionTracker.push(position - 1);
      console.log(position, positionTracker)
   }
   
   if ( letter === 'BACKSPACE' && positionTracker.length !== 0 ) {
    positionTracker.pop();
    position--;
    guesses[currentGuess].pop();
    result[position].innerHTML = '';
    input.pop();
  } 
  
  
   guesses[currentGuess].forEach(  (guess, i) => {
      result[position - 1].innerHTML = guess;
      if ( letter === 'ENTER' && positionTracker.length === 5 ) {  
         if ( arr[i] === guesses[currentGuess][i] ) {
          const props = { index: positionTracker[i], bgColor: '#6BAA65', color: '#fff', txt: guess, position:  i === 4 ? 4 : i   };
           addColorToBoard(props);     
          
          } else if( arr.includes(guesses[currentGuess][i] ) && arr[i] !== guesses[currentGuess][i] ) {
            const props = { index: positionTracker[i], bgColor:  '#CAB459', color: '#fff', txt: guess, position:  i === 4 ? 4 : i  }; 
            addColorToBoard(props);  
          } 
          else {
            const props = { index: positionTracker[i], bgColor:  '#777C7F', color: '#fff', txt: guess, position: i === 4 ? 4 : i  };
            addColorToBoard(props);
          }
      }
   });
  
  
   if( letter === 'ENTER' && positionTracker.length === 5 ) {
    const originalWord = arr.join('');
    const inputWord = input.join('');
    const correctWord = arr.join('');
    removeMouseEvent(originalWord, inputWord, position, correctWord);
    removeKeyEvent(originalWord, inputWord, position, correctWord);

    input = [];
    guesses.push([]);
    currentGuess++;
    positionTracker = [];
   };
  }




const startWithKeyboard = ({key}) => {
  const letter = key.toUpperCase();

 if (/^[a-zA-Z]$/.test(letter)) {
   if(positionTracker.length === 5) return;
   input.push(letter);
   guesses[currentGuess].push(letter);
   position++;
   positionTracker.push(position - 1);
}



if ( letter === 'BACKSPACE' && positionTracker.length !== 0 ) {
 positionTracker.pop();
 position--;
 guesses[currentGuess].pop();
 result[position].innerHTML = '';
 input.pop();
} 


 arr.filter((word) => {
  word === input
 })
guesses[currentGuess].forEach((guess, i) => {
  result[position - 1].innerHTML = guess;
   addAnimation(letter);
   
   if ( letter === 'ENTER' && positionTracker.length === 5 ) {  
  
    if ( arr[i] === guesses[currentGuess][i] ) {
     const props = { index: positionTracker[i], bgColor: '#6BAA65', color: '#fff', txt: guess, position:  i === 4 ? 4 : i   };
     addColorToBoard(props);     
    }

    else if( arr.includes(guesses[currentGuess][i]) && arr[i] !== guesses[currentGuess][i]  ) {
      let a  = guesses[currentGuess].filter(word => word === arr[i]);
      
      const props = { index: positionTracker[i], bgColor:  '#CAB459', color: '#fff', txt: guess, position:  i === 4 ? 4 : i  }; 
      addColorToBoard(props);  
     }

     else {
      const props = { index: positionTracker[i], bgColor:  '#777C7F', color: '#fff', txt: guess, position: i === 4 ? 4 : i  };
      addColorToBoard(props);
     }
 }
});

if( letter === 'ENTER' && positionTracker.length === 5 ) {
  const originalWord = arr.join('');
  const inputWord = input.join('');
    const correctWord = arr.join('');
     removeMouseEvent(originalWord, inputWord, position, correctWord);
     removeKeyEvent(originalWord, inputWord, position, correctWord);
   
   input = [];
   guesses.push([]);
   currentGuess++;
   positionTracker = [];
}
}



const removeMouseEvent = (word, guess, position, correctWord) => {
     
   keys.forEach(key => {
  
    if(word === guess) 
   
       {
        key.removeEventListener('click', startGame);
        document.body.innerHTML = `
        <div class="win-ui">
        <div>
            <h1>You've Won!</h1>
            <p> You completed in ${position / 5} tries</p>
            <div class="append-words"></div>
            <video muted loop autoplay>
                <source src="./animation_lko317f1.mp4" type="video/mp4">
            </video>
        </div>
  
    </div>
        `
       } else if(position === 25 && word !== guess) {
        `
      <div class="win-ui">
        <div>
            <h1>You've Lost!</h1>
            <p>Your word is ${correctWord}</p>
            <video autoplay mute loop>
            <source src="./animation_lko4tnnv.mp4" type='video/mp4'>
            </video>
        </div>
    </div>
        `
       }
  });
}

const removeKeyEvent = (word, guess, position, correctWord) => {
  if(word === guess) {
    window.removeEventListener('keydown', startWithKeyboard);
    document.body.innerHTML = `
      <div class="win-ui">
      <div>
          <h1>You've Won!</h1>
          <p> You completed in ${position / 5} tries</p>
          <div class="append-words"></div>
          <video muted loop autoplay>
              <source src="./animation_lko317f1.mp4" type="video/mp4">
          </video>
      </div>

  </div>
      `
  } else if(position === 25 && word !== guess) {
    window.removeEventListener('keydown', startWithKeyboard);
    document.body.innerHTML = `
    <div class="win-ui">
    <div>
        <h1>You've Lost!</h1>
        <p>Your word is ${correctWord}</p>
        <video autoplay mute loop>
        <source src="./animation_lko4tnnv.mp4" type='video/mp4'>
        </video>
    </div>
</div>
    `

  }

  //  word === guess ? window.removeEventListener('keydown', startWithKeyboard) : ''

}




const addColorToBoard = (color) => {
  
setTimeout(() => {
   
     result[color.index].parentElement.style.backgroundColor = color.bgColor;
     result[color.index].style.color = color.color;
     result[color.index].innerText = color.txt;
     result[color.index].parentElement.classList.add('rotate');    
     result[color.index].style.opacity = '0';
     setTimeout(() => {
       result[color.index].style.opacity = '1';
     }, 500);
   
   }, color.position  * 400);



    


   keys.forEach((key) => {
    if(key.innerText === color.txt) {
      key.style.color = '#fff'
      key.style.backgroundColor = color.bgColor   
    } else {
      return;
    }
  })

}

const addAnimation = (letter) => {
  keys.forEach(key => {
    if(key.innerText === letter) {
      key.classList.add('effect');
      setTimeout(() => {
       key.classList.remove('effect');
      }, 200);
    } 
 })
};




window.addEventListener('keydown', startWithKeyboard);
keys.forEach(key => {
  key.addEventListener('click', startGame);
});



