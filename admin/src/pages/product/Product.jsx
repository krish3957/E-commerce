import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProduct } from "../../redux/apiCalls";
import app from "../../firebase";


export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
  );


  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  const [inputs, setInputs] = useState(product);
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(product.categories);
  const [color, setColor] = useState(product.color);
  const [Size, setSize] = useState(product.size);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    let fileName;
    if(file ){
      if(file.name)
        fileName = new Date().getTime() + file.name
    }
    else
      fileName = product.img;
    console.log(fileName);
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { title:inputs.title,desc:inputs.desc, price:inputs.price, img: file ? downloadURL : fileName, categories: cat, size: Size, color: color };
          updateProduct(productId,product, dispatch);
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder={product.title} defaultValue={product.title} 
              onChange={handleChange}
            />
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder={product.desc} defaultValue={product.desc} 
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder={product.price} defaultValue={product.price} 
              onChange={handleChange}
            />
            <label>Stock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <label>Colors</label>
            <input type="text" placeholder={product.color} defaultValue={product.color}  onChange={handleColor} />
            <label>Size</label>
            <input type="text" placeholder={product.size} defaultValue={product.size}  onChange={handleSize} />
            <label>Categories</label>
            <input type="text" placeholder={product.categories} defaultValue={product.categories}  onChange={handleCat} />
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
              </label>
                <Publish />
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleClick} className="productButton" >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
