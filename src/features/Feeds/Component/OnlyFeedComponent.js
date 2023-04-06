import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input } from 'reactstrap';
import { getCurrentUserDetails, isLoggedIn } from '../../../Auth';
import { BASE_URL } from '../../../Services/ApiHandler';
import NewFeedComponent from '../../NewFeed/Component/NewFeedComponent';
import UpdateFeed from '../../NewFeed/Container/UpdateFeed';
import { addCommentByPostApi, deleteCommentsByPostApi, feedImageUrl, getCommentsByPostApi, onlyFeedApi } from '../Service/ApiHandler';

const OnlyFeedComponent = () => {

  const [feed, setFeed] = useState();

  const [comments, setComments] = useState([]);

  const [addComment, setAddComment] = useState({
    comment_content: ''
  })

  const [viewUpdate, setViewUpdate] = useState(false);

  const [viewComments, setViewComments] = useState(false);

  const [login, setLogin] = useState(false);

  const {post_id} = useParams();

  const addedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  const handleEditPost = () => {
    setViewUpdate(true)
    console.log('Edit Clicked!!');
    
  }
  
  

  function getFeed() {
    onlyFeedApi(post_id).then((resp) => {
      
      console.log('OnlyFeed - ');
      console.log(resp);
      setFeed(resp);
    }).catch((error) => {
      console.log('Error - ' + error);
    })
  }

  function getAllCommentsByPost() {
    getCommentsByPostApi(post_id).then((resp) => {
      console.log('Comments By Post - ');
      console.log(resp);
      setComments(resp);
      setViewComments(true);
    }).catch((err) => {
      console.log('Error  - ');
      console.log(err);
      setViewComments(false);
    })
  }

  const handleNewCommentChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setAddComment({...addComment, [name]: value});
  }

  const handlePostComment = () => {
    addCommentByPostApi(addComment, getCurrentUserDetails().id, post_id).then(resp => {
      comments && (setComments([resp, ...comments]));
      setAddComment({comment_content: ''});
      console.log('Comment added!!');
      toast.success('Comment added!!', {position: toast.POSITION.BOTTOM_CENTER})
    }).catch(err => {
      console.log('Error - ');
      console.log(err);
      toast.error(err.response.data.error, {position: toast.POSITION.BOTTOM_CENTER})
    })
  }

  const handleCancel = () => {
    setAddComment({comment_content: ''});
  }

  const handleDeleteComment = (comment_id) => {
    const userConfirmation = window.confirm("Are you sure you want to delete your comment?")

    if(userConfirmation === true) {
      deleteCommentsByPostApi(comment_id).then((resp) => {
        setComments(comments.filter(ce => {return(ce.commentId != comment_id)}));
        toast.success("Comment deleted!!", {position: toast.POSITION.BOTTOM_CENTER})
      }).catch(err => {
        toast.error(err.response.data.error);
      })
    }
    else {
      toast.error("Comment not deleted!!", {position: toast.POSITION.BOTTOM_CENTER})
    }
  }


  useEffect(() => {
    setLogin(isLoggedIn());
    console.log('User - ');
    console.log(getCurrentUserDetails());
    getFeed();
    getAllCommentsByPost();
  }, [])


