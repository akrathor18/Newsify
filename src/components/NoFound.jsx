import React from 'react';

const NoResultsFound = () => {
  return (
    <div className=" no-results-container flex-col flex justify-center items-center mt-20">
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="no-results-icon"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <h2 className={`dark:text-white`}>Oops, No Matches Found!</h2>
      <p className='dark:text-white'>Sorry, we couldn't find any results for your search.</p>
      <br />
      <p className='dark:text-gray-200'>Please try the following:</p>
      <ul className='dark:text-gray-300 '>
        <li>Check your spelling and try again.</li>
        <li>Use different or more general keywords.</li>
        <li>Try fewer keywords to start, then refine your search results.</li>
      </ul>
    </div>
  );
};

export default NoResultsFound;
