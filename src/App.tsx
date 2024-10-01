import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Messenger from "./pages/Messenger"
import Canvas from "./pages/Home/ Canvas"


import UserProvider from "./utils/MessengerContextProvider"
import { AuthProvider } from "./utils/AuthContextProvider"
import PrivateRoute from "./utils/PrivateRoute"
import SessionStorage from "./utils/SessionStorage"

import bgImage from './assets/bg-messenger.jpg'
import PostList from "./pages/Posts/PostLists"
import PostDetails from "./pages/Posts/PostDetails"
import AddPost from "./pages/Posts/AddPost"


function App() {

  const divStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

  return (
    <div style={divStyle}>
      <UserProvider>
        <AuthProvider>
          <SessionStorage />
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path='/' element={<Canvas />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />

              {/* Private routes */}
              <Route path="/messenger" element={<PrivateRoute />}>
                <Route path="/messenger" element={<Messenger />} />
              </Route>
              <Route path="/posts" element={<PrivateRoute />}>
                <Route path="/posts" element={<PostList />} />
              </Route>
              <Route path="/post" element={<PrivateRoute />}>
                <Route path=":id" element={<PostDetails />} />
              </Route>
              <Route path="/add-post" element={<PrivateRoute />}>
                <Route path="/add-post" element={<AddPost />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </UserProvider>
    </div>

  );
}

export default App;
