import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import CardProduct from "../../../components/CardProduct";
import api from "../../../services/axios";

function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [itsLoading, setLoading] = useState(true);
  const nav = useNavigate();

  const getProductsOnDB = async () => {
    const authorization = "?";

    try {
      const data = await api.get("/products", {
        headers: { authorization },
      });
      console.log("🚀 ~ getProductsOnDB ~ data:", data);

      setDataProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      nav("/login");
    }
  };

  useEffect(() => {
    getProductsOnDB();
  }, []);

  return (
    <div>
      <NavBar />
      {itsLoading &&
        dataProducts.map((product) => (
          <CardProduct
            key={product.id}
            urlImage={product.urlImage}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
    </div>
  );
}

export default Products;
