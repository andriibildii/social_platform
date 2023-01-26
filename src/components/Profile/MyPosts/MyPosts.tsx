import React, { FC } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { AppStateType } from "../../../redux/store";
import { AddPostForm } from "./MyPostsForm/MyPostsForm";
import style from "./MyPosts.module.css";

export const MyPosts: FC = React.memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts);

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm />
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
