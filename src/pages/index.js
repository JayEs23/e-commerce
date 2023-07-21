import Head from 'next/head';
import Image from 'next/image' ;
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
 
 const inter = Inter({ subsets: ['latin'] });

export default function Home() { 
  return ( 
  <><Head>
      <title>Inshopper Ecommerce</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
      <link rel="stylesheet" href="../../style.css" />
      <link rel="stylesheet" href="../../main.css" />
    </Head>
    <main className="bg-main">
      <Navbar />

      <Footer />
    </main>
      
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</>
      
  ) }
  