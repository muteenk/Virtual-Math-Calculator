
// --------------- Getting Elements -------------------

// Calculator Screen 
let screen= document.getElementById('screen');

// Calculator Buttons 
buttons = document.querySelectorAll('button');

// Speech Button
let speechbtn = document.getElementById('speechbtn');






// ----------------- Basic Calculator Code ------------------

// Value to Show on Screen
let screenValue='';

// Working of UI buttons of Calculator
for(item of buttons){

    item.addEventListener('click',(e)=>{
        buttonText= e.target.innerText;
        
        if(buttonText=='x'){
            buttonText='*';
            screenValue+=buttonText;
            screen.value=screenValue;
        }
        else if(buttonText=='C'){
            screenValue=""
            screen.value=screenValue;
        }
        else if(buttonText=='='){
            screen.value=eval(screenValue);
        }
        else if(buttonText == 'mic'){
            screenValue="Listening....";
            screen.value=screenValue;
        }
        else{
            screenValue+=buttonText;
            screen.value=screenValue;
        }
    })
}




// --------------- Speech Recognition ----------------

speechbtn.addEventListener('click', function () {
    
    

    // new speech recognition object
    var SpeechRecognition =  window.speechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition || window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {

        const recognition = new SpeechRecognition();
      
        // This will run when the speech recognition service returns a result
        recognition.onstart = function() {
          console.log("Voice recognition started. Try speaking into the microphone.");

        };
        
        // Result Event
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            screen.value = transcript;
          };
        
        // start recognition
        recognition.start();
        

    } else {
        alert("Speech recognition is not supported on your browser, You can type instead !!");
        // code to handle error
    }

});
  