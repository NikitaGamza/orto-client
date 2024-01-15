import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import { getError } from './utils';
import { ActionTypes } from './ActionTypes/ActionTypes';

import { getProductCategory } from './api/category';
import SideBar from './components/SideBar';
import Header from './components/Header/Header';
import Routing from './routing/Routing';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: ActionTypes.USER_SIGNOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCatigories = async () => {
    try {
      const { data } = await getProductCategory();
      setCategories(data);
    } catch (err) {
      alert(getError(err));
    }
  };

  useEffect(() => {
    fetchCatigories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <Header
          userInfo={userInfo}
          signoutHandler={signoutHandler}
          cart={cart}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        />

        {/* <SideBar
          categories={categories}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
        /> */}

        <main>
          <Container>
            <Routing />
          </Container>
        </main>

        <footer className="text-center">Все права защищены</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
