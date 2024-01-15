import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function SideBar(props) {
  const { categories, sidebarIsOpen, setSidebarIsOpen } = props;

  return (
    <div
      className={
        sidebarIsOpen
          ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
          : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
      }
    >
      <Nav className="flex-column text-white w-100 p-2">
        <Nav.Item>
          <strong>Категории</strong>
        </Nav.Item>

        {categories.map((category) => (
          <Nav.Item key={category._id}>
            <Link
              to={`/search?category=${category.name}`}
              onClick={() => setSidebarIsOpen(false)}
            >
              <p className="cat-link">{category.name}</p>
            </Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}
