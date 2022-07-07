import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Issue(props) {
  const id = props.match.params.id;

  // The API URL.
  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  // useState.
  // useEffect.
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    // dispatch(getIssue());
    await fetch(APIurl)
      .then(response => response.json())
      .then(data => props.handleIssue(data));
    // getIssueSuccess(data);
    // setIssues(data);
  }

  return (
    <div>
      <div className="container">
        <h2>{`Issue ${id}`}</h2>
        {props.issues.filter(issue => issue.id == id).map(issue => (
          <div key = {issue.id}>
            <h2>{issue.title}</h2>
            <p>{issue.body}</p>
          </div>
        ))
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state.get('reducer').issues);
  return {
    issues: state.get('reducer').issues,
    loading: state.get('reducer').loading,
  };
};

const mapDispatchToProps = dispatch => ({
  handleIssue : (data)=> dispatch(getIssueSuccess(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issue);
