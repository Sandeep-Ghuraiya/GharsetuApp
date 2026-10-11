/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';
import Sound from 'react-native-sound';

let ringtoneSound = null;
const soundFileName = Platform.OS === 'ios' ? 'ringtone.mp3' : 'ringtone';

export const playRingtone = () => {
  if (ringtoneSound) {
    // If already loaded, just play once
    ringtoneSound.play();
    return;
  }

  Sound.setCategory('Playback', true);

  ringtoneSound = new Sound(soundFileName, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Failed to load the sound', error);
      ringtoneSound = null;
      return;
    }

    // Play only once
    ringtoneSound.play(success => {
      if (!success) {
        console.error('Ringtone playback failed.');
      }
      // Release resources after playing
      ringtoneSound.release();
      ringtoneSound = null;
    });
  });
};

export const stopRingtone = () => {
  if (ringtoneSound) {
    ringtoneSound.stop(() => {
      console.log('Ringtone stopped.');
      ringtoneSound.release();
      ringtoneSound = null;
    });
  }
};
