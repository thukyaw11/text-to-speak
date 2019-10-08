const synth = window.speechSynthesis; //SpeechSynth API



//DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const button = document.querySelector('button');
console.log(button);

let voices = []; //voice array
const gettVoices = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '('+ voice.lang +')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.append(option);
    })

};
gettVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = gettVoices;
}

//speak
const speak = () =>{
    if(textInput.value !== ''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        speakText.onend = e => {
            console.log('Done speaking');
        }
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
            synth.speak(speakText);
    }

};

//EVENT LISTENERS
textForm.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});
 //rate value change
 rate.addEventListener('change', e => rateValue.textContent= rate.value);

 pitch.addEventListener('change', e => pitchValue.textContent= pitch.value);
 //voice select change
 voiceSelect.addEventListener('change', e => speak());
 button.addEventListener('click', e => speak());