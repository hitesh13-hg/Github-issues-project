export const GET_ISSUE = 'GET_ISSUE';
export const GET_ISSUE_SUCCESS = 'GET_ISSUE_SUCCESS';
/*export const GET_ISSUE_FAILURE = 'GET_ISSUE_FAILURE';
export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';
 */

export function getIssue() {
    return {
      type: GET_ISSUE
    };
  }
  
  export function getIssueSuccess(data) {
    return {
      type: GET_ISSUE_SUCCESS,
      issues:data
    };
  }