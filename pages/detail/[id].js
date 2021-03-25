import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import Item from '../../src/component/Item';

const Post = ({ item, name }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }

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

export async function getStaticPaths() {
  const API_URL = process.env.API_URL;
  const res = await axios.get(API_URL);
  const data = res.data;
  return {
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
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