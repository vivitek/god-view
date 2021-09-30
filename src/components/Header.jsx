import { Link, useLocation } from "react-router-dom";
import ViviHourglass from "../images/ViviHourglass";
import { noHeaderRoutes } from "../constant";

const Header = () => {
  const location = useLocation();

  if (location.pathname.includes(noHeaderRoutes))
    return (<div></div>)

    return (
    <header className="z-0">
      <div className="w-full bg-darkBlue h-12 md:h-20 text-white flex  justify-between items-center">
        <div className="flex flex-row items-center">
          <Link to="/">
            <ViviHourglass className="m-3 ml-4 h-6 w-auto" />
          </Link>
          <Link to="/box">Boxes</Link>
          <Link className="ml-4" to="/statistics">Statistics</Link>
          <Link className="ml-4" to="/database">Database</Link>
        </div>
        <Link className="mr-4" to="/login" onClick={() => {
          localStorage.removeItem('VIVI_godview_token')
          localStorage.removeItem('VIVI_godview_user')
        }}>
          <img className="h-6 w-auto" src="/logout.png" alt="Logout" />
        </Link>
      </div>
    </header>
  );
};

export default Header;