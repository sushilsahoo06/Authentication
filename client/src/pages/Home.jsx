import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar/>
      <Header/>
    </div>
  )
}
