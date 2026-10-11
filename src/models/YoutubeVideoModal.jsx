import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Ionicons} from '@react-native-vector-icons/ionicons';

const YouTubeVideoModal = ({visible, onClose, videoId = 'dQw4w9WgXcQ'}) => {
  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(true); // loop video
    }
  }, []);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      useNativeDriver>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        {/* YouTube Player */}
        <YoutubePlayer
          height={220}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
        />

        {/* Play / Pause Button */}
        <TouchableOpacity
          style={styles.playPauseBtn}
          onPress={() => setPlaying(prev => !prev)}>
          <Ionicons name={playing ? 'pause' : 'play'} size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default YouTubeVideoModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#000',
    paddingVertical: 20,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
    zIndex: 10,
  },
  playPauseBtn: {
    marginTop: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 25,
  },
});
