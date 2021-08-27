import { Link, useLocation } from "react-router-dom";
import ViviHourglass from "../images/ViviHourglass";
import { noHeaderRoutes } from "../constant";

const Header = () => {
  const location = useLocation();

  if (location.pathname.includes(noHeaderRoutes))
    return (<div></div>)

    return (
    <header className="z-0">
      <div
        className="w-full bg-darkBlue h-12 md:h-20 text-white flex items-center"
      >
        <Link to="/">
          <ViviHourglass className="m-3 h-6 w-auto" />
        </Link>
        <Link className="ml-4" to="/box">Boxes</Link>
        <Link className="ml-4" to="/statistics">Statistics</Link>
        <Link className="ml-4" to="/database">Database</Link>
      </div>
    </header>
  );
};

export default Header;