import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { Button } from "components/Button/Button";
import personAvt from "../../../assets/images/personAvt.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "url/url";

const StyleCourseDetailsBanner = styled.div`
  height: 1000px;
  padding-top: 176px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-left: 140px;
  .wrapper-popular-categlories {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
  }
  .categlory {
    color: #96989b;
    font-size: 16px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .banner-title {
    color: #504e4e;
    font-size: 60px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 82px;
  }
  .banner-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 42px;
  }
  .banner-wrapper .thumbnail{
    height: 100%;
    width: 50%;
    object-fit: cover;
    border-radius: 10px;
  }
  .description {
    color: #96989b;
    font-size: 20px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: 196.5%;
    margin-top: 10px;
  }
  .rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .rate {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rating-number,
  .rating-number span {
    color: #2e2c2c;
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .rating-number {
    font-size: 10px;
  }
  .rating-number span {
    font-size: 15px;
  }
  .reviews-count {
    color: #96989b;
    font-size: 15px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: 196.5%;
  }
  .enroll-count {
    color: #96989b;
    font-size: 15px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .mentor {
    display: flex;
    align-items: flex-end;
    gap: 34px;
    margin-top: 10px;
  }
  .mentor-name {
    color: #96989b;
    font-size: 15px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .mentor-name span {
    color: #2e2c2c;
  }
  .start-group {
    display: flex;
    align-items: center;
    gap: 43px;
    margin-top: 105px;
  }
  .start-group-text {
    color: #2e2c2c;
    font-size: 32px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  Button {
    color: #fff;
    font-size: 32px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  @media screen and (max-width: 1315px) {
    width: 100%;
    margin-left: 0px;
    .wrapper-popular-categlories {
      justify-content: space-evenly;
      align-items: center;
    }
    .banner-title,
    .description {
      align-items: center;
      text-align: center;
    }
    .mentor,
    .start-group {
      justify-content: center;
    }
    .rating {
      justify-content: space-evenly;
    }
  }
  @media screen and (max-width: 797px) {
    .rating,
    .start-group {
      flex-direction: column;
    }
  }
`;

export const CourseDetailsBanner = () => {
  const { id, orderId } = useParams();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/admin/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      });
  }, [id]);
  console.log(course);

  const navi = useNavigate();
  return (
    <StyleCourseDetailsBanner>
      <div className="wrapper-popular-categlories">
        <div className="categlory">#Popular categories</div>
        <div className="categlory">#Computer science</div>
        <div className="categlory">#Mobile and web development</div>
        <div className="categlory">#Programming</div>
      </div>
      <div className="banner-title">{course.name}</div>
      <div className="banner-wrapper">
        <img className="thumbnail" src={course.thumbnail} alt={course.name} />
        <div style={{width: "48%"}}>
          <div className="description">{course.desciption} </div>
          <div className="rating">
            <div className="rate">
              <StarRatings
                rating={course.rating}
                starDimension="15px"
                starSpacing="5px"
                starRatedColor="#FED66F"
              />
              <div className="rating-number">
                <span>{course.rating}</span>/5.0
              </div>
            </div>
            <div className="reviews-count">722 reviews</div>
            <div className="enroll-count">{course.enroll} enrolled</div>
          </div>
          <div className="mentor">
            <img src={personAvt} alt="" width="50px" height="50px"/>
            <div className="mentor-name">
              Taught by <span>{course.tutor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="start-group">
        <div className="start-group-text">Start as early as Today</div>

        {orderId ? (
          <Button
            bgColor="#0C4CA3"
            width="351px"
            height="81px"
            borderRadius="55px"
            fontSize="22px"
            onClick={() => navi(`/mainboard/${orderId}/video-player/${id}`)}
          >
            Start Learning
          </Button>
        ) : (
          <></>
        )}
      </div>
    </StyleCourseDetailsBanner>
  );
};
