import './Header.css'

function Header() {
    return (
        <header className="Header">
          <div className="left">
            <a className="link" href="/">
              <img align="left" className="logo" alt="logo" src="./logo_with_baseline.png"/>
            </a>
          </div>
          <div className="right">
            <a className="link" href="/logs">API & Traefik logs</a>
            <a className="link" href="/statistics">Statistics</a>
            <a className="link" href="/terminal">Terminal</a>
            <a className="link" href="/database">Database edition/view</a>
          </div>
        </header>
    )
}

export default Header
