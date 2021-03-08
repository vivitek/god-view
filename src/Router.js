import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./pages/home/Home"
import Logs  from "./pages/logs/Logs"
import Stat  from "./pages/stats/Stat"
import Database from "./pages/database/Database"
import Terminal from "./pages/terminal/Terminal"
import Login from "./pages/login/Login"

const PrivateRoute = ({path, exact, component}) => {
  return (
    localStorage.getItem('gv_token') ?
      <Route path={path} exact={exact} component={component}/>
    :
      <Redirect to="/login"/>
  )

}

const Router = () =>{
  return (
    <Switch>
      <Route path="/login" exact component={Login}/>
      <PrivateRoute path="/" exact component={Home}/>
      <PrivateRoute path="/logs" exact component={Logs}/>
      <PrivateRoute path="/statistics" exact component={Stat}/>
      <PrivateRoute path="/database" exact component={Database}/>
      <PrivateRoute path="/terminal" exact component={Terminal}/>
    </Switch>
  )
}

export default Router