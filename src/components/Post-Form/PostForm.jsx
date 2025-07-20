import React, { useCallback, useEffect } from "react";
import databaseService from "../../appwrite/databases";
import storageService from "../../appwrite/storage";
import { RealTimeEditor as RTE, Button, Input, Select } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
        slug: post?.$id || "",
      },
    });

  const handlePost = async (data) => {
    // Edit post
    if (post) {
      // upload --> new image
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      // delete prev post
      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      // update
      const updateDBPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined, // Todo --> handle undefined
      });
      if (updateDBPost) navigate(`/post/${updateDBPost.$id}`);
      toast.success("Post updated successfully!");
    } else {
      // upload new img
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      // create post

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const createDBPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (createDBPost) navigate(`/post/${createDBPost.$id}`);
      }
      toast.success("Post created successfully!");
    }
  };

  // slugTransform --> watch(title)
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title")
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
    });
    return () => {
      subcription.unsubscribe();
    };
  }, [watch, navigate, slugTransform]);
  return (
    <form
      className="p-4 sm:flex justify-between gap-4"
      onSubmit={handleSubmit(handlePost)}
    >
      <div>
        <Input
          label={"Title: "}
          placeholder="Enter title"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label={"Slug: "}
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label={"Content: "}
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="flex flex-col gap-8 mt-2 sm:mt-0">
        <Input
          label={"Featured Image: "}
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="">
            <img
              className="rounded-xl"
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />
        <Button
          className="mt-2 sm:mt-0"
          children={post ? "Update" : "Submit"}
        />
      </div>
    </form>
  );
}

export default PostForm;
