import { useContext, useEffect } from 'react';
import { Store } from '../../Store';
import { ActionTypes } from '../../ActionTypes/ActionTypes';
import { getProducts } from '../../api/product';

const useProductFetch = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    product: { list, loading, error, isUpdateList },
  } = state;

  const productFetch = async () => {
    const actionFetchRequest = {
      type: ActionTypes.FETCH_PRODUCT_REQUEST,
    };

    ctxDispatch(actionFetchRequest);

    try {
      const { data } = await getProducts();

      const fetchSuccessAction = {
        type: ActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: data,
      };
      ctxDispatch(fetchSuccessAction);
    } catch (err) {
      const fetchFailAction = {
        type: ActionTypes.FETCH_PRODUCT_FAIL,
      };
      ctxDispatch(fetchFailAction);
    }
  };

  useEffect(() => {
    if (isUpdateList) {
      productFetch();
      ctxDispatch({
        type: ActionTypes.UPDATE_LIST_FINISH,
      });
    }
  }, [isUpdateList]);

  return [list, loading, error];
};

export default useProductFetch;
