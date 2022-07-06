import React, { useState, useEffect } from 'react';
export default function Issue(props) {
  const id = props.match.params.id;

  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch(APIurl);
    const data = await response.json();
    setIssues(data);
  }

  return (
    <div>
      <div className="container">
        <h2>{`Issue ${id}`}</h2>
        {
          issues.filter(issue => issue.id == id).map(issue => {
            return(
              <div key = {issue.id}>
                <h2>{issue.title}</h2>
                <p>{issue.body}</p>
              </div>
          )})
        }
      </div>
    </div>
  );
}
