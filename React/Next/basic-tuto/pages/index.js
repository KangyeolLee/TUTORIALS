import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import ItemList from '../src/component/ItemList';
import { Header, Divider, Loader } from 'semantic-ui-react';
import Axios from 'axios';

export default function Home({ list }) {

  return (
    <>
      <Head>
        <title>KG NEXT</title>
      </Head>

      <>
        <Header as='h3' style={{ paddingTop: 40 }}>BEST</Header>
        <Divider />
        <ItemList list={list.slice(0, 9)} />

        <Header as='h3' style={{ paddingTop: 40 }}>NEW</Header>
        <Divider />
        <ItemList list={list.slice(10)} />
      </>

    </>
  )
}

export async function getStaticProps() {
  const API_URL = process.env.API_URL;
  const res = await Axios.get(API_URL);
  const data = res.data;

  return {
    props: {
      list: data,
      name: process.env.name,
    }
  }
}
