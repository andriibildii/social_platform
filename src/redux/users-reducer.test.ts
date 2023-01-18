import usersReducer, { actions, InitialStateType } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: "User 0",
                followed: false,
                photos: { small: null, large: null },
                status: "status 0",
            },
            {
                id: 1,
                name: "User 1",
                followed: false,
                photos: { small: null, large: null },
                status: "status 1",
            },
            {
                id: 2,
                name: "User 2",
                followed: true,
                photos: { small: null, large: null },
                status: "status 2",
            },
            {
                id: 3,
                name: "User 3",
                followed: true,
                photos: { small: null, large: null },
                status: "status 3",
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    };
})

test("follow success", () => {
    //arrange

    //act
    const newState = usersReducer(state, actions.followSuccess(1))

    //assertions
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
});

test("unfollow success", () => {
    //arrange

    //act
    const newState = usersReducer(state, actions.unFollowSuccess(3))

    //assertions
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
});
