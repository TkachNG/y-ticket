'use client'

import Image from 'next/image'
// import styles from './page.module.css'
import { Cart } from '@/components/cart/Cart'
import { useGetMoviesQuery } from '@/redux/services/movieApi'
import { useDispatch } from 'react-redux'
import { FunctionComponent } from 'react'


const Movies: FunctionComponent = () => {
  const {data, isLoading,  error} = useGetMoviesQuery();
  console.log(data);

  return (<></>)
}

export default function Home() {
  const dispatch = useDispatch();

  return (
    <main>
      <Movies />
    </main>
  )
}
