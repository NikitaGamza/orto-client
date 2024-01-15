import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import SearchBox from '../SearchBox';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.scss';

export default function Header(props) {
  const { userInfo, signoutHandler, cart, sidebarIsOpen, setSidebarIsOpen } =
    props;

  return (
    <header className="header">
      <Navbar>
        <Container>
          {/* <Button
            variant="dark"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <i className="fas fa-bars">≡</i>
          </Button> */}

          <LinkContainer to="/">
            <Navbar.Brand>OrtoKomi</Navbar.Brand>
          </LinkContainer>

          <Nav className="me-auto">
            {/* <SearchBox /> */}
            <Link to="/" className="nav-link">
              Главная
            </Link>
            <Link to="/about" className="nav-link">
              О нас
            </Link>
            <Link to="/about" className="nav-link">
              Контакты
            </Link>
            <Link to="/faq" className="nav-link">
              FAQ
            </Link>
            <Link to="/cart" className="nav-link">
              Корзина
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <div className="nav__wrap">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  {/* <LinkContainer to="/profile">
                  <NavDropdown.Item>Профиль</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/history">
                  <NavDropdown.Item>История заказов</NavDropdown.Item>
                </LinkContainer> */}
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Выход
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="signin">
                  Войти
                </Link>
              )}{' '}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/product-control">
                    <NavDropdown.Item>Товары</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/product-category">
                    <NavDropdown.Item>Категории</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/product-orders">
                    <NavDropdown.Item>Заказы</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
