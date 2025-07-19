import React from "react";
import databaseService from "../appwrite/databases";
import { PostCard, Container, Loader } from "./../components";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    databaseService.getAllPosts([]).then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  return (
    <Container>
      {posts ? (
        <div className="grid sm:grid-cols-3 gap-3 w-full py-5 px-4 text-sm sm:text-base">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </Container>
  );
}

export default AllPosts;
