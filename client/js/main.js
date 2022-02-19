
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
                let evalData = eval(screenValue);
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
            setTimeout(() => {
                screen.value = getDynamicResult(transcript);
            }, 1000);
        
          };
        
        // start recognition
        recognition.start();
        

    } else {
        alert("Speech recognition is not supported on your browser, You can type instead !!");
        // code to handle error
    }

});
  







// Evaluates the expression hidden in a sentence
function getDynamicResult(transcript) {

    let operator = "";
    let operands = [];
    let helpingOperator = "";

    // Breaking the input into array
    let result = transcript.split(" ");

    // Keywords
    let addOp = ["add", "added", "+", "addition", "sum", "summation", "total", "together", "plus", "adding", "increase"];
    let subOp = ["subtract", "subtracted", "-", "subtraction", "difference", "decrease", "reduction", "reduce", "minus", "subtracting"];
    let multOp = ["multiply", "multiple", "times", "multiplication", "multiplying", "*", "X", "x", "multiplied"];
    let divOp = ['divide', "division", "/", "fraction", "dividing", "divided", "part", "divisor", "dividend", "quotient"];
    let lcmOp = ["lcm", "lowest", "smallest", "LCM"];
    let hcfOp = ["hcf", "highest", "factor", "greatest", "gcd", "HCF", "GCD"];
    let helpKey = ["from", "and"];

    result.forEach(ele => {
        
        if (addOp.includes(ele)){
            operator = "+";
        }
        else if(subOp.includes(ele)){
            operator = "-";
        }
        else if (multOp.includes(ele)){
            operator = "*";
        }
        else if (divOp.includes(ele)){
            operator = "/";
        }
        else if(lcmOp.includes(ele)){
            operator = "lcm";
        }
        else if(hcfOp.includes(ele)){
            operator = "hcf";
        }
        else if(!(isNaN(ele))){
            operands.push(ele);
        }
        else if(helpKey.includes(ele)){
            helpingOperator = ele;
        }

    });



    if (operator === ""){
        return "No operator Specified";
    }

    if (operands.length > 2 && operands.length < 2){
        return "Invalid Operands";
    }

    if (helpingOperator === "from"){
        return eval(`${operands[1]} ${operator} ${operands[0]}`);
    }
    else{
        return eval(`${operands[0]} ${operator} ${operands[1]}`);
    }

}