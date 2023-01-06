import profileReducer, {
    addPostActionCreator,
    deletePost,
} from "./profile-reducer";

let state = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ],
};

test("length of posts should ne increment", () => {
    //arrange
    let action = addPostActionCreator("Hey Andrii!");

    //act
    let newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(4);
});

test("message of new post should be correct", () => {
    //arrange
    let action = addPostActionCreator("Hey Andrii!");

    //act
    let newState = profileReducer(state, action);

    //assertions
    expect(newState.posts[3].message).toBe("Hey Andrii!");
});

test("after deleting length of message should be decrement", () => {
    //arrange
    let action = deletePost(4);

    //act
    let newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(3);
});

test("after deleting length souldn\'t be decrement id ID is incorrect", () => {
    //arrange
    let action = deletePost(50);

    //act
    let newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(3);
});
