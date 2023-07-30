import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { TutorCard } from "components/Card/Card";
import avatar1 from "assets/images/avatars/avatar1.svg"
import tutor1 from "assets/images/avatars/tutors/tutor1.png"
import tutor2 from "assets/images/avatars/tutors/tutor2.png"
import tutor3 from "assets/images/avatars/tutors/tutor3.png"
import tutor4 from "assets/images/avatars/tutors/tutor4.png"
import { BASE_URL } from "url/url";


const GoodDesignStyled = styled.div`
    /* height: 400px; */
    .title{
        font-size: 40px;
        font-weight: 700;
        line-height: 60px;
        letter-spacing: 0em;
        margin-bottom: 100px;
    }
`
const GoodDesign = () => {
    const responsiveAlice = {
        0: { items: 1 },
        568: { items: 2 },
        800: { items: 3 },
        1024: { items: 4 },
    };
    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        fetch(`${BASE_URL}/admin/tutor`)
        .then((res) => res.json())
        .then((result) => {
            setTutors(result)
        })
    }, []);
    const desc = [
        'I love teaching because it’s so satisfying when you see that little light bulb go off plus my co-workers are great.',
        'I have spent the last few years teaching people to program at 2 different immersive bootcamps where I helped hundreds of people become web developers and change their lives.',
        "I'm a full-stack web developer and designer with a passion for building beautiful web interfaces from scratch. I've been building websites and apps since 2010 and also have a Master's degree in Engineering.",
        "Having over 20 years of experience in the computer science and information technology fields. Taught many courses at the University level to thousands of students."
    ]
    const listTutorAvatar = [tutor1, tutor2, tutor3, tutor4]
    let tutorAvatarId = -1;
    const getTutorAvatar = () => {
        tutorAvatarId += 1;
        if (tutorAvatarId >= listTutorAvatar.length){
            tutorAvatarId = -1;
            return listTutorAvatar[0]
        }
        return listTutorAvatar[tutorAvatarId]
    }

    return <GoodDesignStyled>
        {console.log(tutors)}
        <p className="title">Get to know your tutors</p>
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
        {tutors.map((tutor) => (
            <TutorCard
                avatar={getTutorAvatar()}
                tutorName={tutor.name}
                desciption={desc[Math.floor(Math.random() * desc.length)]}
            />
        ))}
        </AliceCarousel>
    </GoodDesignStyled>
}

export default GoodDesign