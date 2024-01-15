import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import './InputFile.scss';
import { forEach } from 'react-bootstrap/ElementChildren';
//use efeect image

export default function InputFile(props) {
  const { setFiles, onRemove, imageUrls, setImageUrls, files } = props;
  // useEffect(() => {
  //   setFiles(preparedImages)
  // }, [preparedImages]);

  const inputFileRef = useRef(null);

  const onChangeFileInput = (event) => {
    const files = event.target.files;
    // файлы сейчас норм преобразуются, поправь их под то как их ждет бек и все
    console.log(files);
    console.log(imageUrls);
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      setFiles((prevValue) => [...prevValue, file]);

      const url = URL.createObjectURL(file);
      setImageUrls((prevValue) => [...prevValue, url]);
    }
  };
  let preparedImages = [];

  imageUrls.forEach((el) => {
    if (el.includes('blob')) {
      preparedImages.push(el);
    } else {
      preparedImages.push(
        `http://localhost:5000/static/images/products/${el}.jpg`
      );
    }
  });
  console.log(preparedImages);

  const onRemoveExtended = (e, index) => {
    const urlsClone = imageUrls;
    urlsClone.splice(index, 1);
    setImageUrls(urlsClone);

    onRemove(e, index);
  };

  return (
    <>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Картинки</Form.Label>
        <button
          onClick={() => {
            inputFileRef.current.value = '';
            inputFileRef.current.click();
          }}
        >
          +
        </button>
        <input
          ref={inputFileRef}
          style={{ display: 'none' }}
          type="file"
          multiple
          onChange={onChangeFileInput}
        />
      </Form.Group>

      <div className={'added-image'}>
        {preparedImages.map((url, index) => (
          <div className="added-image-container" key={index}>
            <img src={url} alt={'*'} />

            <div>
              <button onClick={(e) => onRemoveExtended(e, index)}>x</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
