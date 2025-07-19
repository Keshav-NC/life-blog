import React from "react";
import authService from "../appwrite/auth";
import databasesService from "../appwrite/databases";
import { Container, Landing, Loader, PostCard } from "../components";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    databasesService
      .getAllPosts()
      .then((res) => {
        if (res) setPosts(res.documents);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (loading && isAuthenticated === null) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Landing />;
  }
  return (
    <Container>
      {!loading && posts.length > 0 ? (
        <div className="w-full p-3 text-sm sm:text-base flex flex-col gap-4">
          <h1 className="text-3xl text-gray-700 font-semibold">Recent Posts</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Landing />
      )}
    </Container>
  );
}

export default Home;
