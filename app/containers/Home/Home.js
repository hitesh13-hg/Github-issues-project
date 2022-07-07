import React, { useEffect, useState } from 'react';
import { IssueOpenedIcon, CheckIcon } from '@primer/octicons-react';
import {
  CapButton,
  CapHeading,
  CapSearchBar,
  CapSideBar,
  CapSpin,
} from '@capillarytech/cap-ui-library';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import { getIssue, getIssueSuccess, increment } from '../../actions';
import { Alert } from 'antd';

const Home = props => {
  // The API URL.
  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  // useState.
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(13);
  // useEffect.
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    props.handleLoad();
    await fetch(APIurl)
      .then(response => response.json())
      .then(data => props.handleIssue(data));
  }

  // for pagination
  const open = props.issues.filter(issue => issue.state === 'open').length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.issues.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container" style={{ marginTop: '20px' }}>
        <CapHeading type = "h1">Issues of Redcarpet's Repository</CapHeading>
        {props.loading ? (
          <CapSpin
            style={{
              display: 'table',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto'
            }}
            size = "large"
          >
             <Alert
                message="Loading Content"
                description="Issues are loaded please wait..."
                type="info"
              />
          </CapSpin>
        ) : (
          <div>
            <div style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>
              <IssueOpenedIcon size={20} /> {open} Open issues{' '}
              <CheckIcon size={20} /> {props.issues.length - open} Closed issues
              <CapButton style={{ float: 'right' }}>Add Issue</CapButton>
            </div>
            <table className="table table-striped" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col">Issue Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created at</th>
                </tr>
              </thead>
              <tbody>
                { currentPosts.map(issue => (
                  <tr key={issue.id}>
                    <th scope="row">{issue.id}</th>
                    <td>
                      <Link
                        style={{ fontWeight: 'bold', color: 'black' }}
                        to={`/issue/${issue.id}`}
                        target={"_blank"}
                      >
                        {issue.title}
                      </Link>
                    </td>
                    <td>
                      {issue.state === 'open' ? (
                        <IssueOpenedIcon size={15} color="red" />
                      ) : (
                        <CheckIcon size={15} color="green" />
                      )}{' '}
                      {issue.state}
                    </td>
                    <td>{issue.created_at}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={props.issues.length}
              paginate={paginate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => 
  //console.log(state.get('reducer').issues);
   ({
    issues: state.get('reducer').issues,
    loading: state.get('reducer').loading,
  })
;

const mapDispatchToProps = dispatch => ({
  handleIssue: data => dispatch(getIssueSuccess(data)),
  handleLoad: () => dispatch(getIssue()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
