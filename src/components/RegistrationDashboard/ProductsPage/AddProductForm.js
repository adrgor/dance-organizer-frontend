import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function AddProductForm({ product, setProduct, removeProduct }) {
  const [isSingleOptionField, setSingleOptionField] = useState(true);

  const addOption = () => {
    setProduct({
      ...product,
      options: [...product.options, { name: "", price: "", currency: "" }],
    });
  };

  const setOption = (option, index) => {
    const optionsCopy = [...product.options];
    optionsCopy[index] = option;
    setProduct({ ...product, options: optionsCopy });
  };

  const removeOption = (index) => {
    if (product.options.length > 1) {
      const optionsCopy = [...product.options];
      optionsCopy.splice(index, 1);
      setProduct({ ...product, options: optionsCopy });
    }
  };

  const handleOnFieldTypeChange = (e) => {
    const targetType = e.target.value;
    const productCopy = { ...product };
    if (targetType == "Boolean" || targetType == "Input field") {
      setSingleOptionField(true);
      productCopy.options = [{ name: "", price: "", currency: "" }];
    } else setSingleOptionField(false);

    productCopy.fieldType = e.target.value;
    setProduct(productCopy);
  };

  useState(()=> {
    setSingleOptionField(product.type == "Boolean" || product.type == "Input field")
  }, [])

  return (
    <div
      className={`relative w-full flex flex-col items-start justify-center [&>*]:mr-5 p-5 border-b shadow-sm`}
    >
      <div className="w-full m-auto mt-5 pt-5 px-10 flex justify-between">
        <input
          className="w-[50%] text-lg px-2 py-2 bg-gray-100 border-b focus:outline-none focus:border-b-black"
          placeholder="Product name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <select
          className="w-[40%] text-lg px-2 py-2 border focus:outline-none focus:border-black"
          value={product.fieldType}
          onChange={handleOnFieldTypeChange}
        >
          <option selected="selected" disabled={true}>
            Select field type
          </option>
          <option>Input field</option>
          <option>Select</option>
          <option>Radio button</option>
          <option>Checkbox</option>
          <option>Boolean</option>
        </select>
      </div>

      {product.options.map((option, index) => {
        return (
          <div className="w-full flex items-center justify-between py-5 px-10">
            <input
              className="w-1/2 px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black disabled:cursor-not-allowed"
              placeholder="Option"
              value={option.name}
              onChange={(e) =>
                setOption({ ...option, name: e.target.value }, index)
              }
              disabled={isSingleOptionField}
            />
            <div className={`${isSingleOptionField && "mr-[4.75rem]"}`}>
              <input
                className="px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black"
                placeholder="Price"
                type="number"
                min={0}
                step={0.01}
                value={option.price}
                onChange={(e) =>
                  setOption({ ...option, price: e.target.value }, index)
                }
              />
              <div>
                <input
                  className="px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black"
                  placeholder="Currency"
                  value={option.currency}
                  onChange={(e) =>
                    setOption({ ...option, currency: e.target.value }, index)
                  }
                />
                <svg
                  onClick={addOption}
                  className={`w-7 ml-5 mt-5 inline-block ${
                    isSingleOptionField && "hidden"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="rgb(59 130 246)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <svg
                  onClick={() => removeOption(index)}
                  className={`w-7 mt-5 inline-block ${
                    isSingleOptionField && "hidden"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      id="Vector"
                      d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20"
                      stroke="rgb(59 130 246)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute right-0 top-0" onClick={removeProduct}>
        <svg
          className="w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8L8 16M8.00001 8L16 16"
            stroke="rgb(107 114 128)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
