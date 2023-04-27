import React from "react";
import TopBar from "../../EventsPage/TopBar";
import AddProductForm from "./AddProductForm";
import { useState } from "react";
import ApiUrl from "../../../utils/ApiUrl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([{ options: [{}] }]);

  const [searchParams] = useSearchParams()
  const eventId = searchParams.get("eventId") 

  const navigate = useNavigate()

  const setProduct = (product, index) => {
    const productCopy = [...products];
    productCopy[index] = product;
    setProducts(productCopy);
  };

  const handleRemoveProduct = (index) => {
    const productsCopy = [...products];
    productsCopy.splice(index, 1);
    setProducts(productsCopy);
  };

  const addProduct = () => {
    setProducts([...products, { options: [{}] }]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(products);

    const requestBody = {
      products,
      eventId: parseInt(eventId)
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(ApiUrl.PRODUCT, requestOptions);
    navigate(`/registration-dashboard?eventId=${eventId}`)
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    fetch(`${ApiUrl.PRODUCT}?eventId=${eventId}`, requestOptions)
    .then( (res) => res.json() )
    .then( (data) => {
      setProducts(data.products) 
    })
  }, [])

  return (
    <div className="w-full h-full">
      <TopBar />
      <form
        className="w-[800px] bg-white m-auto rounded-sm mt-5 p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="border rounded-sm shadow-sm">
          <p className="text-4xl text-center w-full p-5 mb-5">
            Placeholder for event name
          </p>
          {products.length <= 0 && (
            <p className="text-2xl text-center">No products added</p>
          )}
          {products.map((product, index) => {
            if(product.options == null) {
              product.options = [{}]
            }
            return (
              <AddProductForm
                product={product}
                setProduct={(product) => setProduct(product, index)}
                removeProduct={() => handleRemoveProduct(index)}
              />
            );
          })}

          <div
            className='text-center text-sm text-gray-300 my-5 hover:cursor-pointer hover:text-black
                                before:relative before:align-middle before:h-[0.5px] before:bg-gray-300 before:content-[""] before:inline-block before:w-2/5 before:right-3 before:ml-[-50%] before:hover:bg-black
                                after:relative after:align-middle after:h-[0.5px] after:bg-gray-300 after:content-[""] after:inline-block after:w-2/5 after:left-3 after:mr-[-50%] after:hover:bg-black'
            onClick={addProduct}
          >
            {" "}
            Add +{" "}
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline">
            Discard
          </button>
          <button
            className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
