import React, { useState } from "react";

const NavBar = () => {
  let Links = [
    { name: "NFT", link: "/" },
    { name: "DEFI", link: "/" },
    { name: "ALTCOIN", link: "/" },
    { name: "BITCOIN", link: "/" },
    { name: "ETHEREUM", link: "/" },
    { name: "BLOCKCHAIN", link: "/" },
    { name: "ABOUT US", link: "/" },
    { name: "CREATE", link: "/create-post" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="w-full fixed top-0 left-0 shadow-md z-10 md:px-5 px-0"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <div
          className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
            <span className="text-3xl mr-1 pt-2"> Newschain</span>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 mx-0 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            } md:px-0 px-8`}
            style={{ backgroundColor: "#f7f7f7" }}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-4 text-md md:my-0 my-7">
                <a
                  href={link.link}
                  className="text-md font-bold text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
