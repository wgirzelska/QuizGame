export const INITIAL_STATE = {
    question: "",
    answersList: [],
    correctAnswer: "",
    category: "",
    type: ""
}

export const formReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }
        case "ADD_ANSWERS":
            return {
                ...state,
                answersList:[...state.answersList, action.payload]
            }
        default:
            return state;
    }
}

