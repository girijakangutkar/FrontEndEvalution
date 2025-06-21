import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const ProductExplore = () => {
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 6;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currProduct = info.slice(indexOfFirst, indexOfLast);

  const totalPage = Math.ceil(info.length / productsPerPage);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setIsLoading(true);
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setInfo(res.data);
    } catch (error) {
      console.log("something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  function searchProduct() {
    if (search.length > 0) {
      return currProduct.filter((ele) =>
        ele.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    return currProduct;
  }

  function filterByCategory() {
    const res = searchProduct();
    if (category == "All" || category == "") {
      return res;
    }
    return res.filter((ele) => ele.category == category);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center content-center items-center align-center self-center m-0-auto w-[90%]">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center content-center items-center align-center self-center m-0-auto w-[90%]">
      <div className="flex flex-row justify-center align-center self-center items-center m-5 border border-[#cc] w-full">
        <label>Filer by category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border m-2 p-1"
        >
          <option value="All">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-1"
            placeholder="Search product"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 justify-center items-center align-center self-center p-5">
        {filterByCategory().map((pro) => (
          <div
            key={pro.id}
            className="border border-[#ccc] p-5 h-auto shadow-lg rounded-lg text-left"
          >
            <h1 className="text-center font-bold">{pro.title}</h1>
            <p>{pro.category}</p>
            <p className="font-semibold">Rs: {pro.price}</p>
            <div className="object-cover flex flex-col justify-center w-full items-center h-40">
              <img src={pro.image} height={"10px"} width="80px" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row m-2">
        <button
          onClick={prev}
          disabled={currentPage == 1}
          className="p-1 font-semibold border m-3 rounded-md bg-blue-300 shadow-lg"
        >
          Prev
        </button>
        <p className="p-1 m-3 font-medium">
          {currentPage}/{totalPage}
        </p>
        <button
          className="p-1 font-semibold border m-3 rounded-md bg-blue-300 shadow-lg"
          onClick={next}
          disabled={currentPage == totalPage}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ProductExplore;
