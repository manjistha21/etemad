'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ComponentsDashboardSales = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/order');
                const data = await response.json();
                console.log('Orders data:', data); // Log the data to debug
                setOrders(data.orders || []); // Extract orders array
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/customer');
                const data = await response.json();
                console.log('Customers data:', data); // Log the data to debug
                if (data && data.customer) {
                    console.log('Fetched customers:', data.customer);
                    setCustomers(data.customer);
                } else {
                    console.log('No customers found in the response');
                    setCustomers([]);
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
    
        fetchCustomers();
    }, []);
    

    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Sales</span>
                    </li>
                </ul>

                <div className="pt-5">
                    <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    </div>
                    <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="panel h-full w-full">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white-light">Customers</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>DOB</th>
                                            <th>Country of Birth</th>
                                            <th>Nationality</th>
                                            <th>Email</th>
                                            <th>Occupation</th>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Address</th>
                                            <th>Zip</th>
                                            <th>Mobile</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.length === 0 ? (
                                            <tr>
                                                <td colSpan="15" className="text-center">No customers data available</td>
                                            </tr>
                                        ) : (
                                            customers.map((customer, index) => (
                                                <tr key={index} className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                                    <td className="text-black dark:text-white">{customer.firstName}</td>
                                                    <td className="text-black dark:text-white">{customer.middleName}</td>
                                                    <td className="text-black dark:text-white">{customer.lastName}</td>
                                                    <td className="text-black dark:text-white">{customer.dob}</td>
                                                    <td className="text-black dark:text-white">{customer.countryOfBirth}</td>
                                                    <td className="text-black dark:text-white">{customer.nationality}</td>
                                                    <td className="text-black dark:text-white">{customer.email}</td>
                                                    <td className="text-black dark:text-white">{customer.occupation}</td>
                                                    <td className="text-black dark:text-white">{customer.country}</td>
                                                    <td className="text-black dark:text-white">{customer.state}</td>
                                                    <td className="text-black dark:text-white">{customer.city}</td>
                                                    <td className="text-black dark:text-white">{customer.address}</td>
                                                    <td className="text-black dark:text-white">{customer.zip}</td>
                                                    <td className="text-black dark:text-white">{customer.mobile}</td>
                                                    <td className="text-black dark:text-white">{customer.comment}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="panel h-full w-full">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white-light">Orders</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">AML Status</th>
                                            <th>Order Date</th>
                                            <th>Tags</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Reason for Transfer</th>
                                            <th>Foreign Currency</th>
                                            <th>Country</th>
                                            <th>Source of Funds</th>
                                            <th>Quantity</th>
                                            <th>Commission</th>
                                            <th>Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index} className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                                <td className="text-black dark:text-white">{order.AMLstatus}</td>
                                                <td className="text-black dark:text-white">{order.orderdate}</td>
                                                <td className="text-black dark:text-white">{order.tags}</td>
                                                <td className="text-black dark:text-white">{order.customer}</td>
                                                <td className="text-black dark:text-white">{order.status}</td>
                                                <td className="text-black dark:text-white">{order.reasonfortransfer}</td>
                                                <td className="text-black dark:text-white">{order.foreigncurrency}</td>
                                                <td className="text-black dark:text-white">{order.country}</td>
                                                <td className="text-black dark:text-white">{order.sourceoffunds}</td>
                                                <td className="text-black dark:text-white">{order.quantity}</td>
                                                <td className="text-black dark:text-white">{order.commission}</td>
                                                <td className="text-black dark:text-white">{order.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComponentsDashboardSales;
