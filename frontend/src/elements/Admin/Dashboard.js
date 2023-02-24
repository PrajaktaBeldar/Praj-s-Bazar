import React from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css"; 
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";  
import Label from "../layout/Label"; 
  
const Dashboard = () => {
  
 return (
        <div className="dashboard">
          <Label title="Dashboard - Admin Panel" />
          <Sidebar />
    
          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>
    
            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> 
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="">
                  <p>Product</p>
                  
                </Link>
                <Link to="">
                  <p>Orders</p>
                 
                </Link>
                <Link to="">
                  <p>Users</p>
                 
                </Link>
              </div>
            </div> 

            </div>
    </div>
    )};
    
 export default Dashboard;
 
