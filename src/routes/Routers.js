import React from 'react'
import { Routes, Route} from 'react-router-dom';
import UserProvider from '../Context/UserProvider';
import About from '../features/About/Container/About';
import AddNewCategory from '../features/Categories/Container/AddNewCategory';
import Test from '../features/Dashboard/Component/Test';
import Dashboard from '../features/Dashboard/Container/Dashboard';
import Feeds from '../features/Feeds/Container/Feeds';
import OnlyFeed from '../features/Feeds/Container/OnlyFeed';
import Header from '../features/Header/Container/Header';
import Home from '../features/HomePage/Container/Home';
import UpdatePassword from '../features/Login/Component/UpdatePassword';
import Login from '../features/Login/Container/Login';
import NewFeed from '../features/NewFeed/Container/NewFeed';
import UpdateFeed from '../features/NewFeed/Container/UpdateFeed';
import Profile from '../features/Profile/Container/Profile';
import Signup from '../features/Signup/Container/Signup';
import PrivateRoute from '../PrivateRoute';
import SecuredRoute from '../SecuredRoute';

const Routers = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/all-posts/feed/:post_id" element={<OnlyFeed />} />
      <Route path="/change-password" element={<UpdatePassword />} />
      

      <Route path="/user" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-feeds" element={<Feeds />} />
        <Route path="my-feeds/feed/:post_id" element={<OnlyFeed />} />
        <Route path="new-story" element={<NewFeed />} />
        <Route path="update-feed" element={<UpdateFeed />} />
        <Route path="test" element={<Test />} />
        <Route path="profile" element={<Profile />} />
        <Route path="categories" element={<AddNewCategory />} />
      </Route>
    </Routes>
  );
}

export default Routers
