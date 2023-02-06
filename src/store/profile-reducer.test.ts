import profileReducer, { actions } from "./profile-reducer";

const state = {
    posts: [
        { id: 1, message: "Hello mates!", likesCount: 0 },
        { id: 2, message: "The first", likesCount: 23 },
        { id: 3, message: "OMG! It's so late", likesCount: 5 },
    ],
    profile: null,
    status: "",
    hasError: false,
    errorLog: "",
};

test("length of posts should ne increment", () => {
    //arrange
    const action = actions.addPostActionCreator("Hey Andrii!");

    //act
    const newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(4);
});

test("message of new post should be correct", () => {
    //arrange
    const action = actions.addPostActionCreator("Hey Andrii!");

    //act
    const newState = profileReducer(state, action);

    //assertions
    expect(newState.posts[3].message).toBe("Hey Andrii!");
});

test("after deleting length of message should be decrement", () => {
    //arrange
    const action = actions.deletePost(4);

    //act
    const newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(3);
});

test("after deleting length shouldn't be decrement id ID is incorrect", () => {
    //arrange
    const action = actions.deletePost(50);

    //act
    const newState = profileReducer(state, action);

    //assertions
    expect(newState.posts.length).toBe(3);
});
