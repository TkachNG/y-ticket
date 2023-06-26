import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], style: 'normal' });
export const robotoItalic = Roboto({ subsets: ['latin'], weight: ['400'], style: 'italic' });

export const SFPro = localFont({
  src: [
    {
      path: '../../public/fonts/SFProDisplay-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProDisplay-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProDisplay-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFProDisplay-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SFProDisplay-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SFProDisplay-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ]
});
