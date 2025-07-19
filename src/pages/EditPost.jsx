import React from "react";
import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import databasesService from "../appwrite/databases";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      databasesService.getPost(slug).then((res) => {
        if (res) setPost(res);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
