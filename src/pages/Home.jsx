import React from 'react'
import { Link } from 'react-router-dom'
import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'
import { useTranslation } from 'react-i18next';
import { useState,useEffect } from 'react'
function Home() {
  let [data, setData] = useState([]);
  const [lang,setLang] = useState('uz');
  const { t, i18n } = useTranslation();
   
  useEffect(()=>{
    let lang = localStorage.getItem('lang')
    if(lang){
      i18n.changeLanguage(lang);
      setLang(lang);
    }
    fetch("https://strapi-store-server.onrender.com/api/products")
    .then((data) => data.json())
    .then((data) => setData(data.data))
    .catch((err) => {
      console.log(err);
    });
  },[])

  function handleClickLang(e){
    setLang(e.target.value)
    i18n.changeLanguage(e.target.value)
    localStorage.setItem('lang', e.target.value)
  };
  
  return (
   <div className='div_header'>
    <div className='div_width'>
        
           <section className="align-element py-20 ">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">{t('letter-1')}</h1>
            <p className="mt-8 max-w-xl text-lg leading-8">{t('letter-2')}</p>
            <div className="mt-10">
                <Link className="btn btn-primary" to="/products">{t('our-products')}</Link>
        
                </div>
                </div>
        
                <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
             <div className="carousel-item">
            <img src={hero1} className="rounded-box h-full w-80 object-cover" />
             </div>
             <div className="carousel-item">
            <img src={hero2} className="rounded-box h-full w-80 object-cover" />
             </div>
             <div className="carousel-item">
            <img src={hero3} className="rounded-box h-full w-80 object-cover" />
             </div>
             <div className="carousel-item">
            <img src={hero4} className="rounded-box h-full w-80 object-cover" />
             </div>
            
             
             
           </div>
        
                </div>

            <div className='pt-24'>
            <div className='border-b border-base-300 pb-5'>
              <h2 className='text-3xl font-bold tracking-wider capitalize'>
              {t('featured-products')}
              </h2>
            </div>
              <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {data.length
              ? data.map((products, index) => {
                  return (
                products.attributes.featured == true?    <Link
                      to={""}
                      key={index}
                      className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                    >
                      <div className="px-4 pt-4">
                        <img className="rounded-xl h-64 md:h-48 w-full object-cover" src={products.attributes.image} alt={products.attributes.title} />
                      </div>
                      <div className="card-body items-center text-center">
                        <p className="card-title capitalize tracking-wider">{products.attributes.title}</p>
                        <p className="text-secondary">${products.attributes.price}</p>
                      </div>
                    </Link>:""
                 );
                })
              : <p className="">Loading...</p>}
              </div>

            </div>
           </section>

    </div>
   </div>
  )
}

export default Home