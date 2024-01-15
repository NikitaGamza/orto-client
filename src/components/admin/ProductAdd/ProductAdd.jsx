import React, { useContext, useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import InputFile from '../../ui/InputFile/InputFile';
import useInputFile from '../../ui/InputFile/useInputFile';
import { getProductCategory } from '../../../api/category';
import { uploadFile } from '../../../api/product';
import { Store } from '../../../Store';
import { ActionTypes } from '../../../ActionTypes/ActionTypes';
import InputPrice from '../../ui/InputFile/InputPrice';
import { InputType } from '../../generator/InputTypes.enum';
import InputGenerator from '../../generator/InputGenerator';

const addProductFetch = async (body) => {
  const response = await fetch('/api/products/addproduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return await response.json();
};

export default function ProductAdd(props) {
  const { dispatch: ctxDispatch } = useContext(Store);
  const { visibleAdd, setVisibleAdd } = props;

  const [category, setCategory] = useState([]);

  const [priceList, setPriceList] = useState([{ price: 0, size: '' }]);

  const [product, setProduct] = useState({});

  const [files, setFiles, onRemoveFile, imageUrls, setImageUrls] =
    useInputFile();

  useEffect(() => {
    const handler = async () => {
      const { data } = await getProductCategory();
      setCategory(data);
    };
    handler();
  }, []);

  useEffect(() => {
    setProduct({
      ...product,
      prices: priceList.map((item) => ({ price: item.price, size: item.size })),
    });
  }, [priceList]);

  const addProduct = async () => {
    files.forEach(async (file, index) => {
      await uploadFile(
        file,
        `${product.nameProduct}-${product.articul}-${index}`
      );
    });
    const productClone = product;
    productClone.image = files.map(
      (item, index) =>
        `${productClone.nameProduct}-${productClone.articul}-${index}`
    );
    productClone.name = productClone.nameProduct;
    if (productClone.color) {
      productClone.color = productClone.color.split(',').map((i) => i.trim());
    }
    if (productClone.length) {
      productClone.length = productClone.length.split(',').map((i) => i.trim());
    }
    productClone.numReviews = 0;
    const body = JSON.stringify(productClone);
    await addProductFetch(body);
    setVisibleAdd(false);
    ctxDispatch({
      type: ActionTypes.UPDATE_LIST_START,
    });
    // localStorage.removeItem('cartItems');
    // ctxDispatch({ type: ActionTypes.CLEAR_CART });
  };

  const Inputs = [
    { title: 'Наименование', propName: 'nameProduct', type: InputType.text },
    { title: 'Ссылка', propName: 'slug', type: InputType.text },
    { title: 'Длинна', propName: 'length', type: InputType.text },
    { title: 'Артикул', propName: 'articul', type: InputType.text },
    { title: 'Производитель', propName: 'brand', type: InputType.text },
    { title: 'Цвет', propName: 'color', type: InputType.text },
    { title: 'Страна', propName: 'country', type: InputType.text },
    { title: 'Описание', propName: 'description', type: InputType.textarea },
  ];

  return (
    <ModalWindow isVisible={visibleAdd} setIsVisible={setVisibleAdd}>
      <div>
        <InputFile
          value={files}
          setFiles={setFiles}
          onRemove={onRemoveFile}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />
        <select
          onChange={(e) =>
            setProduct({ ...product, categoryId: e.target.value })
          }
        >
          {category &&
            category.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        {Inputs.map((input, index) => (
          <InputGenerator
            title={input.title}
            setter={setProduct}
            getter={product}
            product={product}
            propName={input.propName}
            type={input.type}
            key={index}
          />
        ))}
        <InputPrice priceList={priceList} setPriceList={setPriceList} />
        <button onClick={addProduct}>Добавить</button>
        <button onClick={() => setVisibleAdd(false)}>Отменить</button>
      </div>
    </ModalWindow>
  );
}
