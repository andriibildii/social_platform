import React, { FC } from "react";
import Post from "./Post/Post";
import style from "./MyPosts.module.css";
import AddPostForm from "./MyPostsForm/MyPostsForm";
import { PostsType } from "../../../types/types";

type PropsTypes = {
  posts: Array<PostsType>
  addPost: (newPostBody: string) => void
}

export type FormDataType = {
  newPost: string
}

const MyPosts: FC<PropsTypes> = React.memo(({ posts, addPost }) => {

  // console.log("RENDER MY POSTS");

    const addNewPost = (formData: FormDataType) => {
        console.log("new post", formData.newPost);
        addPost(formData.newPost);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={addNewPost} />
            <div className={style.posts}>
                {posts.map((post) => (
                    <Post
                        message={post.message}
                        likesCount={post.likesCount}
                        key={post.id}
                    />
                ))}
            </div>
        </div>
    );
});

export default MyPosts;
