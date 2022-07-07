import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Issue(props) {
  const id = props.match.params.id;

  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';

  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    await fetch(APIurl)
      .then(response => response.json())
      .then(data => props.handleIssue(data));
  }

  return (
    <div>
      <div style={{ marginTop: '20px' }} className="container">
        <h3>{`Issue ${id}`}</h3>
        {props.issues.filter(issue => issue.id == id).map(issue => (
          <div key={issue.id}>
            <h3>{issue.title}</h3>
            <h5>{issue.body}</h5>
          </div>
        ))}
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
  handleIssue: data => dispatch(getIssueSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issue);
