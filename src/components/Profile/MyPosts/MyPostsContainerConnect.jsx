import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import {
    addPostActionCreator,
    updateNewPostTextActionCreator,
} from "../../../redux/profile-reducer";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text)),
        addPost: () => dispatch(addPostActionCreator),
    };
};

const MyPostsContainerConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainerConnect;
