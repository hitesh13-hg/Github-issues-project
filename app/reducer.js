import { GET_ISSUE ,GET_ISSUE_SUCCESS} from "./actions";
const initialState= {issues:[], error:null};
function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_ISSUE:
      return {
        ...state,
        error: null
      };
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        issues: action.issues
      };
      default:{
        return state;
      }
    }}

export default reducer;