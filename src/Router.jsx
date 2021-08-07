import { Redirect, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"


const PrivateRoute = ({path, exact, component}) => {
  return localStorage.getItem('VIVI_godview_token')
    ? <Route path={path} exact={exact} component={component}/>
    : <Redirect to="/login"/>

}

const Router = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login}/>
      <PrivateRoute path="/" exact component={null}/>
      {/* <PrivateRoute path="/box" exact/> */}
      {/* <PrivateRoute path="/box/:uuid" exact/> */}
      {/* <PrivateRoute path="/statistic" exact/> */}
      {/* <PrivateRoute path="/database" exact/> */}
    </Switch>
  )
}

export default Router