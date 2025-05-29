// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// const StudentRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth)

//   return user?.accountType !== "Student" ? children : <Navigate to="/login" />
// }

// export default StudentRoute


import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const StudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)

  return user?.accountType === "Student" ? children : <Navigate to="/dashboard/my-profile" />
}

export default StudentRoute
