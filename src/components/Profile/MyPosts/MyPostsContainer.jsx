import { useState, useRef } from "react";
import MyPosts from "./MyPosts";

let postsData = [
    {
        id: 1,
        message: "Hello mates!",
        likesCount: 0,
    },
    {
        id: 2,
        message: "The first",
        likesCount: 23,
    },
    {
        id: 3,
        message: "OMG! It's so late",
        likesCount: 5,
    },
];

const MyPostsContainer = () => {
    const [posts, setPosts] = useState(postsData);
    // console.log(posts);
    const newText = useRef(null);

    const addPost = () => {
        const newPost = newText.current.value;
        setPosts((prevState) => [
            ...prevState,
            {
                id: prevState[prevState.length - 1].id + 1,
                message: newPost,
                likesCount: 6,
            },
        ]);
    };

    return <MyPosts posts={posts} addPost={addPost} newText={newText} />;
};

export default MyPostsContainer;
