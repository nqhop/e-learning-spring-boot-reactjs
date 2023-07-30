import styled from "styled-components";
import { Button } from "components/Button/Button";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from "url/url";
import { Card } from "../components/Card/Card"

import axios from "axios";

const PageStyled = styled.div`
  h3 {
    color: #464444;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin: 40px 0px 13px 0px;
    min-width: 102px;
  }
  .filter-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .filter-button {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 27px;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-bottom: 20px;
    box-shadow: 0 1px 0 0 #edebeb;
  }
  .card-test {
    width: 375px;
    height: 422px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 33px;
    box-shadow:
      0px 4px 34px 0px rgba(0, 0, 0, 0.05),
      0px -4px 34px 0px rgba(0, 0, 0, 0.05);
  }
  .cards-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px;
  }
`;

const HourOfPurchaseHistoryPage = () => {
  const user = localStorage.getItem('user')

  const [courses, setCourses] = useState([]);
  const [userFetch, setUserFetch] = useState([]);

  const [orders, setOrders] = useState([]);
  const [charArray, setCharAray] = useState("");
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
        
    fetch(`${BASE_URL}/admin/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });

    
  }, []);


  useEffect(() => {
    console.log(user)
    const url = `${BASE_URL}/admin/order/${user}`
    console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders([data])
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
   
  }, []);
  console.log(orders)
  
  return (
  <PageStyled>
    <h3>Filter</h3>
  
    <div className="filter-button">
      <Button
        width="165px"
        height="52px"
        borderRadius="37px"
        bgColor="#0C4CA3"
      >
        Filter
      </Button>
    </div>
    <div>
      <h3>User: {user}</h3>
    </div>
    <div></div>
    <div className="cards-wrapper">
      {orders?.map((order) => (
        <div className="card">
        <h3>Order of:{user}</h3>
        <p>ID: {order.orderId}</p>
        <p>Status:{order.status} </p>
        <p>Course buy: {order.courses}</p>
      </div>
      ))}
    </div>
  </PageStyled>
  )
};
export default HourOfPurchaseHistoryPage;
