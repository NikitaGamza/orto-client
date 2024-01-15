import { useState } from 'react';

const useInputFile = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const onRemoveFile = (e, index) => {
    e.preventDefault();
    const filesClone = [...files];
    filesClone.splice(index, 1);
    setFiles(filesClone);
  };

  return [files, setFiles, onRemoveFile, imageUrls, setImageUrls];
};

export default useInputFile;
