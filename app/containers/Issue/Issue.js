import { CapButton } from '@capillarytech/cap-ui-library';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getIssueSuccess} from '../../actions/index';
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
    <div className='container'>
      <div style={{ marginTop: '20px', textAlign:'center', backgroundColor:"#ebe8e8"}}>
        <h3 style={{paddingTop:"20px"}}>{`Issue #${id}`}</h3>
        {props.issues.filter(issue => issue.id == id).map(issue => (
          <div key={issue.id}>
           {issue.state=="open"?
           <Link to={{ pathname: `https://github.com/vmg/redcarpet/issues/${issue.number}` }} target="_blank" ><CapButton>Open Issue</CapButton></Link>
           :<CapButton disabled>Closed Issue</CapButton>}
            <h3 style={{marginTop:"20px"}}>{issue.title}</h3>
            <p data-testid="issueBody" style={{padding:"0 50px 20px 50px", fontSize:"20px",fontFamily:"sans-serif"}}>{issue.body}</p><br />
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
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
