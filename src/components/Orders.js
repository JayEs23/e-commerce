/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import Cookies from 'js-cookie';
import OrderItem from './product/OrderItem';

const Orders = ({ Orders }) => {
  const orderItems = [
    {
      orderNumber: "ORD12345",
      datePlaced: "2023-07-15",
      totalAmount: 150.99,
      productImage: "/product.png",
      productName: "Product 1",
      productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      productAmount: 50.99,
      orderStatus: "Pending",
      status:"Closed"
    },
    {
      orderNumber: "ORD67890",
      datePlaced: "2023-07-16",
      totalAmount: 99.5,
      productImage: "../../product.png",
      productName: "Product 2",
      productDescription: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      productAmount: 29.99,
      orderStatus: "Shipped",
      status:"Open"
    },
    {
      orderNumber: "ORD54321",
      datePlaced: "2023-07-17",
      totalAmount: 75.25,
      productImage: "../../product.png",
      productName: "Product 3",
      productDescription: "Aenean euismod bibendum laoreet.",
      productAmount: 25.25,
      orderStatus: "Delivered",
      orderNumber: "ORD98765",
      datePlaced: "2023-07-18",
      totalAmount: 120.0,
      productImage: "../../product.png",
      productName: "Product 4",
      productDescription: "Mauris placerat eleifend leo.",
      productAmount: 40.0,
      orderStatus: "Pending",
      status:"Closed"
    },
    {
      orderNumber: "ORD24680",
      datePlaced: "2023-07-19",
      totalAmount: 180.75,
      productImage: "../../product.png",
      productName: "Product 5",
      productDescription: "Curabitur blandit tempus porttitor.",
      productAmount: 60.25,
      orderStatus: "Shipped",
      status:"Open"
    },
  ];
  const [userOrders, setUserOrders] = useState(Orders?? orderItems);
  
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (userOrders) return;
      try {
        const response = await api.get('order/orders/');
        setUserOrders(response.data);
        console.log(response.data);
      } catch (error) {
        //setUserOrders(orderItems);
        console.error('Error fetching user Orders:', error);
      }
    };

    fetchUserOrders();
  }, [userOrders]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    window.location.href = '/login';
  };

  return (
    <div className="row card bg-white">
      <div className="card-body">
        <h3 className="card-title m-2 mb-4 ">My Orders</h3>
        <div class="user-panel-title-box">
          <h3>Activity</h3>
        </div>
        <div class="Orders-setting-panel-wrap pt-2">
          <ul class="nav nav-tabs nav-tabs-s3 mb-2" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">All Orders</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="open-tab" data-bs-toggle="tab" data-bs-target="#open" type="button" role="tab" aria-controls="following" aria-selected="false">Open Orders</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="closed-tab" data-bs-toggle="tab" data-bs-target="#closed" type="button" role="tab" aria-controls="bidding" aria-selected="false">Closed Orders</button>
            </li>
            
          </ul>
          <div class="tab-content mt-4" id="myTabContent">
            <div class="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
              <div class="activity-tab-wrap">
              {userOrders.length > 0 ? (
                    userOrders.map((order) => (
                    <OrderItem key={order.OrderNumber} order={order} />
                    ))
                ) : (

                    <p>No results found.</p>
                )}
              </div>
            </div>
            <div class="tab-pane fade" id="open" role="tabpanel" aria-labelledby="following-tab">
              <div class="activity-tab-wrap p-4">
                
              </div>
            </div>
            <div class="tab-pane fade" id="closed" role="tabpanel" aria-labelledby="bidding-tab">
              <div class="activity-tab-wrap">
              
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
