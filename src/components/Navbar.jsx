import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { styles } from "../styles";
import { navLinks } from "../Home";
import { logo1, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { loginWithRedirect, isAuthenticated,user, logout } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo1} alt='logo' className='w-9 h-9 object-contain' />
          <p className={`text-[18px] font-bold cursor-pointer flex ${styles.snowCoverColor}`}>
            SNOW &nbsp;
            <span className='sm:block hidden'> COVER </span>
          </p>
        </Link>
        
        {/* Add Sign In & sign out button */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>

        <li style={{ color: '#26bbff' }}>
            {isAuthenticated && <p>Welcome "{user.name}"</p>}
       </li>

          {
            isAuthenticated ? <li
            className={`${
              active === "SignIn" ? "text-white" : "text-[#26bbff]"
            } hover:text-white text-[18px] font-medium cursor-pointer `}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >  
          <Link to='#'>Logout</Link>
          </li> : <li
            className={`${
              active === "SignIn" ? "text-white" : "text-[#26bbff]"
            } hover:text-white text-[18px] font-medium cursor-pointer `}
            onClick={() => loginWithRedirect()} 
          >  
          <Link to='#'>Login</Link>
          </li>
          }
      
          <li
            className={`${
              active === "Home" ? "text-white" : "text-[#26bbff]"
            } hover:text-white text-[18px] font-medium cursor-pointer `}
            onClick={() => setActive("Home")}
          >
            <Link to='/Home'>Home</Link>
          </li>

          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-[#26bbff]"
              } hover:text-white text-[18px] font-medium cursor-pointer `}
              onMouseEnter={() => setActive(nav.title)}
              onMouseLeave={() => setActive("")}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {nav.title === "About" && active === "About" && (
                <div className="absolute bg-white p-2 mt-2 rounded-md shadow-md">
                  {nav.subLinks.map((subLink) => (
                    <p key={subLink} className="text-[14px] text-gray-800">
                      {subLink}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
            <li
                className={`${
                active === "SignIn" ? "text-white" : "text-[#26bbff]"
              } hover:text-white text-[18px] font-medium cursor-pointer `}
                onClick={() => loginWithRedirect()} 
>  
                  <Link to='#'>Login</Link>
            </li>

              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-[#26bbff]"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

