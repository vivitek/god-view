import './Header.css'

function Header() {
  return (
        <header className="Header">
          <div className="left">
            <a className="link" href="/">
              <img align="left" className="logo" alt="logo" src="/logo_with_baseline.png"/>
            </a>
          </div>
          <div className="middle">
            <a className="link" href="/balena">Balena devices</a>
            <a className="link" href="/statistics">Statistics</a>
            <a className="link" href="/terminal">Terminal</a>
            <a className="link" href="/database">Database edition/view</a>
          </div>
          <a className="right link" onClick={() => {
            localStorage.removeItem("gv_token")
          }} href="/login"> Logout </a>
        </header>
    )
}

export default Header
