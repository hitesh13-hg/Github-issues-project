export const GET_ISSUE = 'GET_ISSUE';
export const GET_ISSUE_SUCCESS = 'GET_ISSUE_SUCCESS';

export function getIssue() {
  return {
    type: GET_ISSUE,
  };
}

export function getIssueSuccess(data) {
  return {
    type: GET_ISSUE_SUCCESS,
    issues: data,
  };


}
