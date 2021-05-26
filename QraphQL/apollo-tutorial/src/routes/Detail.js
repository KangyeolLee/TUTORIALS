import React from 'react'
import { useParams } from 'react-router'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GET_MOVIES = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title 
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  color: #fff;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`

const Descroption = styled.p`
  font-size: 28px;
`

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`

const Suggestions = styled.div`
  margin-top: 2rem;
  display: grid;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
`

const Suggestion = styled(Poster)`
  width: 80%;
  height: 400px;
  cursor: pointer;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: {
      id: +id
    }
  });
  console.log(data)
  if (loading) return 'loading';
  return (
    <Container>
      <Column>
        <Title>
          {data?.movie?.title} {data?.movie?.isLiked ? "💖" : "😞"}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Descroption>{data?.movie?.description_intro}</Descroption>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
      <Suggestions>
        {data?.suggestions?.map(sug => <Link to={`/${sug.id}`}> <Suggestion bg={sug.medium_cover_image} /> </Link>)}
      </Suggestions>
    </Container>
  )
}