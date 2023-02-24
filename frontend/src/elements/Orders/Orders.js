
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../allActions/orderAction";
import { Link } from "react-router-dom";  
import Typography from "@mui/material/Typography";
import Label from "../layout/Label";
import Launch from "@mui/icons-material/Launch";
import Swal  from "sweetalert2"; 
import Wait from "../layout/Waiting/Wait";

const Orders = () => {
  const dispatch = useDispatch();

 const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user); 

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      Swal.fire({
        text: 'error occur'
      })
      dispatch(clearErrors());
    }
 
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <Label title={`${user.name} - Orders`} />

      {loading ? (
        <Wait />
      ) : (
        <div className="ordersList">
          <DataGrid
            rows={rows} 
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="ordersListTable"
            autoHeight
          /> 

          <Typography id="ordersListHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
