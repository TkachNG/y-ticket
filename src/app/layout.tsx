import React from "react";
import { StoreProvider } from '@/redux/StoreProvider.jsx'
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { roboto } from "@/app/fonts";
import cl from 'classnames';
import './globals.css'

export const metadata = {
  title: 'Билетопоиск',
  description: 'Все билеты найдутся',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={cl(roboto.className)}>
    <StoreProvider>
      <div className='container'>
        <Header/>
        <main className='main'>
          {children}
        </main>
        <Footer/>
      </div>
    </StoreProvider>
    </body>
    </html>
  )
}
