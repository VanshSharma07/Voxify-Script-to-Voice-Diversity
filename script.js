const speakButton = document.getElementById('speak-btn');
const textArea = document.getElementById('text-to-speech');
const voiceSelect = document.getElementById('voice-select');
const downloadButton = document.getElementById('download-btn');

// Function to populate voice options
function populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Function to speak the text
function speakText() {
    const text = textArea.value.trim();
    if (text.length === 0) {
        alert('Please enter some text!');
        return;
    }
    
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const voices = speechSynthesis.getVoices();
    for (const voice of voices) {
        if (voice.name === selectedVoice) {
            utterance.voice = voice;
            break;
        }
    }
    
    // Speak the text
    speechSynthesis.speak(utterance);
}

// Function to download the audio
function downloadAudio() {
    const text = textArea.value.trim();
    if (text.length === 0) {
        alert('Please enter some text to download audio!');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const voices = speechSynthesis.getVoices();
    for (const voice of voices) {
        if (voice.name === selectedVoice) {
            utterance.voice = voice;
            break;
        }
    }

    const blob = new Blob([text], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-to-speech.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
speakButton.addEventListener('click', speakText);
downloadButton.addEventListener('click', downloadAudio);
