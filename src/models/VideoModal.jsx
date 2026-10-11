/* eslint-disable prettier/prettier */
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { View, TouchableOpacity, StyleSheet, Text, Alert, Button } from 'react-native';
// import Modal from 'react-native-modal';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
// import YoutubePlayer from "react-native-youtube-iframe";

// const VideoModal = ({ visible, onClose, videoLink }) => {
//   const [playing, setPlaying] = useState(true);
//   const [videoId, setVideoId] = useState('')

//   const onStateChange = useCallback((state) => {

//     if (state === "ended") {
//       setPlaying(false);
//     }
//   }, []);

//   const getYoutubeVideoId = (url) => {
//     const regex =
//       /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|youtube\.be\/shorts\/)([^&?/]+)/;

//     const match = url?.match(regex);

//     return match ? match[1] : null;
//   };

//   useEffect(() => {
//     const id = getYoutubeVideoId(videoLink);
//     setVideoId(id)
//   }, videoLink)

//   console.log('video', videoId, videoLink);

//   return (
//     <Modal
//       isVisible={visible}
//       onBackdropPress={onClose}
//       onBackButtonPress={onClose}
//       style={styles.modal}
//       useNativeDriver>
//       <View style={styles.container}>
//         {/* Close Button */}
//         <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//           <Ionicons name="close" size={26} color="#fff" />
//         </TouchableOpacity>

//         <YoutubePlayer
//             height={300}
//             play={playing}
//             videoId={videoId}
//             onChangeState={onStateChange}
//           />

//       </View>
//     </Modal>
//   );
// };

// export default VideoModal;

// const styles = StyleSheet.create({
//   modal: {
//     flex: 1,
//     margin: 0,
//     justifyContent: 'center',
//   },
//   container: {
//     paddingHorizontal: 15,
//     backgroundColor: '#000',
//     height: "100%",
//     width: '100%',
//     paddingVertical: 20
//   },
//   closeBtn: {
//     alignItems: 'flex-end',
//     marginBottom: 10
//   },
// });
