import { useState, useEffect } from 'react';
import { categoryContext } from './context/category';
import { VscAccount } from "react-icons/vsc";
import { MdOutlineDateRange } from "react-icons/md";
import './App.css';
import Nav from './components/Nav';
import Lodder from './components/Lodder';
import NoResultsFound from './components/NoFound';
import.meta.env

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [category, setCategory] = useState("general")

  const [url, setUrl] = useState(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`); // Corrected the URL

  useEffect(() => {
    setUrl(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`);
  }, [category, apiKey]); 

  useEffect(() => {
    const getnews = async () => {
      try {
        setLoading(true);
        const resp = await fetch(url); 
        const result = await resp.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getnews();
  }, [url, category]); // Ensure url is included in the dependency array

  const changeDateFormat = (inputdate) => {
    const dateObj = new Date(inputdate);
    const outputDate = dateObj.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
    return outputDate;
  }

  if (loading) {
    return <Lodder />;
  }

  // Ensure data and data.articles are valid before attempting to map
  if (!data || !data.articles) {
    return (
      <div className="something-went-wrong">
        <h1>Something Went Wrong</h1>
        <p>We're sorry, but something went wrong. Please try again later.</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }
  // if image url is null 
  const placeholderImage = 'https://st4.depositphotos.com/3864435/27060/i/450/depositphotos_270609518-stock-photo-disconnected-cable-text-warning-message.jpg';
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  }

  return (
    <>
      <categoryContext.Provider value={{ category, setCategory, url, setUrl }}>
        <Nav />
        {data.totalArticles == 0 && <NoResultsFound/>}
        <div className="flex justify-evenly  flex-wrap pt-4">
          {data.articles.map(post => {
            const date = changeDateFormat(post.publishedAt);
            return post.content === "[Removed]" ? null : (
              <a key={post.url} href={post.url} target='_blank'>
                <div className="max-w-sm  m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img className="rounded-t-lg object-fill hover:object-scale-down" src={`${post.image ? post.image : placeholderImage}`} onError={onImageError} alt="" />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content === null ? post.description : post.content}</p>
                    <div className="flex justify-evenly mb-2 text-lg">
                      <span className='flex items-center'><MdOutlineDateRange /> {date}</span>
                      <span className='flex items-center'><VscAccount />  {post.source.name   === null ? "  unknown" : post.source.name }</span>
                    </div>
                    <a href={post.url} target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </categoryContext.Provider>
    </>
  );
}

export default App;
