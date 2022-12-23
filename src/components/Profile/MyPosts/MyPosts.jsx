import Post from "./Post/Post";
import style from "./MyPosts.module.css";

const MyPosts = ({ posts, newPostText, addPost, updateNewPostText }) => {
    const addMessageClick = () => {
        addPost();
    };

    const inputChange = (e) => {
        updateNewPostText(e.target.value);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={inputChange}
                        value={newPostText}
                        placeholder="add a new post..."
                    ></textarea>
                </div>
                <div>
                    <button onClick={addMessageClick}>Add post</button>
                </div>
            </div>
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
};

export default MyPosts;
