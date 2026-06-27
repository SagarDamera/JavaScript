// App.jsx
import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <h1>React Router Example</h1>

      <nav>
        <NavLink to="/">Home</NavLink>{" | "}
        <NavLink to="/about">About</NavLink>{" | "}
        <NavLink to="/users">Users</NavLink>{" | "}
        <NavLink to="/products?category=mobile&sort=price">
          Products
        </NavLink>{" | "}
        <NavLink to="/dashboard">Dashboard</NavLink>{" | "}

        {!isLoggedIn ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function PrivateRoute({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>

      <button onClick={() => navigate("/about")}>Go to About</button>

      <button
        onClick={() =>
          navigate("/users/101", {
            state: { name: "John", role: "Admin" },
          })
        }
      >
        Go to User Details With State
      </button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>This is about page.</p>
    </div>
  );
}

function Users() {
  const users = [
    { id: 101, name: "John" },
    { id: 102, name: "Sarah" },
    { id: 103, name: "Michael" },
  ];

  return (
    <div>
      <h2>Users Page</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetails() {
  const { userId } = useParams();
  const location = useLocation();

  return (
    <div>
      <h2>User Details Page</h2>

      <p>User Id from URL Params: {userId}</p>

      {location.state && (
        <>
          <p>Name from navigation state: {location.state.name}</p>
          <p>Role from navigation state: {location.state.role}</p>
        </>
      )}

      <Link to="/users">Back to Users</Link>
    </div>
  );
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const handleChangeFilter = () => {
    setSearchParams({
      category: "laptop",
      sort: "rating",
    });
  };

  return (
    <div>
      <h2>Products Page</h2>

      <p>Category Query Param: {category}</p>
      <p>Sort Query Param: {sort}</p>

      <button onClick={handleChangeFilter}>Change Query Params</button>
    </div>
  );
}

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login Page</h2>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard Page</h2>
      <p>This is a private route.</p>

      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 Page Not Found</h2>

      <Link to="/">Go Home</Link>
    </div>
  );
}

export default App;