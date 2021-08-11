import { Redirect, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"


const PrivateRoute = ({path, exact, component}) => {
  return localStorage.getItem('VIVI_godview_token')
    ? <Route path={path} exact={exact} component={component}/>
    : <Redirect to="/login"/>

}

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home}/>
      {/* <PrivateRoute path="/box" exact/> */}
      {/* <PrivateRoute path="/box/:uuid" exact/> */}
      {/* <PrivateRoute path="/statistics" exact/> */}
      {/* <PrivateRoute path="/database" exact/> */}
      <Route path="/login" exact component={Login}/>
    </Switch>
  )
}

export default Router