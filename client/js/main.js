
// --------------- Getting Elements -------------------

// Calculator Screen 
let screen= document.getElementById('screen');

// Calculator Buttons 
let buttons = document.querySelectorAll('button');

// Speech Button
let speechbtn = document.getElementById('speechbtn');






// ----------------- Basic Calculator Code ------------------

// Value to Show on Screen
let screenValue='';

// Working of UI buttons of Calculator
for(item of buttons){

    item.addEventListener('click',(e)=>{
        buttonText= e.target.innerText;
        

        switch (buttonText) {
            case 'x':
                buttonText='*';
                screenValue+=buttonText;
                break;

            case 'C':
                screenValue="";
                break;

            case '=':
                evalData = eval(screenValue);
                screenValue = (evalData !== undefined) ? evalData : getDynamicResult(screenValue);
                break;

            case 'mic':
                screenValue="Listening....";
                break;
        
            default:
                screenValue+=buttonText;
                break;
        }

        screen.value=screenValue;
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
            // getDynamicResult(transcript);
            // const result = await response;
            // console.log(response);
          };
        
        // start recognition
        recognition.start();
        

    } else {
        alert("Speech recognition is not supported on your browser, You can type instead !!");
        // code to handle error
    }

});
  







// Evaluates the expression hidden in a sentence
async function getDynamicResult(transcript) {
    const response = await fetch(`http://127.0.0.1:8000/calculate`, {
     
        // Adding method type
        method: "POST",
         
        // Adding body or contents to send
        body: transcript,
         
        // Adding headers to the request
        headers: {
            "Content-type": "text/plain"
        }
    });

    const result = await response.text();
    console.log(result);

    // console.log(response);
}