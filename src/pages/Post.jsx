import React from "react";
import storageService from "../appwrite/storage";
import databasesService from "../appwrite/databases";
import { Container, Button } from "../components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { toast } from "react-toastify";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      databasesService.getPost(slug).then((res) => {
        if (res) setPost(res);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? userData.$id === post.userId : false;

  const handleDeletePost = () => {
    databasesService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
        toast.success("Post deleted successfully!");
      }
    });
  };

  return post ? (
    <Container>
      <div className="py-4 flex flex-col justify-center items-center gap-4 mt-2 mx-3 sm:mx-0">
        <div className="w-1/2">
          {post.featuredImage && (
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="p-3 bg-white/20 backdrop-blur-md rounded-md"
            />
          )}

          {isAuthor && (
            <div className="font-semibold flex justify-between mt-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  textColor="text-green-700"
                  bgColor="border-green-700"
                  className="mr-3 hover:bg-green-700 border hover:text-white"
                  width="w-20"
                >
                  Edit
                </Button>
              </Link>
              <Button
                textColor="text-red-700"
                bgColor="border-red-700"
                className="hover:bg-red-700 border hover:text-white"
                width="w-20"
                onClick={handleDeletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Title: {post.title}
          </h1>
        </div>
        <div className="browser-css text-gray-800 font-medium text-xl bg-white/20 backdrop-blur-md p-5 rounded-md shadow w-full">
          {parse(post.content)}
        </div>
      </div>
    </Container>
  ) : null;
}

export default Post;
