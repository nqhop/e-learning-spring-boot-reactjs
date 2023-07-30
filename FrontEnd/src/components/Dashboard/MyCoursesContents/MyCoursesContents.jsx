import styled from "styled-components";
import { DropdownSelector } from "../Selector";
import { Button } from "components/Button/Button";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { BASE_URL } from "url/url";

import { Card } from "../../Card/Card";

import { selectCurrentUser } from "features/auth/authSlice";

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
export const MyCoursesContents = () => {
  const { orderId } = useParams();
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
    const url = `${BASE_URL}/admin/user/${user}`
    console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserFetch(data)
        setUserCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
   
  }, []);
  console.log(courses)

  console.log(userFetch)
  console.log(userCourses)
  const userCourseIds = userCourses.map(course => course.courseId);


  const selectedCourses = courses.filter((course) =>
  userCourseIds.includes(course.courseId)
  );
  console.log(selectedCourses);
  // const numbers = text.replace(/,/g, '');
  // console.log(typeof numbers)
  // const numbers = text.split(/\D+/).map((num) => parseInt(num)).filter((num) => !isNaN(num));
  // console.log(numbers)
  return (
    <PageStyled>
      <h3>Filter</h3>
      <div className="filter-group">
        <DropdownSelector newPlaceholder="Select Class" />
        <DropdownSelector newPlaceholder="Select Class" />
        <DropdownSelector newPlaceholder="Select Class" />
        <DropdownSelector newPlaceholder="Select Class" />
      </div>
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
        <h3>User ID: {orderId}</h3>
      </div>
      <div></div>
      <div className="cards-wrapper">
        {selectedCourses.map((course) => (
          <Card
            className="product"
            orderId={orderId}
            id={course.courseId}
            thumbnail={course.thumbnail}
            tutorName={course.tutor}
            courseName={course.name}
            rating={course.rating}
            desciption={course.desciption}
          />
        ))}
      </div>
    </PageStyled>
  );
};
