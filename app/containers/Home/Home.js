import React, { useEffect, useState } from 'react';
import { IssueOpenedIcon, CheckIcon } from '@primer/octicons-react';
import {
  CapButton,CapHeading,CapLabel,CapSearchBar,CapSpin,
} from '@capillarytech/cap-ui-library';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import { getIssue, getIssueSuccess, increment } from '../../actions';
import { Alert } from 'antd';
import axios from 'axios';

const Home = props => {
  // The API URL.
  const APIurl = 'https://api.github.com/repos/vmg/redcarpet/issues?state=all';
  // useState.
  const [radio,setRadio]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(13);
  const [searchTerm,setSearchTerm] = useState("");
  // useEffect.
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    props.handleLoad();
    await axios.get(APIurl).then(data =>{
      props.handleIssue(data.data)
    })
  }

  // for pagination
  const openIssue=props.issues.filter(issue => issue.state === 'open');
  const open = openIssue.length;
  const closedIssue=props.issues.filter(issue => issue.state === 'closed')
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts=props.issues.slice(indexOfFirstPost, indexOfLastPost) ;
  let totalLength=props.issues.length;
  if (radio=="open"){
    currentPosts=openIssue.slice(indexOfFirstPost, indexOfLastPost);
    totalLength=open;
  }
  else if (radio=="closed"){
    currentPosts=closedIssue.slice(indexOfFirstPost, indexOfLastPost);
    totalLength=closedIssue.length;
  }
  else if(radio == "reset"){
    currentPosts=props.issues.slice(indexOfFirstPost, indexOfLastPost);
    totalLength = props.issues.length;
  }
  
  if(searchTerm != ""){
    let searchPosts = [];
    if(radio == "open"){
    searchPosts = openIssue.filter(issue => {
     return(issue.title.toLowerCase().includes(searchTerm.toLowerCase())) 
      })
    }
    else if(radio == "closed"){
      searchPosts = closedIssue.filter(issue => {
       return(issue.title.toLowerCase().includes(searchTerm.toLowerCase())) 
        })
    }
    else{
      searchPosts = props.issues.filter(issue => {
        return(issue.title.toLowerCase().includes(searchTerm.toLowerCase())) 
         })
    }
    currentPosts = searchPosts.slice(indexOfFirstPost, indexOfLastPost);
    totalLength = searchPosts.length;
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>   
    <CapHeading type = "h1" style={{margin:'20px 0 20px 0',textAlign:'center'}}>Issues of Redcarpet's Repository</CapHeading>
    <div className="container" style={{display:'flex'}}>
      <div style={{marginRight:'30px'}}>
            <CapHeading type="h3">Filter Issues By:</CapHeading><br />
            <h6>#Status</h6>
            <input type="radio" id="open" name="iss" value={radio} onChange={()=>setRadio("open")} />
            <label htmlFor="open" style={{fontSize:'16px',marginLeft:'7px',fontFamily:'sans-serif'}}>Open Issues</label><br/>
            <input type="radio" id="closed" name="iss" value={radio} onChange={()=>setRadio("closed")} />
            <label htmlFor="closed" style={{fontSize:'16px',marginLeft:'7px',fontFamily:'sans-serif'}}>Closed Issues</label><br/>
            <button className='btn-success' id="reset" name="iss" value={radio} 
            onClick={()=>
              {setRadio("reset")
              document.getElementById("closed").checked = false;
              document.getElementById("open").checked = false;
              }
              }>Reset All</button>
      </div>
      
      <div>
        {props.loading ? (
          <div className='container'>
            <CapSpin 
            style={{
              display: 'table',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            size = "large"
          >
             <Alert
                message="Loading Content"
                description="Issues are loaded please wait..."
                type="info"
              />
          </CapSpin>
          </div>
          
        ) : (
          <div>
            <div>
              <CapButton style={{ float: 'right' }}>Add Issue</CapButton>
              <CapSearchBar style={{width : '20rem',float : 'right',marginRight : '1rem'}} 
              onChange={(e)=> setSearchTerm(e.target.value)} placeholder = "Search issues"/>
              </div>
              <div style={{ fontSize: '20px', fontFamily: 'sans-serif'}}>
              <IssueOpenedIcon size={20} /> {open} Open issues{' '}
              <CheckIcon size={20} /> {props.issues.length - open} Closed issues
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
                    <td>{new Date(issue.created_at).toLocaleString()}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalLength}
              paginate={paginate}
            />
          </div>
        )}
      </div>
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
