import React, { Fragment, useState } from 'react'
import "./Search.css";
import { useNavigate } from 'react-router-dom';
 

const Search = () => {
  const navigate= useNavigate();

   const [Keyword, setKeyword]=useState(""); 

  const searchSubmitHandler =(e) => { 
    e.preventDefault();
    if(Keyword.trim()){
      navigate(`/products/${Keyword}`) 
    }else{ 
      navigate("/products");   
    }
  } 
  
  return (
   <Fragment> 
 
    <form className="search" onSubmit={searchSubmitHandler}>
    <input type="text" placeholder="Search a product..." 
    onChange={(e)=> setKeyword(e.target.value)}/>

    <input type="submit" value="Search" />
    </form>
   </Fragment>
  );
};

export default Search;