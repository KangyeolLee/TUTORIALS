import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import Item from '../../src/component/Item';

const Post = ({ item, name }) => {
  return (
    <>{item && (
      <>
        <Head>
          <title>{item.name}</title>
          <meta name='description' content={item.description} />
        </Head>
        <Item item={item} />
      </>
    )}</>

  )
}

export default Post;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(API_URL);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name
    }
  }
}