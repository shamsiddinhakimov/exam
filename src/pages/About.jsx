import React from 'react'
import { useTranslation } from 'react-i18next';
import { useState,useEffect } from 'react'

function About() {
  const [lang,setLang] = useState('uz');
  const { t, i18n } = useTranslation();
   
  useEffect(()=>{
    let lang = localStorage.getItem('lang')
    if(lang){
      i18n.changeLanguage(lang);
      setLang(lang);
    }
  },[])

  function handleClickLang(e){
    setLang(e.target.value)
    i18n.changeLanguage(e.target.value)
    localStorage.setItem('lang', e.target.value)
  }
  return (
    <div className='div_header '>
        <div className='div_width'>
        <section className="align-element py-20">
            <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
    <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">{t('we-love')}</h1> 
    <div className="stats bg-primary shadow">
        <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">{t('comfy')}
            </div>
            </div>
        </div>
            </div>
            <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
            {t('letter-3')}
            </p>
        </section>
        </div>
    </div>
  )
}

export default About