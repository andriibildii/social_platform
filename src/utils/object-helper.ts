import { UsersType } from "../types/types";

export const updateObjectInArray = (
    items: UsersType[],
    itemId: number,
    objectPropName: keyof UsersType,
    newObjectProps: {
        followed: boolean;
    }
) => {
    return items.map((item) => {
        if (item[objectPropName] == itemId) {
            return { ...item, ...newObjectProps };
        }
        return item;
    });
};
