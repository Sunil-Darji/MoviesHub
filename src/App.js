import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Series from './Pages/Series/Series'
import Search from './Pages/Search/Search1'
import Login from './Login Signin/Login'
import Signin from './Login Signin/Signin'
import Error from './Error'
import './App.css'
const App = () => {
  return (
    <>
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login}/>
            <Route path="/signin" component={Signin}/>
            <Route component={Error}></Route>
          </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
