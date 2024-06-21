import React, { useState, useContext, memo, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import "./nav.css";
import { categoryContext } from "../context/category";

const menuItems = [
  { name: "General" },
  { name: "Business" },
  { name: "Entertainment" },
  { name: "Health" },
  { name: "Science" },
  { name: "Sports" },
  { name: "Technology" },
];


function Nav() {
  const apiKey = import.meta.env.VITE_API_KEY;

  
  const category = useContext(categoryContext);
  //Theme Switcher|
  const [darkModeStatus, setDarkModeStatus] = useState(true)
  const switchTheme = (e) => {
    const darkStatus = e.currentTarget.checked;
    setDarkModeStatus(darkStatus)
    document.querySelector("html").classList.remove("light", "dark");
    document
      .querySelector("html")
      .classList.add(darkStatus ? "dark" : "light");
  };
  
  
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      changeUrl();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const changeUrl = () => {
    category.setUrl(
      `https://gnews.io/api/v4/search?q=${searchValue}&lang=en&apikey=${apiKey}`
    );
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 sticky top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-evenly px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="red"
                />
              </svg>
            </span>
            <span className="font-bold text-gray-900 dark:text-white text-2xl">
              Newsify
            </span>
          </div>
          <div className="hidden lg:block">
            <ul className=" mb-2 inline-flex space-x-8">
              {menuItems.map((item) => {
                return (
                  <li className="pt-3" key={item.name}>
                    <div
                      onClick={() => category.setCategory(item.name.toLowerCase())}
                      className={`cursor-pointer text-sm font-semibold ${category.category.toLowerCase() === item.name.toLowerCase()
                        ? "text-green-500 border-b-2 border-green-600"
                        : "dark:text-white text-gray-900 dark:hover:text-blue-500 hover:text-blue-500"
                        }`}
                    >
                      {item.name}
                    </div>
                  </li>
                );
              })}
              <div className="search bg-white dark:bg-gray-900">
                <div className="search-box bg-white dark:bg-gray-900">
                  <div className="search-field">
                    <input
                      id="search"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      value={searchValue}
                      placeholder="Search..."
                      className="input bg-white dark:bg-gray-900"
                      type="text"
                    />
                    <div className="search-box-icon">
                      <button onClick={changeUrl} className="btn-icon-content">
                        <i className="search-icon ">
                          <svg
                            xmlns="https://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                              fill="gray"
                            ></path>
                          </svg>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div className="px-5 toggle">
            <label className="switch">
              <span className="sun">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g fill="#ffd43b">
                    <circle r="5" cy="12" cx="12"></circle>
                    <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                  </g>
                </svg>
              </span>
              <span className="moon">
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                </svg>
              </span>
              <input
                checked={darkModeStatus}

                type="checkbox"
                id="inp"
                onChange={switchTheme}
                className="input"
              />
              <span className="slider"></span>
            </label>
            <label></label>
          </div>
          <div className="ml-2 lg:hidden">
            <Menu
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer  dark:text-white"
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden ">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:bg-gray-900">
              <div className="px-5 pb-6 pt-5 dark:text-white">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="red"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">Newsify</span>
                  </div>
                  <div className="-mr-2 ">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:bg-gray-500 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X
                        className="h-6 w-6  dark:text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <div
                        onClick={() => category.setCategory(item.name.toLowerCase())}
                        key={item.name}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold   hover:bg-gray-400 dark:hover:text-white dark:hover:bg-gray-500"
                      >
                        <span className={`ml-3 text-base font-medium dark:text-gray-300 text-gray-900 ${category.category.toLowerCase() === item.name.toLowerCase()
                          ? "text-green-500 border-b-2 border-green-600"
                          : ""
                          }`}>
                          {item.name}
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </div>
                    ))}

                    <div className="search bg-whit dark:bg-gray-900"  >
                      <div className="search-box bg-whit dark:bg-gray-900">
                        <div className="search-field">
                          <input
                            onChange={handleChange}
                            value={searchValue}
                            placeholder="Search..." className="input bg-whit dark:bg-gray-900" type="text" />
                          <div className="search-box-icon">
                            <button
                              onClick={changeUrl}
                              className="btn-icon-content">
                              <i className="search-icon ">
                                <svg xmlns="://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="gray"></path></svg>
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default memo(Nav);
