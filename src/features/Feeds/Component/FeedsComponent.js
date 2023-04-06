import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
//import { Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { getCurrentUserDetails } from '../../../Auth';
import Routers from '../../../routes/Routers';
import { BASE_URL } from '../../../Services/ApiHandler';
import { allCategoriesApi } from '../../Categories/Service/ApiHandler';
import { allFeedsApi } from '../Service/ApiHandler';
import '../StyledComponent/Style.css';
import FeedsByCategory from './FeedsByCategory';

const FeedsComponent = () => {

    const [allFeeds, setAllFeeds] = useState([]);

    const [allCategories, setAllCategories] = useState([]);

    const [currentCatId, setCurrentCatId] = useState(0);

    const [style, setStyle] = useState({
      fontSize: '15px',
      fontWeight: '',
      color: 'black'
    })

    const [error, setError] = useState('');

    const [selectedTab, setSelectedTab] = useState(0);


  //   const navigate = useNavigate();

  //   const addedDate = (date) => {
  //   return new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  // }

    function allFeedsData() {
        allFeedsApi(getCurrentUserDetails().id).then((resp) => {
          console.log("All feeds by id - ");
          console.log(resp);
          setAllFeeds(resp);
          console.log(getCurrentUserDetails().id);
        }).catch(err => {
          console.log('Error -- ' + err);
          setError(err);
        });
    }

    function allCategoriesData() {
      allCategoriesApi().then((resp) => {
        console.log('All Categorries - ');
        console.log(resp);
        setAllCategories(resp.data);
      })
    }

    const handleOnlyAllPostTab = () => {
      setCurrentCatId(0);
      console.log('Clicked - ' + 0);
      if(currentCatId === 0) {
        //setStyle({fontSize: '17px', fontWeight: 'bold', color:isHovering ? 'red' : 'back'})
      }
      if(currentCatId != 0) {
        //setStyle({fontSize: '15px', fontWeight: '', color:isHovering ? 'black' : 'black'})
      }
    }

    const handleCategoryTabs = (id) => {
      setCurrentCatId(id);
      console.log('Clicked - ' + id)
      console.log('CurrentCatId -->> ' + currentCatId);
      if(currentCatId === id) {
        //setStyle({fontSize: '15px', fontWeight: 'bold', textDecoration:isHovering ? 'underline' : 'none'})
      }
      if(currentCatId != id) {
        //setStyle({fontSize: '15px', fontWeight: '', textDecoration:isHovering ? 'underline' : 'none'})
      }
    }
    


    useEffect(() => {
        allFeedsData();
        allCategoriesData();
        console.log('Current - ' + currentCatId);
    }, [currentCatId])

  //   console.log('Len All Feeds - ' + allFeeds.length);


  return (
    <>
      
      <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Horizontal NavBar Starts */}
        <div className="categoryTabs">
          <nav className="navbars text-justify">
            <Link className="navbar-brand text-secondary" to="/user/my-feeds" onClick={() => handleOnlyAllPostTab()} style={style} >All Posts</Link>
            {
              allCategories.map((category, index) => {
                return (
                 <Link className="navbar-brand text-secondary mx-3" to="/user/my-feeds" onClick={() => handleCategoryTabs(category.categoryId)} style={style} key={index} >{category.category_title}</Link>
                )
              })
            }
          </nav>
        </div>
        {/* Horizontal NavBar Ends */}
      </Grid>
      <Grid item xs={12}>
        {/* <Routers /> */}
      <FeedsByCategory cid={currentCatId} uid={getCurrentUserDetails().id}/>
      </Grid>
    </Grid>

        

      
    </>
  );
}

export default FeedsComponent
