import React, { useContext } from 'react';
import { Store } from '../../../Store';
import { ActionTypes } from '../../../ActionTypes/ActionTypes';

export default function ProductItem(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const getIsVisible = () => state.product.isVisibleEditModal;

  const onOpenModalEdit = (id) => {
    const toggleEditModalAction = {
      type: ActionTypes.TOGGLE_EDIT_MODAL,
      payload: !getIsVisible(),
    };

    const setEditProductId = {
      type: ActionTypes.SET_EDIT_PRODUCT_ID,
      payload: id,
    };
    ctxDispatch(toggleEditModalAction);
    ctxDispatch(setEditProductId);
  };

  const onRemove = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'delete',
    });
    ctxDispatch({
      type: ActionTypes.UPDATE_LIST_START,
    });
  };

  return (
    <div className="control-wrap">
      <div className="control-row">
        <img
          src={`http://localhost:5000/static/images/products/${product.image[0]}.jpg`}
          alt=""
          className="control-img"
        />

        <div>
          <div>{product.name}</div>
          {product.size && <div>Размер: {product.size} </div>}
          {product.length && <div>Длинна: {product.length}</div>}
          <div>Производитель: {product.brand}</div>
          <div>Страна: {product.country}</div>
          <div>Описание: {product.description}</div>
          <div>Ссылка: {product.slug}</div>
          <div>Артикул: {product.articul}</div>
        </div>

        <div>
          <input
            className="control-edit"
            type="button"
            value="Редактировать"
            onClick={() => onOpenModalEdit(product._id)}
          />

          <input
            onClick={() => onRemove(product._id)}
            className="control-edit"
            type="button"
            value="Удалить"
          />
        </div>
      </div>
    </div>
  );
}
