import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethod'
import { clearCart } from "../redux/cartRedux";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.address;
  const orderId = location.state.orderId;
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          orderId:orderId,
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            size:item.size,
            color:item.color
          })),
          amount: cart.total,
          address: data,
        });
        console.log(res);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser,orderId]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={()=>{
        navigate('/');
        console.log(cart);
        dispatch(clearCart());
        }}>Go to Homepage</button>
    </div>
  );
};

export default Success;