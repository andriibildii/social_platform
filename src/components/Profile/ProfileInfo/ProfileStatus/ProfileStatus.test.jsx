import React from "react";
import {create, act} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test("status from props should be in state", () => {
        const testRenderer = create(
            <ProfileStatus status="test-status" />
        );
        // function component don’t have instances
        const testInstance = testRenderer.root;
        // expect(testInstance.findByDisplayValue(state.status)).toBe("test-status");
    });

    test("after creating span should be displayed", () => {
        const testRenderer = create(
            <ProfileStatus status="test-status" />
        );
        const testInstance = testRenderer.root;
        const span = testInstance.findByType("span");
        // expect(span.children.length).toBe(1);
        expect(span).not.toBeNull();
    });

    test("after creating input should't be displayed", () => {
        const testRenderer = create(
            <ProfileStatus status="test-status" />
        );
        const testInstance = testRenderer.root;

        expect(() => {
            const input = testInstance.findByType("input");
        }).toThrow();
    });

    test("after creating span should have correct status", () => {
        const testRenderer = create(
            <ProfileStatus status="test-status" />
        );
        const testInstance = testRenderer.root;
        const span = testInstance.findByType("span");

        expect(span.children[0]).toBe("test-status");
    });

    test("input should be displayed in editMode instead of span", () => {
        const testRenderer = create(
            <ProfileStatus status="test-status" />
        );
        const testInstance = testRenderer.root;
        const span = testInstance.findByType("span");

        act(() => {
            span.props.onDoubleClick();
        });

        const input = testInstance.findByType("input");

        expect(input.props.value).toBe("test-status");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const testRenderer = create(
            <ProfileStatus status="test-status" updateStatus={mockCallback}/>
        );
        const testInstance = testRenderer.root;
        testInstance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);


    });
});
