import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

const VoiceSearchButton = ({ onCityDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const startListening = () => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Voice search not supported in your browser. Use Chrome or Edge.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US'; // Supports English city names; can change to 'ur-PK' for Urdu

    recognitionInstance.onstart = () => {
      setIsListening(true);
      toast.success('Listening... speak city name');
    };

    recognitionInstance.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      const cityName = spokenText.trim();
      if (cityName) {
        onCityDetected(cityName);
        toast.success(`Searching: ${cityName}`);
      } else {
        toast.error('Could not understand. Please try again.');
      }
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow microphone.');
      } else if (event.error === 'no-speech') {
        toast.error('No speech detected. Please try again.');
      } else {
        toast.error('Voice recognition failed. Please try typing.');
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    recognitionInstance.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      className={`p-2 rounded-full glass hover:bg-white/20 transition ${
        isListening ? 'bg-red-500/50 animate-pulse' : ''
      }`}
      title="Voice search city"
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};

export default VoiceSearchButton;