import React from "react";
import Help from "../components/Help/Help";
import { useNavigate } from "react-router-dom";
import avatar1 from "assets/images/avatars/avatar1.svg";

import "../pages/OurCourse.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "features/cartSlice";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { selectCurrentUser } from "features/auth/authSlice";
import { BASE_URL } from "url/url";

const OurCoursesStyled = styled.div`
  .product {
  }
  .tutorInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    margin-left: 18px;
  }
`;

const OurCourses = () => {
  const [courses, setCourses] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  // console.log(data);

  useEffect(() => {
   
    fetch(`${BASE_URL}/admin/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const [userFetch, setUserFetch] = useState([]);
  const [role, setRole] = useState([]);
  const user = localStorage.getItem('user')

  const orderId = user

  useEffect(() => {
    console.log(user)
    const url = `${BASE_URL}/admin/user/${user}`
    console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserFetch(data)
        setRole(data.role)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
   
  }, []);

  let isStudent = true;
  if (role === "TUTOR") {
    isStudent = false
    } else {
      isStudent = true
  }  

  //   useEffect(() => {
  //     console.log(user)
  //     axios.get(`http://localhost:8080/admin/user/${user}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCurrentUser(data);
  //         setUserCourses(data.courses);

  //       });
  //   }, []);

  //   useEffect(() => {
  //     console.log(user)
  //     axios.get(`http://localhost:8080/admin/user/${user}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCurrentUser(data);
  //         setUserCourses(data.courses);

  //       });
  //   }, []);

  const navi = useNavigate();

  // const userCourseIds = userCourses.map(course => course.courseId);

  return (
    // <>
    //   <Help />
    // </>

    <div className="home-container">
      <OurCoursesStyled>
        <h2>New Arrivals</h2>
        <div className="products">
          {courses?.map((product, index) => {
            console.log(product.courseId);

            return (
              <div key={product.courseId} className="product">
                <h3 onClick={() => navi(`/coursedetails/${product.courseId}`)}>
                  {product.name}
                </h3>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  onClick={() => navi(`/coursedetails/${product.courseId}`)}
                />

                <div className="tutorInfo">
                  <div>
                    <span>Tutor: {product.tutor}</span>
                  </div>
                </div>
                <p className="description">{product.desciption}</p>
                <h5 className="price">${product.price}</h5>

                {/* { !userCourseIds.includes(product.courseId) ? ( */}
                { isStudent ?
                (<button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>)
                :
                (<button onClick={() => navi(`/coursedetails/${orderId}/${product.courseId}`)}>
                Watch Course
              </button>)
                }
                {/* ) : (<button style={{ background: 'red' }}   >
                                        Purchased
                                    </button>)
                                        } */}
              </div>
            );
          })}
        </div>
      </OurCoursesStyled>
    </div>
  );
};

export default OurCourses;
