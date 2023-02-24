import React, { useState} from 'react';
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Search from "@mui/icons-material/Search";

const Header = () => {
 
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
   
   <> 
     <div className="main">
         <div className='firstH'> 
          <Link to="/"><Home/></Link>
        </div>

        <div className='secondH'>
              <div>
              <input type="text" placeholder="Search a product..." 
             onChange={(e)=> setKeyword(e.target.value)}/>
              </div>

              <div>
             <Search onClick={searchSubmitHandler}/>
              </div>
        </div>
     </div>

  </>
 

  )   
};

export default Header;
