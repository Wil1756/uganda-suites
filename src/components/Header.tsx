import menuLinksData from './data/menu_links.json';

export const Header = () => {
    return(
        <header id="intro">
            <article className="fullheight">
                <div className="hgroup">
                <h1>Uganda Suites</h1>
                <h2>Kampala</h2>
                <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow"/></a></p>
                </div>
            </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand"><a href="#welcome">Uganda <span>Suites</span></a></div>
          <ul>
            {menuLinksData.map((link)=>
                <li><a className={`icon.${link.class}`} href={link.href}><span>{link.text}</span></a></li>

            )}
          </ul>
        </div>
      </nav>
    </header>
    );
};
