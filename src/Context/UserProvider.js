import React, { useState } from 'react'
import userContext from './UserContext'

function UserProvider({childData}) {

    const [user, setUser] = useState({
        name:'SOHAN'
    });

  return (
    <userContext.Provider value={user}>
        {childData}
    </userContext.Provider>
  )
}

export default UserProvider
