//  Initialize Speech API
const synth = window.speechSynthesis;

// Grab DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#audio_rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#audio_pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const speech = document.querySelector('#speech');

// Initiate the voices array
let voices = [];

function getVoices(){
    voices = synth.getVoices();
   
    // Loop through each voice and create an option
    voices.forEach(voice =>{
        // Create an option element
        const option = document.createElement('option');

        // Fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        // Set needed attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
   
    // Checks if speaking
    if(synth.speaking){
        console.error('A speech is in progress...');
        return;
    }

    if(textInput.value !== ''){

        // Add background animation
        speech.innerText = 'Speaking...';
    
        // Get speech text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

         // Speech End
        speakText.onend = e => {
            console.log('Done speaking...');
            speech.innerText = '';
        }
    
        // Speech Error
        speakText.onerror = e => {
            console.error('Error converting text to speech!');
        }

        // Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
          ); 

        // Loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }   
};

// ******************** EVENT LISTENERS ******************************

// Text Form submit
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice selects change
voiceSelect.addEventListener('change', e => speak());