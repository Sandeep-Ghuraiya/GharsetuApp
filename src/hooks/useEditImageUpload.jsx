/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

const useEditImageUpload = initialImages => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

  // Effect to initialize selectedImages from the parent component
  useEffect(() => {
    setSelectedImages(initialImages || []); // Ensure initialImages is not undefined
  }, [initialImages]);

  // Effect to convert selectedImages to Base64 whenever they change
  useEffect(() => {
    const convertToBase64 = async () => {
      const promises = selectedImages.map(async imageUrl => {
        try {
          // Create a temporary file path where the image will be downloaded
          const tempFilePath = `${RNFS.CachesDirectoryPath}/${imageUrl
            .split('/')
            .pop()}`;

          // Download the image file to the temporary path
          const downloadResult = await RNFS.downloadFile({
            fromUrl: imageUrl,
            toFile: tempFilePath,
          }).promise;

          // Read the file as Base64
          const base64String = await RNFS.readFile(tempFilePath, 'base64');

          return `data:image/png;base64,${base64String}`; // Ensure the base64 format is prefixed
        } catch (error) {
          console.error('Error downloading or converting image:', error);
          return null; // In case of an error, return null for that image
        }
      });

      try {
        const base64Array = await Promise.all(promises);
        setBase64Images(base64Array.filter(Boolean)); // Filter out any null values in case of errors
      } catch (error) {
        console.error('Error converting images to Base64:', error);
      }
    };

    if (selectedImages?.length > 0) {
      convertToBase64();
    } else {
      setBase64Images([]); // Clear base64 images if no images are selected
    }
  }, [selectedImages]);

  return {base64Images};
};

export default useEditImageUpload;
