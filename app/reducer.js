import { GET_ISSUE, GET_ISSUE_SUCCESS } from './actions';
const initialState = { issues: [], error: null, loading: false };

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        issues: action.issues,
        loading: false,
      };
    default: {
      return state;
    }
  }
}

export default reducer;
