import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  var admin=null;
  if(currentUser){
    admin = currentUser.isAdmin;
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={admin ? <Navigate to={'/'}/> : <Login/>} />
      </Routes>
      {admin && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={admin ? <Home/> : <Navigate to={'/login'}/> } />
              <Route path="/users" Component={UserList} />
              <Route path="/user/:userId" Component={User} />
              <Route path="/newUser" Component={NewUser} />
              <Route path="/products" Component={ProductList} />
              <Route path="/product/:productId" Component={Product} />
              <Route path="/newproduct" Component={NewProduct} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
