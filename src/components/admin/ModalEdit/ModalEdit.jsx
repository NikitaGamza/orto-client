import React, { useContext, useEffect, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Store } from '../../../Store';
import { ActionTypes } from '../../../ActionTypes/ActionTypes';
import InputFile from '../../ui/InputFile/InputFile';
import useInputFile from '../../ui/InputFile/useInputFile';
import InputPrice from '../../ui/InputFile/InputPrice';
import { getProductCategory } from '../../../api/category.js';
import InputGenerator from '../../generator/InputGenerator';
import { InputType } from '../../generator/InputTypes.enum';
import { uploadFile } from '../../../api/product';

export default function ModalEdit(props) {
  const { setIsModalVisible } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isVisible, setIsVisible] = useState(true);
  const [category, setCategory] = useState();
  const [files, setFiles, onRemoveFile, imageUrls, setImageUrls] =
    useInputFile();
  const getIsVisibleEditModal = () => state.product.isVisibleEditModal;

  const onCloseModal = () => {
    const action = {
      type: ActionTypes.TOGGLE_EDIT_MODAL,
      payload: state.product.isVisibleEditModal,
    };
    ctxDispatch(action);
  };

  useEffect(() => {
    setIsVisible(!getIsVisibleEditModal());
  }, [state.product.isVisibleEditModal]);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceList, setPriceList] = useState([{ price: 100, size: 10 }]);
  useEffect(() => {
    setProduct({
      ...product,
      prices: priceList.map((item) => ({ price: item.price, size: item.size })),
    });
  }, [priceList]);

  useEffect(() => {
    const handler = async () => {
      const { data } = await getProductCategory();
      setCategory(data);
    };
    handler();
  }, []);

  const getProductById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const mappedData = {
        ...data,
        nameProduct: data.name,
        color: data.color.join(', '),
        length: data.length.join(', '),
        id: data._id,
      };
      setProduct(mappedData);

      setPriceList(mappedData.prices);

      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProduct = async () => {
    const filesClone = files.map((item) => item.name);
    console.log(files);
    // for (const file of files) {
    //   const index = files.indexOf(file);
    //   await uploadFile(
    //     file,
    //     `${product.nameProduct}-${product.articul}-${index}`
    //   );
    // }
    // const productClone = product;
    // productClone.image = files.map(
    //   (item, index) =>
    //     `${productClone.nameProduct}-${productClone.articul}-${index}`
    // );
    // productClone.image = [...productClone.image];

    // return;
    const productClone = product;
    if (files.length !== 0) {
      files.forEach(async (file, index) => {
        await uploadFile(
          file,
          `${product.nameProduct}-${product.articul}-${index}`
        );
      });

      productClone.image = files.map(
        (item, index) =>
          `${productClone.nameProduct}-${productClone.articul}-${index}`
      );
    }

    const body = {
      ...product,
      name: product.name,
      color: product.color.split(',').map((i) => i.trim()),
      length: product.length.split(',').map((i) => i.trim()),
      price: Number(product.price),
      rating: Number(product.rating),
      size: Number(product.size),
      image: productClone.image,
    };

    try {
      await fetch('/api/products/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch {
      alert('error');
    }
  };

  useEffect(() => {
    if (state.product.isVisibleEditModal) {
      getProductById(state.product.editProductId);
    }
  }, [state.product.isVisibleEditModal]);

  useEffect(() => {
    if (!isLoading) {
      setImageUrls(product.image.map((i) => `${i}`));
    }
  }, [isLoading]);

  const Inputs = [
    { title: 'Наименование', propName: 'name', type: InputType.text },
    { title: 'Ссылка', propName: 'slug', type: InputType.text },
    { title: 'Длинна', propName: 'length', type: InputType.text },
    { title: 'Артикул', propName: 'articul', type: InputType.text },
    { title: 'Производитель', propName: 'brand', type: InputType.text },
    { title: 'Цвет', propName: 'color', type: InputType.text },
    { title: 'Страна', propName: 'country', type: InputType.text },
    { title: 'Описание', propName: 'description', type: InputType.textarea },
  ];
  const onEdit = () => {
    updateProduct();

    ctxDispatch({ type: ActionTypes.UPDATE_LIST_START });
    setIsModalVisible(false);
  };

  return (
    <>
      <ModalWindow
        isVisible={state.product.isVisibleEditModal}
        setIsVisible={setIsModalVisible}
      >
        <h1>Редактирование</h1>

        <InputFile
          files={files}
          setFiles={setFiles}
          onRemove={onRemoveFile}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />

        {Inputs.map((input, index) => {
          return (
            <InputGenerator
              title={input.title}
              setter={setProduct}
              getter={product}
              product={product}
              propName={input.propName}
              type={input.type}
              key={index}
            />
          );
        })}
        <InputPrice priceList={priceList} setPriceList={setPriceList} />
        <button
          onClick={() => {
            onEdit();
          }}
        >
          Сохранить изменения
        </button>
      </ModalWindow>
    </>
  );
}
