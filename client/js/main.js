let screen= document.getElementById('screen');//inputting the value from the id screen(that is the input element)
buttons = document.querySelectorAll('button');
let screenValue='';
let speechbtn = document.getElementById('speechbtn');

for(item of buttons){
    item.addEventListener('click',(e)=>{
        buttonText= e.target.innerText;
        // console.log('Button Text Is', buttonText);
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

speechbtn.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.addEventListener('result',e=>{
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        screen.value = transcript;
    })
    if(speech == true){
        recognition.start();
    }
});