// 'use client'

import React from "react";
import { StoreProvider } from '@/redux/StoreProvider.jsx'
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { roboto } from "@/components/fonts";
import cl from 'classnames';
import './globals.css'
import { MainComponent } from "@/components/Main";

export const metadata = {
  title: 'Билетопоиск',
  description: 'Все найдем',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <body className={cl(roboto.className)}>
    <StoreProvider>
      <div className='container'>
        <Header/>
        <MainComponent>{children}</MainComponent>
        <Footer/>
      </div>
    </StoreProvider>
    </body>
    </html>
  )
}
