import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import './ProductAdminPage.scss';
import ProductList from '../../components/admin/ProductList/ProductList';
import useProductFetch from '../../components/products/useProductFetch';
import ProductAdd from '../../components/admin/ProductAdd/ProductAdd';
import Control from '../../components/admin/Control/Control';
import ModalEdit from '../../components/admin/ModalEdit/ModalEdit';
import { Store } from '../../Store';
import { ActionTypes } from '../../ActionTypes/ActionTypes';

export default function ProductAdminPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [visibleAdd, setVisibleAdd] = useState(false);

  const [products, loading, error] = useProductFetch();

  const onSetIsVisibleEditModal = (value) => {
    ctxDispatch({
      type: ActionTypes.TOGGLE_EDIT_MODAL,
      payload: value,
    });
  };

  return (
    <div>
      <Control visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />

      <ProductAdd visibleAdd={visibleAdd} setVisibleAdd={setVisibleAdd} />

      <ModalEdit
        isModalVisible={state.product.isVisibleEditModal}
        setIsModalVisible={onSetIsVisibleEditModal}
      />

      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}
