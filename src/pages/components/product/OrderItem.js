/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image';
import React from 'react';

const OrderItem = ({ order }) => {
    if (!order) {
    return <div>No orders available.</div>;
    }
  return (
    <><div className="card card-creator-s2 mb-4 p-2">
        <div className="row ">
            <div className="col-6">
                <div className="row">
                    <div className="col-md-4 d-block mb-2">
                        <p className="text-nowrap">Order Number</p>
                        <b>{order.orderNumber}</b>
                    </div>
                    <div className="col-md-4 d-block mb-2">
                        <p className="text-nowrap">Date Placed</p>
                        <b>{order.datePlaced}</b>
                    </div>
                    <div className="col-md-4 d-block mb-2">
                        <p className="text-nowrap">Total Amount</p>
                        <b>{order.totalAmount.toLocaleString("en-NG", { style: "currency", currency: "NGN" })}</b>
                    </div>
                </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
                <div className="col-md-4 mb-2">
                    <a className="btn text-nowrap border-1 nav-link"> View order</a>
                </div>
                <div className="col-md-4 mb-2">
                    <a className="btn text-nowrap border-1 nav-link">Item status</a>
                </div>
            </div>
        </div>
        <div class="card mb-4 bg-light">
            <div class="card-body d-flex align-items-center">

                <div class=" flex-shrink-0">
                    <img  src="{order.productImage}" alt="{order.productName}" class="img-fluid" />
                </div>
                <div class="flex-grow-1 ms-2">
                    <h6 class="card-s1-title mb-1">{order.productName}</h6>
                    <p class="card-s1-text">{order.productDescription}</p>
                </div>
            </div>
            <div className="row ">
                <div className="col-5 d-flex mx-4 mb-2">
                    <em className="icon-btn ni ni-check"></em>
                    <p className='m-2 text-nowrap'>order unsuccessful</p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <div className="col-md-4 mb-2">
                        <a className="btn text-nowrap text-primary border-1 nav-link"> View product</a>
                    </div>
                    <div className="col-md-4 mb-2">
                        <a className="btn text-nowrap text-primary border-1 nav-link">Buy Again</a>
                    </div>
                </div>
            </div>
        </div>  
    </div></>
  
  );
};

export default OrderItem;
