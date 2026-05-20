let sharedAudioContext = null;

const SUCCESS_CHIME_NOTES = [440, 880];
const NOTE_DURATION_SECONDS = 0.09;
const NOTE_STAGGER_SECONDS = 0.08;
const MASTER_GAIN = 0.045;

const getAudioContext = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    sharedAudioContext = new AudioContextClass();
  }

  return sharedAudioContext;
};

export const playTransferSuccessChime = () => {
  const audioContext = getAudioContext();

  if (!audioContext) {
    return;
  }

  const playChime = () => {
    const startAt = audioContext.currentTime + 0.01;

    SUCCESS_CHIME_NOTES.forEach((frequency, index) => {
      const noteStartAt = startAt + index * NOTE_STAGGER_SECONDS;
      const noteEndsAt = noteStartAt + NOTE_DURATION_SECONDS;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, noteStartAt);

      gainNode.gain.setValueAtTime(0.0001, noteStartAt);
      gainNode.gain.exponentialRampToValueAtTime(
        MASTER_GAIN,
        noteStartAt + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEndsAt);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(noteStartAt);
      oscillator.stop(noteEndsAt);
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
        oscillator.onended = null;
      };
    });
  };

  if (audioContext.state === 'suspended') {
    audioContext
      .resume()
      .then(playChime)
      .catch(() => undefined);

    return;
  }

  playChime();
};
