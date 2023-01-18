export const updateObjectInArray = (
    items: any,
    itemId: any,
    objectPropName: any,
    newObjectProps: any
) => {
    return items.map((item: any) => {
        if (item[objectPropName] === itemId) {
            return { ...item, ...newObjectProps };
        }
        return item;
    });
};
