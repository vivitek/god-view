import { Switch, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Logs  from "./pages/logs/Logs"
import Stat  from "./pages/stats/Stat"
import Database from "./pages/database/Database"
import Terminal from "./pages/terminal/Terminal"

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/logs" exact component={Logs}/>
      <Route path="/statistics" exact component={Stat}/>
      <Route path="/database" exact component={Database}/>
      <Route path="/terminal" exact component={Terminal}/>
    </Switch>
  )
}

export default Router