import { Redirect, Route, Switch } from "react-router-dom"
import Box from "./pages/Box"
import Boxes from "./pages/Boxes"
import Database from "./pages/Database"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Statistics from "./pages/Stats"

const PrivateRoute = ({path, exact, component}) => {
  return localStorage.getItem('VIVI_godview_token')
    ? <Route path={path} exact={exact} component={component}/>
    : <Redirect to="/login"/>

}

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login}/>
      <PrivateRoute path="/" exact component={Home}/>
      <PrivateRoute path="/box" exact component={Boxes}/>
      <PrivateRoute path="/box/:id" exact component={Box}/>
      <PrivateRoute path="/statistics" exact component={Statistics}/>
      <PrivateRoute path="/database" exact component={Database}/>
    </Switch>
  )
}

export default Routes