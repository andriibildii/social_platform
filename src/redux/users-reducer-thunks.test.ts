import { actions, followThunkCreator, unfollowThunkCreator } from "./users-reducer";
import { userAPI } from "../api/userAPI";
import { ResponseType, ResultCodesEnum } from "../api/api";

jest.mock("../api/userAPI");

const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;
const result: ResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: [],
};

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unFollow.mockClear();
})

test("success follow thunk", async () => {
    //arrange
    userAPIMock.follow.mockReturnValue(Promise.resolve(result));
    const thunk = followThunkCreator(1);

    //act
    // for call thunk you need to give dispatch

    await thunk(dispatchMock, getStateMock, {});

    //assertions
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("success unfollow thunk", async () => {
    //arrange
    userAPIMock.unFollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollowThunkCreator(1);

    //act
    // for call thunk you need to give dispatch
    await thunk(dispatchMock, getStateMock, {});

    //assertions
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
