

const words = ["FAIRY", "CROWN", "TRIED", "TOMBS"]

const arr = words[Math.floor(Math.random() * words.length)].split("");
console.log(arr)
let input = [];
const result = document.querySelectorAll('#result');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('#keys');
const score = document.querySelector('.settings > span');
const incorrectElem = document.querySelector('.incorrect-words');

let resultIndex = 0;
let guesses = [[]];
let currentGuess = 0;
let position = 0;
let positionTracker = [];
let incorrectGuesses = [];
let myArr = []
const settings = {
    score: 0
}


function createElemet(myGuesses, originalWord, inputWord) {
  const wrongIcon = 
  `<svg color='red' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
  </svg>`
const correctIcon = `<svg color='green' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`
  console.log(originalWord, inputWord)
    const elem = document.createElement('p');

  if(originalWord !== inputWord) {
    const txt = document.createTextNode(wrongIcon + " " +  myGuesses);
    elem.innerHTML = txt.textContent;
  } else {
    const txt = document.createTextNode(correctIcon + " " +  myGuesses);
    elem.innerHTML = txt.textContent;
  }
 

      return incorrectElem.appendChild(elem)
}





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
  
  
   guesses[currentGuess].forEach((guess, i) => {
      result[position - 1].innerHTML = guess;
     
      if ( letter === 'ENTER' && positionTracker.length === 5 ) {  
         if ( arr[i] === guesses[currentGuess][i] ) {
          const props = { index: positionTracker[i], bgColor: '#6BAA65', color: '#fff', txt: guess, position:  i === 4 ? 4 : i   };
          addColorToBoard(props);     

          } else if( arr.includes( guesses[currentGuess][i] ) && arr[i] !== guesses[currentGuess][i] ) {
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
     removeMouseEvent(originalWord, inputWord)
     removeKeyEvent(originalWord, inputWord);
  

     originalWord === inputWord ? setTimeout(() => {
      alert('You guessed it right!')
      settings.score += 5;
      score.innerHTML = settings.score
          }, 2500) : ""
        console.log(position)

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
   
     removeMouseEvent(originalWord, inputWord);
     removeKeyEvent(originalWord, inputWord);
 
     originalWord === inputWord ? setTimeout(() => {
            alert('You guessed it right!')
            settings.score += 5;
            score.innerHTML = settings.score
     }, 2500) : ""
  const myGuesses =  input.join('');

   input = [];
   guesses.push([]);
   currentGuess++;
   positionTracker = [];
   createElemet(myGuesses, originalWord, inputWord)
}
}



const removeMouseEvent = (word, guess) => {
     
   keys.forEach(key => {
  
    if(word === guess) 
   
       {
        key.removeEventListener('click', startGame);
       }
  });
}

const removeKeyEvent = (word, guess) => {
   word === guess ? window.removeEventListener('keydown', startWithKeyboard) : ''
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



