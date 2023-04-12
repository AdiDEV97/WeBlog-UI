import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap';
import { getCurrentUserDetails } from '../../../Auth'
import { BASE_URL } from '../../../Services/ApiHandler';
import { allFeedsApi } from '../../Feeds/Service/ApiHandler';
import '../StyledComponent/Style.css';

const ProfileComponent = () => {

  const user = getCurrentUserDetails();

  const [blogCount, setBlogCount] = useState(null);

  useEffect(() => {
    document.title = 'Weblog - Profile';
    allFeedsApi(user.id).then(resp => {
      setBlogCount(resp.length);
    }).catch(error => {
      setBlogCount(0);
    })
  }, []);

    

  return (
    <div className='profileData'>
      <h3>User Corner</h3>
      <img className="profileImage rounded-circle m-4" src={`${BASE_URL}/user/profile-image/${user.profileImage}`} alt="ProfileImage" width="200" height="200" />
      <div className='profileTable text-justify'>
        <form className='profile-form'>
          <table className='form-control'>
            <div className='form-group-profile'>
              <tr>
                <td className='labelName'><span className='mx-3'>UserId</span></td>
                <td className='labelValue'><Input className='form-control' type='text' value={user.id} disabled /></td>
              </tr>
            </div>
            <hr/>
            <div className='form-group-profile'>
              <tr>
                <td className='labelName'><span className='mx-3'>Username</span></td>
                <td className='labelValue'><Input className='form-control' type='text' value={user.name} disabled /></td>
              </tr>
            </div>
            <hr/>
            <div className='form-group-profile'>
              <tr>
                <td className='labelName'><span className='mx-3'>Email</span></td>
                <td className='labelValue'><Input className='form-control' type='text' value={user.email} disabled /></td>
              </tr>
            </div>
            <hr/>
            <div className='form-group-profile'>
              <tr>
                <td className='labelName'><span className='mx-3'>Role</span></td>
                <td className='labelValue'><Input className='form-control' type='text' value={user.roles[0].roleId==501 ? "ADMIN" : "USER"} disabled /></td>
              </tr>
            </div>
            <hr/>
            <div className='form-group-profile'>
              <tr>
                <td className='labelName'><span className='mx-3'>Total Blogs</span></td>
                <td className='labelValue'><Input className='form-control' type='text' value={blogCount} disabled /></td>
              </tr>
            </div>
            <hr/>
          </table>
        </form>
      </div>
    </div>
  )
}

export default ProfileComponent
