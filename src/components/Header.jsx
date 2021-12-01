import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { Transition } from '@headlessui/react'
import { noFooterHeader } from "../utils/constants";
import UserContext from "../contexts/userContext";
import MenuIcon from "../images/Hamburger";
import ViviHourglass from "../images/ViviHourglass";
import ThemeContext from "../contexts/themeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  if (location.pathname.includes(noFooterHeader)) {
    return (<div></div>)
  }

  const renderBurgerMenu = () => {
    return (
      <div className="flex flex-col h-screen absolute dark:bg-darkBlue text-white z-10 top-12 left-0" style={{ minWidth: "40vw" }}>
        <div className="flex flex-col mt-4 ml-4 gap-4">
          <Link to="/" onClick={toggleOpen}>
            Home
          </Link>
          <Link to="/box" onClick={toggleOpen}>
            Boxes
          </Link>
        </div>
        {!userContext.authed && <div className="flex flex-col mt-4 ml-4">
          <Link to="/settings">Settings</Link>
          <span className="cursor-pointer">Logout</span>
        </div>}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <div className="w-full md:flex flex-row items-center justify-between h-full hidden ml-12 font-itc">
        <div className="flex justify-between">
          <Link to="/" className="mt-2 text-lg">
            Home
          </Link>
          <Link to="/box" className="mt-2 ml-4 text-lg">
            Boxes
          </Link>
          <Link to="/statistics" className="mt-2 ml-4 text-lg">
            Statistics
          </Link>
          <Link to="/database" className="mt-2 ml-4 text-lg">
            Database
          </Link>
        </div>
        {!userContext.authed &&
          <Link className="relative mr-12" to="/login" onClick={() => {
            localStorage.removeItem('VIVI_godview_token')
            localStorage.removeItem('VIVI_godview_user')
          }}>
            <img className="h-6 w-auto" src="/logout.png" alt="Logout" />
          </Link>
        }
      </div>
    )
  }


  return (
    <header>
      <div className="w-full bg-gray-400 dark:bg-darkBlue h-12 md:h-20 dark:text-white flex items-center ">
        <Link to="/">
          <ViviHourglass className="m-6 h-6 w-auto" dark={themeContext.theme === "dark"} />
        </Link>
        <button onClick={toggleOpen} className="block md:hidden justify-self-end">
          <MenuIcon className="stroke-current fill-current w-auto h-8" isOpen={isOpen} />
        </button>
        {!isOpen && renderMenu()}
      </div>
      <Transition
        show={isOpen}
        enter="transition-all ease-in-out duration-300 transform"
        enterFrom="-translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-all ease-in-out duration-300 transform"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-full opacity-0"
      >
        {renderBurgerMenu()}
      </Transition>
    </header>
  );
};

export default Header;
