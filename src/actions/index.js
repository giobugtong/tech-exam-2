export const addUser = (user) => {
    return {
        type: "ADD",
        payload: user
    }
};

export const editUser = (user) => {
    return {
        type: "EDIT",
        payload: user
    }
};

export const deleteUser = (user) => {
    return {
        type: "DELETE",
        payload: user
    }
};

export const deleteAll = () => {
    return {
        type: "DELETE_ALL"
    }
};

export const sort = (sortMethod) => {
    return {
        type: "SORT",
        payload: sortMethod
    }
};