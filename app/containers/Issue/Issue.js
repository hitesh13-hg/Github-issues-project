import React, { useState, useEffect } from 'react';
export default function Issue(props) {
  const [issue, setIssue] = useState([]);
  const id = props.match.params.id;
  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    const response = await fetch(APIurl);
    const data = await response.json();
    console.log(data);
    let curr_issue = data.filter((issu) => {
      //console.log(issue.id);
      return (id == issu.id)
    })
    console.log(curr_issue);
    setIssue(curr_issue);
    
  }
  //console.log(issues)
  console.log("heyrrebtb",issue)
  console.log(id)
  // let {id}=useParams();
  //let curr_issue = issues.filter((issue) => {
    //console.log(issue.id);
  //  return (id == issue.id)
  //});
  //console.log("hey",curr_issue);
  return (
    <div>
      <div className="container">
        <h2>{`Issue ${id}`}</h2>
        <h2>{issue[0].title}</h2>
        <br />
        <p>{issue[0].body}</p>
      </div>
    </div>
  );
}
