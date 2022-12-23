import style from "./Post.module.css";

const Post = ({ message, likesCount }) => {
	return (
		<div className={style.item}>
			<img
				src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkZmVtYWxlbnVkZWJhdGNoMi0xNjMtYW9tXzEuanBn.jpg"
				alt="post avatar"
			></img>
			{message}
			<div>
				<span>like: {likesCount}</span>
			</div>
		</div>
	);
};

export default Post;
