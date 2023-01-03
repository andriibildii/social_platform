import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import {
    addPostActionCreator,
} from "../../../redux/profile-reducer";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostBody) => dispatch(addPostActionCreator(newPostBody)),
    };
};

const MyPostsContainerConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainerConnect;
