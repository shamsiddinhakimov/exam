import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Products() {
  const [api, setApi] = useState(
    "https://strapi-store-server.onrender.com/api/products"
  );
  let [data, setData] = useState([]);
  const [lang, setLang] = useState("uz");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
      setLang(lang);
    }
  }, []);

  const [inputValue, setInputValue] = useState(0);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const searchbtn = useRef("");
  const categorybtn = useRef("");
  const companybtn = useRef("");
  const orderbtn = useRef("");
  const pricebtn = useRef(100000);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [api]);

  const [loader, setLoader] = useState(true);
  function Change(e) {
    setLoader(false);
    setApi(`https://strapi-store-server.onrender.com/api/products + ?page=${e}`
      
    );
    setLoader(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      searchbtn.current.value,
      categorybtn.current.value,
      companybtn.current.value,
      orderbtn.current.value,
      pricebtn.current.value
    );
    setApi(`
      https://strapi-store-server.onrender.com/api/products?search=${searchbtn.current.value}&category=${categorybtn.current.value}&company=${companybtn.current.value}&order=${orderbtn.current.value}&price=${pricebtn.current.value}
    `);
  }
  setTimeout(() => {
    console.log(api);
  }, 5000);
  return (
    <div className="div_header">
      <div className="div_width">
        <section className="align-element py-20">
          <form
            onSubmit={handleSubmit}
            method="get"
            action="/products"
            className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
          >
            <div className="form-control">
              <label htmlFor="search" className="label">
                <span className="label-text capitalize">
                  {t("search-product")}
                </span>
              </label>
              <input
                ref={searchbtn}
                type="search"
                name="search"
                className="input input-bordered input-sm"
              ></input>
            </div><div className="form-control">
              <label htmlFor="category" className="label">
                <span className="label-text capitalize">
                  {t("select-category")}
                </span>
              </label>
              <select
                ref={categorybtn}
                name="category"
                id="category"
                className="select select-bordered select-sm"
              >
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="company" className="label">
                <span className="label-text capitalize">
                  {t("select-company")}
                </span>
              </label>
              <select
                ref={companybtn}
                name="company"
                id="company"
                className="select select-bordered select-sm"
              >
                <option value="all">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="order" className="label">
                <span className="label-text capitalize">{t("sort-by")}</span>
              </label>
              <select
                ref={orderbtn}
                name="order"
                id="order"
                className="select select-bordered select-sm"
              >
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label cursor-pointer">
                <span className="label-text capitalize">
                  {t("select-price")}
                </span>
                <span>${inputValue}</span>
              </label>
              <input
                ref={pricebtn}
                type="range"
                name="price"
                min="0"
                max="100000"
                className="range range-primary range-sm"
                step="1000"
                onChange={handleChange}
                defaultValue={100000} 
              ></input>
              <div className="w-full flex justify-between text-xs px-2 mt-2">
                <span className="font-bold text-md">0</span>
                <span className="font-bold text-md">Max : $1,000.00</span>
              </div>
            </div>
            <div className="form-control items-center">
              <label htmlFor="shipping" className="label cursor-pointer">
                <span className="label-text capitalize">
                  {t("free-shipping")}
                </span>
              </label>
              <input

                type="checkbox"
                name="shipping"
                className="checkbox checkbox-primary checkbox-sm"
                
              ></input>
            </div>

            <button className="btn btn-primary text-center">
              {t("search")}
            </button><Link
              to="/products"
              className="w-auto btn btn-secondary text-center"
            >
              {t("reset")}
            </Link>
          </form>
          <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.length ? (
              data.map((products, index) => {
                return loader == true ? (
                  <Link
                    to={""}
                    key={index}
                    className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                  >
                    <div className="px-4 pt-4">
                      <img
                        className="rounded-xl h-64 md:h-48 w-full object-cover"
                        src={products.attributes.image}
                        alt={products.attributes.title}
                      />
                    </div>
                    <div className="card-body items-center text-center">
                      <p className="card-title capitalize tracking-wider">
                        {products.attributes.title}
                      </p>
                      <p className="text-secondary">
                        ${products.attributes.price}
                      </p>
                      <p className=" hidden">{products.attributes.category}</p>
                    </div>
                  </Link>
                ) : (
                  ""
                );
              })
            ) : (
              <>
                <p className=" text-center">Loading...</p>
                <p className="text-center">Sorry it is not coming palceholder</p>
              </>
            
              
              
            )}
          </div>
          <div className="mt-16 flex justify-end">
            <div className="join">
              <button
                onClick={() => {
                  Change(1);
                }}
                className="btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300 "
              >
                1
              </button>
              <button
                onClick={() => {
                  Change(2);
                }}
                className="btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300"
              >
                2
              </button>
              <button
                onClick={() => {
                  Change(3);
                }}
                className="btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300"
              >
                3
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;