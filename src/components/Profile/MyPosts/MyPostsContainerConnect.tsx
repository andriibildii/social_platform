import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/store";
import { PostsType } from "../../../types/types";

type MapStateToPropsType = {
    posts: Array<PostsType>;
};

type MapDispatchToPropsType = {
    addPost: (newPostBody: string) => void;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    };
};

const MyPostsContainerConnect = connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    {},
    AppStateType
>(mapStateToProps, { addPost: actions.addPostActionCreator })(MyPosts);

export default MyPostsContainerConnect;
