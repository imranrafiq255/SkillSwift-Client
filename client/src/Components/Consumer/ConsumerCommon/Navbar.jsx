import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <ul className="flex space-x-6 text-gray-700 font-semibold">
        <li>
          <a href="/facebook.com">All Services</a>
        </li>
        <li>
          <a href="/facebook.com">Messages</a>
        </li>
        <li>
          <a href="/facebook.com">Service Requests</a>
        </li>
        <li>
          <a href="/facebook.com">Service History</a>
        </li>
        <li>
          <a href="/facebook.com">Contact Us</a>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button>
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m14.37 12.86 5.636 5.637-1.414 1.414-5.633-5.632a7.627 7.627 0 0 1-4.688 1.604c-4.256 0-7.707-3.483-7.707-7.78 0-4.297 3.45-7.78 7.707-7.78s7.707 3.483 7.707 7.78c0 1.792-.6 3.442-1.608 4.758ZM8.27 14.084c3.259 0 5.907-2.673 5.907-5.98 0-3.306-2.648-5.98-5.907-5.98-3.258 0-5.907 2.674-5.907 5.98 0 3.307 2.649 5.98 5.907 5.98Z"
              fill="#000"
              fill-rule="nonzero"
            ></path>
          </svg>
        </button>
        <button>
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.33 9.78a9.654 9.654 0 0 1 6.32 9.06.9.9 0 0 1-.9.9H1.25a.9.9 0 0 1-.9-.9 9.654 9.654 0 0 1 6.32-9.06 5.342 5.342 0 1 1 6.66 0ZM10 9.145a3.542 3.542 0 1 0 0-7.085 3.542 3.542 0 0 0 0 7.085Zm7.799 8.795a7.851 7.851 0 0 0-15.598 0h15.598Z"
              fill="#000"
              fill-rule="nonzero"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