// Sorting Comments
    const sortCommentsByTime = [...comments].sort((a, b) =>  a.commentAddedDate - b.commentAddedDate);


  const commentSection = <>
    {
      sortCommentsByTime.map((ce, index) => {
        return (
          <div className='comment m-1 my-4' key={index}>
            <Grid container spacing={2}>
              <Grid item xs={0.35}>
                <img className='rounded-circle' src={`${BASE_URL}/api/post/image/${ce.user.profileImage}`} alt="Image" width="30" height="30" />
              </Grid>
              <Grid item xs={11}>
                <p className='text-justify'><b>{ce.user.name}</b> <small>{addedDate(ce.commentAddedDate)}</small></p>
                <div className='commentContent m-1'>
                  <p className='text-justify'>{ce.comment_content}</p>
                </div>
              </Grid>
              <Grid className='' item xs={0.65}>
              <div className="menu-nav">
                
                  
                  <div className="dropdownComment-container" tabIndex="-1">
                    <div className="three-dots"></div>
                    <div className="dropdownComment border rounded m-1 p-1">
                      {
                        login && getCurrentUserDetails().id === ce.user.id && (
                        <div className='dropdownCommentMenu' onClick={() => handleDeleteComment(ce.commentId)}>Delete comment?</div>
                        )
                      }
                      {
                        login && getCurrentUserDetails().id != ce.user.id && (
                        <div className='dropdownCommentMenuNot' disabled>Cannot Delete this comment!</div>
                        )
                      }
                      {
                        !login && (
                        <div className='dropdownCommentMenuNot' disabled>Cannot Delete this comment!</div>
                        )
                      }
                    </div>
                    
                  </div>
                  
                
              </div>

              </Grid>
            </Grid>
            <hr/>
          </div>
        )
      })
    }
  </>

  

  const post = <>
    {feed && (
      <div>
        <div className="tile mx-4 card-header">
          <div className="mx-4 my-3 text-justify">
            Posted By <b>{feed.user.name}</b> on{" "}<b>{addedDate(feed.added_date)}</b>
            {login && feed.user.id===getCurrentUserDetails().id && (<div className='updateButton text-right'><span className='material-symbols-outlined' title='Edit this post' onClick={handleEditPost}>Update</span></div>)}
            </div>
          <h1 className="text-lg-left mx-4">{feed.post_title}</h1>
          <img className='my-3' src={`${BASE_URL}/api/post/image/${feed.image}`} alt="DefaultImage" width="1000" height="450" />
          <p className="mx-4 text-justify" style={{fontFamily: 'Nunito Sans'}} dangerouslySetInnerHTML={{__html:feed.post_content}} />
          <br/>
          <span>------------------------Thank you for Reading------------------------</span>
        </div>
        
        <div className='mx-4 m-4'>
          {/* <p className="text-justify" style={{fontSize: '25px'}}>{comments.length} Comments</p> */}
          {comments.length!=1 ? <p className="text-justify" style={{fontSize: '25px'}}>{comments.length} Comments</p> : <p className="text-justify" style={{fontSize: '25px'}}>{comments.length} Comment</p>}
          {login && (
            <div className='text-right'>
              <Input className='commentInput my-2' type='text' name="comment_content" value={addComment.comment_content} onChange={handleNewCommentChange} placeholder='Add a comment...' autoComplete='off'></Input>
              <Button className='btn btn-outline-secondary mx-1' onClick={handleCancel}>Cancel</Button>
              <Button className='btn btn-outline-secondary mx-1' onClick={handlePostComment}>Comment</Button>
            </div>
          )}
          {viewComments ? comments.length === 0 ? <p>No Comments!! You can give your feedback.</p> : commentSection : <p>No Comments!! You can give your feedback.</p>}
        </div>
        
        
      </div>
      )}
  </>

  const update = <UpdateFeed data={feed} />

  

  return (
    <div>
      {/* {feed && (
        <div className="tile mx-4 card-header">
          <div className="mx-4 my-3 text-justify">
            Posted By <b>{feed.user.name}</b> on{" "}<b>{addedDate(feed.added_date)}</b>
            <div className='updateButton text-right'><span className='material-symbols-outlined' title='Edit this post' onClick={handleEditPost}>Update</span></div>
            </div>
          <h1 className="text-lg-left mx-4">{feed.post_title}</h1>
          <img className='my-3' src={`${BASE_URL}/api/post/image/${feed.image}`} alt="DefaultImage" width="1000" height="450" />
          <p className="mx-4 text-justify" style={{fontFamily: 'Nunito Sans'}} dangerouslySetInnerHTML={{__html:feed.post_content}} />
          <br/>
          <span>------------------------Thank you for Reading------------------------</span>
        </div>
      )} */}

      {viewUpdate ? update : post}

    </div>
  );
}

export default OnlyFeedComponent
