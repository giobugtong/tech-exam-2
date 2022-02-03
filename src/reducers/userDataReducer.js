import userData from "../data.json";

const userDataReducer = (state = userData, action) => {
    switch(action.type) {
        case "ADD":
            state = [...state, action.payload];
            return state;
        case "DELETE":
            const deleteIndex = state.findIndex(item => item.id === action.payload.id);
            state.splice(deleteIndex, 1);
            return state;
        case "DELETE_ALL":
            state = [];
            return state;
        case "EDIT":
            const editIndex = state.findIndex(user => parseInt(user.id) === parseInt(action.payload.id));
            state[editIndex] = action.payload;
            return state;
        case "SORT":
            const sorted = state.slice().sort((x, y) => {
                if (action.payload.header === "id") {
                    if (parseInt(x.id) > parseInt(y.id)) return 1;
                    if (parseInt(x.id) < parseInt(y.id)) return -1;
                    return 0;
                }
                if (action.payload.header === "city") {
                    if (x.address.city.toLowerCase() > y.address.city.toLowerCase()) return 1;
                    if (x.address.city.toLowerCase() < y.address.city.toLowerCase()) return -1;
                    return 0;
                }
                if (x[action.payload.header].toLowerCase() > y[action.payload.header].toLowerCase()) return 1;
                if (x[action.payload.header].toLowerCase() < y[action.payload.header].toLowerCase()) return -1;
                return 0;
            })
            const reversed = sorted.slice().reverse();
            if (action.payload.reverseSort) {
                state = reversed;
                return state;
            }
            state = sorted;
            return state;
        default:
            return state;
    }
}

export default userDataReducer;