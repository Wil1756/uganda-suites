import { useEffect, useState } from "react";
// import menuLinksData from './data/menu_links.json';

interface menuData {
  class: {S: string};
  href: {S: string};
  text: {S: string};
}



export const Header = () => {
  const [menuLinksData, setMenuLinksData] = useState<menuData[]>([]);


  const loadMenuLinksData = async()=>{
    const resp = await fetch("https://c4vxtaypec.execute-api.us-east-1.amazonaws.com/Production/menuLinks");
    let jsonData = await resp.json();

    setMenuLinksData(jsonData);
  }
  useEffect(()=>{
    loadMenuLinksData()
  },[])
  
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
            {menuLinksData.map((link, index)=>(
              <li key ={index}><a className={`icon ${link.class.S}`} href={link.href.S}><span>{link.text.S}</span></a></li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
