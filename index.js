
// Simple words to be guessed...

const words = ["FAIRY", "CROWN", "TRIED", "TOMBS"]

// Global Variables....
let arr = words[Math.floor(Math.random() * words.length)].split("");
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


  // Normal with Click
  const startGame = (e) => {
    const letter = e.target.innerText;
    // Check wether the click is a alphabat if not we return...
    if (/^[a-zA-Z]$/.test(letter)) {
      if(positionTracker.length === 5) return;
      input.push(letter);
      guesses[currentGuess].push(letter);
      position++;
      positionTracker.push(position - 1);
      console.log(position, positionTracker)
   }
   
   // To cut a part of alphabat from the game area...
   if ( letter === 'BACKSPACE' && positionTracker.length !== 0 ) {
    positionTracker.pop();
    position--;
    guesses[currentGuess].pop();
    result[position].innerHTML = '';
    input.pop();
  } 
  
  
  // Simply find which letter in the box is correct...
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
  
   // End here...
   if( letter === 'ENTER' && positionTracker.length === 5 ) {
    const originalWord = arr.join('');
    const inputWord = input.join('');
    const correctWord = arr.join('');
    removeMouseEvent(originalWord, inputWord, position, correctWord);
    removeKeyEvent(originalWord, inputWord, position, correctWord);
    
    // Append the guessed Words...
    const wordsGuessed = document.querySelector('.words-guessed');
    const newWord = document.createElement('p');
    if(originalWord === inputWord) {
      newWord.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" color="green" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
    </svg>
      ${inputWord}
      `
    }
    newWord.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" color="red" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
    ${inputWord}`;

    wordsGuessed.appendChild(newWord)

    input = [];
    guesses.push([]);
    currentGuess++;
    positionTracker = [];
   };
  }



// Start with Key Events
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
  
      const wordsGuessed = document.querySelector('.words-guessed');
      const newWord = document.createElement('p');
      if(originalWord === inputWord) {
        newWord.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" color="green" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
      </svg>
        ${inputWord}
        `
      }
      newWord.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" color="red" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
      ${inputWord}`;
      wordsGuessed.appendChild(newWord)
     removeMouseEvent(originalWord, inputWord, position, correctWord);
     removeKeyEvent(originalWord, inputWord, position, correctWord);
   input = [];
   guesses.push([]);
   currentGuess++;
   positionTracker = [];
}
}


// Remove Event when the word is guessed or when all tries are taken...
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
       } else if(word !== guess && position !== 25) {
        key.removeEventListener('click', startGame)
        setTimeout(() => {
          key.addEventListener('click', startGame)
        }, 3000)
      }
  });
}


// Remove Key Event simultaneously.... for same conditions...
const removeKeyEvent = (word, guess, position, correctWord) => {
  if(word === guess) {
    window.removeEventListener('keydown', startWithKeyboard);
   setTimeout(() => {
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
   }, 3000)
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

  }  else if(word !== guess && position !== 25) {
    window.removeEventListener('keydown', startWithKeyboard)
    setTimeout(() => {
      window.addEventListener('keydown', startWithKeyboard)
    }, 3000)
  }
}



// Add the Colors and other properties like styling when the user clicks Enter to guess his word....
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


// Add animation simultaneously....
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



// Simply listen for key events on the window......
window.addEventListener('keydown', startWithKeyboard);


// Listen for mouse click events on the keyboard...
keys.forEach(key => {
  key.addEventListener('click', startGame);
});


// Display the side_bar with its properites.....
document.querySelector('.settings').addEventListener('click', () => {
  const sidebar =   document.querySelector('.side_bar');
    if(sidebar.classList.contains('open_sidebar')) {
      sidebar.classList.remove('open_sidebar');
    } else {
      sidebar.classList.add('open_sidebar');
    }  
})

