import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Sucess from "./pages/Sucess";
import { useSelector } from "react-redux";
import Address from "./pages/Address";


function App() {
  const User = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/products" Component={ProductList} />
        <Route path="/products/:category" Component={ProductList}/>
        <Route path="/product/:id" Component={Product} />
        <Route path="/cart" Component={Cart} />
        <Route path="/login" element={User ? <Navigate to={"/"}/> : <Login/> } />
        <Route path="/register" element={User ? <Navigate to={"/"}/> : <Register/> } />
        <Route path="/success" Component={Sucess}/>
        <Route path="/address" Component={Address}/>
        
      </Routes>
    </Router>
  );
}

export default App;
