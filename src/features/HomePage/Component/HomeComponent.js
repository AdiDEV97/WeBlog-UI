import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BASE_URL } from '../../../Services/ApiHandler';
import { allPostsApi, allPostsByCategoryApi } from '../Services/ApiHandler';
import '../StyledComponent/Style.css';

const HomeComponent = () => {

  const [allPosts, setAllPosts] = useState([]);

  const [error, setError] = useState('');

  const addedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  const getAllPosts = () => {
    allPostsApi(0, 10).then((resp) => {
      console.log('-------------All Posts------------');
      console.log(resp.data);
      setAllPosts(resp.data);
    }).catch((err) => {
      console.log('Error!!');
      setError(err.message);
    })
  }

  const handlePageChange = (pageNumber=0, pageSize=5) => {

    allPostsApi(pageNumber, pageSize).then(resp => {
      console.log('Page - ');
      console.log(resp.data);
      setAllPosts(resp.data);
    }).catch(err => {
      console.log('Error - ');
      console.log(err);
    })

    window.scroll(0, 0);

  }

  useEffect(() => {
    getAllPosts();
    document.title = 'Weblog - Home';
    console.log('allPost array - ');
    console.log(allPosts.totalPages);
    
  }, [])
  
  

  return (
    <div>
      <h3>Reading Room</h3>
      <div className="container text-justify my-4">
        {
              allPosts.length!=0 && error === '' && (
                allPosts.content.map((feed, index) => {
                  console.log('Length - ' + allPosts.content.length);
                  return (
                    <div>
                      <Grid className="bg-light my-4 p-2" container spacing={2} key={index}>
                          <Grid item xs={10}>
                              <div className="tile">
                                  <p className="text-justify mx-3" style={{fontSize:"12px"}}>Posted By <b>{feed.user.name}</b> on{" "}<b>{addedDate(feed.added_date)}</b></p>
                                  <h5 className="text-justify mx-3">{feed.post_title}</h5>
                                  <p className="text-justify mx-3" dangerouslySetInnerHTML={{__html:feed.post_content.trim().substring(0, 200) + "..."}} />
                                  {/* <p className="text-justify mx-3" dangerouslySetInnerHTML={{__html:'<p>{feed.post_content}</p>'}} /> */}
                                  <span className="text-left mx-3"><Link className="readMore btn btn-outline-secondary border my-2" to={`/all-posts/feed/${feed.post_id}`}>Read Full Article</Link></span>
                                  
                              </div>
                          </Grid>
                          <Grid item xs={2} className='p-0'>
                              <p className='categoryName p-1'>{feed.category.category_title}</p>
                              <img className='text-justify my-2 mx-1 p-2' src={`${BASE_URL}/api/post/image/${feed.image}`} alt="Image" width="180" height="140" />
                          </Grid>
                      </Grid>
                    </div>
                  );
              }))
          }
            
            <Pagination>
              <PaginationItem disabled={allPosts.pageNumber===0} onClick={() => handlePageChange(--allPosts.pageNumber, allPosts.pageSize)}>
                <PaginationLink>Previous</PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={allPosts.pageNumber===0} onClick={() => handlePageChange(allPosts.pageNumber=0, allPosts.pageSize)}>
                <PaginationLink>First</PaginationLink>
              </PaginationItem>
              {
                
                [...Array(allPosts.totalPages)].map((page, index) => {
                  return(
                    <PaginationItem className="paging" onClick={() => handlePageChange(index, allPosts.pageSize)} active={index===allPosts.pageNumber} key={index}>
                      <PaginationLink>{index+1}</PaginationLink>
                    </PaginationItem>
                  )
                })
              }
              <PaginationItem disabled={allPosts.last===true} onClick={() => handlePageChange(allPosts.totalPages-1, allPosts.pageSize)}>
                <PaginationLink>Last</PaginationLink>
              </PaginationItem>
              <PaginationItem disabled={allPosts.last===true} onClick={() => handlePageChange(++allPosts.pageNumber, allPosts.pageSize)}>
                <PaginationLink>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
          {
            allPosts.length===0 || error !='' && (
              <p className='text-lg-center my-5'>No Feed Found!!</p>
            )
          }
    </div>
  )
}

export default HomeComponent
