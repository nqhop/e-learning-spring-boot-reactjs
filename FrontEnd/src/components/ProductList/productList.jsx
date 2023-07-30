import React, { useEffect, useState } from "react";
import "../ProductList/productList.css";
import { Card } from "../Card/Card";

import avatar1 from "assets/images/avatars/avatar1.svg";

import AliceCarousel from "react-alice-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { BASE_URL } from "url/url";


const ProductList = () => {
  const responsiveAlice = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    minidesktop: {
      breakpoint: { max: 1190, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1080, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/admin/courses`)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, []);

  return (
    <>
      <div className="product-container">
        <AliceCarousel
          mouseTracking
          responsive={responsiveAlice}
          controlsStrategy="alternate"
          disableDotsControls={true}
          autoPlay
          autoPlayInterval={5000}
          animationDuration={1000}
          infinite
        >
          {courses.map((course) => (
            <Card
              className="product"
              id={course.courseId}
              avatar={avatar1}
              tutorName={"Diallo Liam"}
              courseName={course.name}
              rating={course.rating}
              thumbnail={course.thumbnail}
            />
          ))}
        </AliceCarousel>
      </div>
    </>
  );
};

export default ProductList;
