import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const fetchPosts = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setLoading(false); // Mark loading as complete
    } catch (error) {
      setError(error); // Handle and set the error
      setLoading(false); // Mark loading as complete (with error)
    }
  };

  useEffect(() => {
    if (isProfile) {
      fetchPosts(`http://localhost:3001/posts/${userId}/posts`);
    } else {
      fetchPosts("http://localhost:3001/posts");
    }
  }, [isProfile, userId]); // Include isProfile and userId as dependencies

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
