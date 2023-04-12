import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUserDetails } from '../../../Auth';
import { BASE_URL } from '../../../Services/ApiHandler';
import { allCategoriesApi } from '../../Categories/Service/ApiHandler';
import { allFeedsApi, CategoryFeedsApi, deleteFeedApi } from '../Service/ApiHandler';
import '../StyledComponent/Style.css';

const FeedsByCategory = (props) => {

    const [allFeeds, setAllFeeds] = useState([]);

    const [allCategories, setAllCategories] = useState([]);

    const [postTabId, setPostTabId] = useState(0);

    const [error, setError] = useState('');

    const addedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

    function allFeedsData() {
        allFeedsApi(getCurrentUserDetails().id).then((resp) => {
        console.log("All feeds by id - ");
        console.log(resp);
        setAllFeeds(resp);
        console.log(getCurrentUserDetails().id);
        setError('');
        }).catch(err => {
        console.log('Error - ' + err);
        if(err) {
          setError(err.message);
        }
        });
    }

    function categoryFeedsData() {
        CategoryFeedsApi(getCurrentUserDetails().id, props.cid).then((resp) => {
          console.log("All feeds by id - ");
          console.log(resp);
          setAllFeeds(resp);
          console.log(getCurrentUserDetails().id);
          setError('');
        }).catch(err => {
          console.log('Error - ');
          console.log(err.message);
          console.log("Error Type - ", typeof(err.message));

          if(err) {
            setError(err.message);
          }
        });
    }


    function allCategoriesData() {
      allCategoriesApi().then((resp) => {
        console.log('All Categorries - ');
        console.log(resp.data);
        setAllCategories(resp.data);
      })
    }

    const handleDelete = (feedId) => {
      console.log('Delete Clicked - ' + feedId);
      let userConfirmation = window.confirm("Are you sure you want to delete this feed?");

      if(userConfirmation === true) {
        deleteFeedApi(feedId).then((resp) => {
          setAllFeeds(allFeeds.filter((ce) => {return ce.post_id != feedId}));
          toast.success("Post deleted succcesfully!!", { position: toast.POSITION.BOTTOM_CENTER });
        }).catch((err) => {console.log(err)});
      }
      else {
        toast.error("Post not deleted!!", { position: toast.POSITION.BOTTOM_CENTER });
      }
    }
    

    useEffect(() => {
      document.title = 'Weblog - My Feeds';

      console.log('PROPS -----------------');
      console.log(props);

      allCategoriesData();
      setPostTabId(props.cid);
      if(postTabId===0 || props.cid ===0) {
          allFeedsData();
      }
      else {
          categoryFeedsData();
      }

      console.log('Data from FeedComponent - ' + props.cid);
      console.log(props.cid);
  }, [props, postTabId])

    console.log('Len All Feeds -- ' + allFeeds.length);


  return (
    <div>
      {/* <h3>{postTabId===0 ? "My Realm - AllPosts" : `My Realm - ${allCategories[postTabId-1].category_title}`}</h3> */}
      <h3>My Realm</h3>
      <div className="container text-justify my-4">
        {
            allFeeds.length!=0 && error === '' && (
              allFeeds.map((feed, index) => {
                console.log('Length - ' + allFeeds.length);
                return (
                    <Grid className="bg-light my-4 p-2" container spacing={2} key={index}>
                        <Grid item xs={10}>
                            <div className="tile">
                                <p className="text-justify mx-3" style={{fontSize:"12px"}}>Posted By <b>{feed.user.name}</b> on{" "}<b>{addedDate(feed.added_date)}</b></p>
                                <h5 className="text-justify mx-3">{feed.post_title}</h5>
                                <p className="text-justify mx-3" dangerouslySetInnerHTML={{__html:feed.post_content.substring(0, 200).trim() + "..."}} />
                                <span className="text-left mx-3"><Link className="readMore btn btn-outline-secondary border my-2" to={`/user/my-feeds/feed/${feed.post_id}`}>Read Full Article</Link></span>
                                
                            </div>
                        </Grid>
                        <Grid item xs={2} className='p-0'>
                            
                            <p className='categoryName text-right'>{feed.category.category_title}
                            <span className='deleteButton material-symbols-outlined mx-2' color='danger' onClick={() => handleDelete(feed.post_id)}>Delete</span>
                            </p>
                            
                            <img className='text-justify my-2 mx-1 p-2' src={`${BASE_URL}/api/post/image/${feed.image}`} alt="Image" width="180" height="140" />
                        </Grid>
                    </Grid>
                );
            })
            )
        }
        {
          allFeeds.length===0 || error !='' && (
            <p className='text-lg-center my-5'>No Feed Found!!</p>
          )
        }
      </div>
    </div>
  );
}

export default FeedsByCategory
