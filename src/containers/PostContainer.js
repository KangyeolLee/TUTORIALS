import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, goHome } from "../modules/posts";
import Post from "../components/Post";

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId]
  ) || {
    loading: false,
    data: null,
    error: null,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading && !data) return <div>loading...</div>;
  if (error) return <div>error...!</div>;
  if (!data) return null;

  return (
    <>
      <Post post={data} />
      <button onClick={() => dispatch(goHome())}>Home</button>
    </>
  );
};

export default PostContainer;
