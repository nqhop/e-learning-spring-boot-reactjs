import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import "react-multi-carousel/lib/styles.css";
import { StudentReviewCard, TutorCard } from "../DashboardCard";
import fakeData from "../../../TUTOR_CARD_MOCK_DATA.json";
import fakeData2 from "../../../STUDENT_REVIEWS_MOCK_DATA.json";
import fakeData3 from "../../../TUTOR_RANKING_MOCK_DATA.json";
import { useState,useEffect } from "react";
import { TutorHoverCard } from "../DashboardCard/TutorHoverCard";
import { TutorRankingTable } from "../Table";
import { DashboardPopupInfo } from ".";
import { BASE_URL } from "url/url";


const PageStyled = styled.div`
  width: 90%;
  margin: 52px 99px 0px 68px;
  background: "rgba(255, 255, 255, 0.7)";
  backdrop-filter: blur(62px);
  .head-page {
    width: 100%;
    padding-bottom: 24px;
    box-shadow: 0 1px 0 0 #edebeb;
    h3 {
      color: #8c8888;
      font-family: Poppins;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    h1 {
      color: #2e2c2c;
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  .slider-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    .slider-content-head {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 17px;
      span {
        color: #2e2c2c;
        font-family: Poppins;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .arrows-group {
        display: flex;
        gap: 13px;
      }
    }
  }
  /* .react-multi-carousel-list {
    border-radius: 13px;
  }
  .carousel-container {
    width: 100%;
    border-radius: 13px;
  }
  .carousel-container .react-multi-carousel-track {
    gap: 200px;
  }
  .react-multi-carousel-item {
    max-width: 438px;
    min-width: 268px;
  } */
  .ranking-table {
    width: 100%;
    margin-top: 66px;
    h2 {
      color: #2e2c2c;
      font-family: Poppins;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;
const responsiveAlice = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};
// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     partialVisibilityGutter: 40,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     partialVisibilityGutter: 40,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     partialVisibilityGutter: 40,
//   },
// };
// const reviewResponsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 1,
//     partialVisibilityGutter: 40,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 1,
//     partialVisibilityGutter: 40,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     partialVisibilityGutter: 40,
//   },
// };
export const DashboardContents = () => {
  const [isShow, setIsShow] = useState(false);
  const [getId, setId] = useState();
  const [getStudentReview, setStudentReview] = useState();
  const [userFetch, setUserFetch] = useState([]);
  const [role, setRole] = useState([]);
  const user = localStorage.getItem('user')

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

  return (
    <PageStyled>
      <div className="head-page">
        <h1>Welcome back {role}, {user}!</h1>
        <h3>
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            weekday: "long",
          }) + ""}
        </h3>
      </div>
      <div className="slider-content">
        <div className="slider-content-head">
          <span>Your recommendations</span>
        </div>
        <AliceCarousel
          mouseTracking
          responsive={responsiveAlice}
          controlsStrategy="alternate"
          disableDotsControls={true}
          infinite
        >
          {fakeData.map((o) => {
            return (
              <DashboardPopupInfo
                avatar={o.avatar}
                tutorName={o.name}
                tutorSchool={o.school_name}
                rating={o.rating}
                status={o.status}
                onMouseEnter={() => {
                  setIsShow(true);
                  setId(o.id);
                  setStudentReview(o.rating);
                }}
                onMouseLeave={() => setIsShow(false)}
              />
              // <TutorCard
              //   bgColor="#D0C1F1"
              //   avatar={o.avatar}
              //   isVerified="true"
              //   tutorName={o.name}
              //   tutorSchool={o.school_name}
              //   rating={o.rating}
              //   status={o.status}
              //   onMouseEnter={() => {
              //     setIsShow(true);
              //     setId(o.id);
              //     setStudentReview(o.rating);
              //   }}
              //   onMouseLeave={() => setIsShow(false)}
              // />
            );
          })}
        </AliceCarousel>
        {/* <Carousel
          responsive={responsive}
          centerMode={true}
          partialVisbile={false}
          infinite={true}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {fakeData.map((o) => {
            return (
              <TutorCard
                bgColor="#D0C1F1"
                avatar={o.avatar}
                isVerified="true"
                tutorName={o.name}
                tutorSchool={o.school_name}
                rating={o.rating}
                status={o.status}
                onMouseEnter={() => {
                  setIsShow(true);
                  setId(o.id);
                  setStudentReview(o.rating);
                }}
                onMouseLeave={() => setIsShow(false)}
              />
            );
          })}
        </Carousel>
        {isShow && (
          <TutorHoverCard
            id={getId}
            bgColor="#D0C1F1"
            onMouseEnter={() => {
              setIsShow(true);
            }}
            onMouseLeave={() => setIsShow(false)}
            rating={getStudentReview}
          >
            <Carousel
              responsive={reviewResponsive}
              centerMode={true}
              partialVisbile={false}
              containerClass="carousel-container"
              autoPlay
              autoPlaySpeed={5000}
              itemClass="carouselItem"
              infinite={true}
            >
              {fakeData2.map((o) => {
                return (
                  <StudentReviewCard
                    reviewsContent={o.reviews_content}
                    reviewsDate={o.reviews_date}
                    avatar={o.avatar}
                    studentName={o.student_name}
                    studentType={o.student_type}
                    rating={o.rating}
                  />
                );
              })}
            </Carousel>
          </TutorHoverCard>
        )} */}
        {isShow && (
          <TutorHoverCard
            id={getId}
            bgColor="#D0C1F1"
            onMouseEnter={() => {
              setIsShow(true);
            }}
            onMouseLeave={() => setIsShow(false)}
            rating={getStudentReview}
          >
            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="alternate"
              autoPlay
              autoPlayInterval={5000}
              animationDuration={1000}
              disableButtonsControls={true}
              disableDotsControls={true}
              infinite
            >
              {fakeData2.map((o) => {
                return (
                  <StudentReviewCard
                    reviewsContent={o.reviews_content}
                    reviewsDate={o.reviews_date}
                    avatar={o.avatar}
                    studentName={o.student_name}
                    studentType={o.student_type}
                    rating={o.rating}
                  />
                );
              })}
            </AliceCarousel>
          </TutorHoverCard>
        )}
      </div>
      <div className="ranking-table">
        <h2>Best tutors of the week</h2>
        <TutorRankingTable inputData={fakeData3} />
      </div>
    </PageStyled>
  );
};
