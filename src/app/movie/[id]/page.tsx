'use client'

import { usePathname } from 'next/navigation';
import { Movie } from "@/components/movie/Movie";

export default function Home() {
  const [, id] = usePathname().split('/').filter(item => Boolean(item));

  return (<Movie movieId={id}/>)
}
