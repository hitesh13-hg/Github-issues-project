import React, { useEffect, useState } from 'react';
import { IssueOpenedIcon, CheckIcon } from '@primer/octicons-react';
import { CapButton } from '@capillarytech/cap-ui-library';
import Pagination from './Pagination';
const Home = () => {
  // The API URL.
  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  // useState.
  const [issues, setIssues] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // useEffect.
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    const response = await fetch(APIurl);
    const data = await response.json();
    setIssues(data);
  }
  const open = issues.filter(issue => issue.state === 'open').length;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = issues.slice(indexOfFirstPost,indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container" style={{ marginTop: '20px' }}>
        <h3> Issues of Redcarpet Repository</h3>
        <div style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>
          <IssueOpenedIcon size={20} /> {open} Open issues{' '}
          <CheckIcon size={20} /> {issues.length - open} Closed issues
          <CapButton style={{ float: 'right' }}>Add Issue</CapButton>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Issue Id</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Created at</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(issue => (
              <tr key={issue.id}>
                <th scope="row">{issue.id}</th>
                <td style={{ fontWeight: 'bold' }}>{issue.title}</td>
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
            ))}
          </tbody>
        </table>
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts = {issues.length}
          paginate = {paginate}
        />
      </div>
    </div>
  );
};

export default Home;
