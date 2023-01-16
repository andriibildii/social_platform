import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import {
    addPostActionCreator,
} from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/store";
import { PostsType } from "../../../types/types";

type MapStateToPropsType = {
    posts: Array<PostsType>
}

type MapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    };
};

const mapDispatchToProps = (dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostBody) => dispatch(addPostActionCreator(newPostBody)),
    };
};

const MyPostsContainerConnect = connect<MapStateToPropsType, MapDispatchToPropsType, undefined, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainerConnect;
