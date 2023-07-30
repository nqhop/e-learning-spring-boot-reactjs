import { Button } from "components/Button/Button";
import AliceCarousel from "react-alice-carousel";
import { VideoPlayerJSX } from "components/Dashboard/VideoPlayer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "url/url";

import styled from "styled-components";

const responsiveAlice = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
const VideoPlayerPageStyled = styled.div`
  .select-video-input {
    width: 80px;
    height: 30px;
    border-radius: 10px;
    padding-left: 8px;
    margin: 8px;
    border: none;
  }
  .button-select-videoid {
    width: 375px;
    height: 233px;
    border-radius: 10px;
    border: none;
    margin: 8px;
  }
  .video-list{
    margin-left: 70px;
  }
`;
const getYtThumbnail = (url, quality) => {
  if (url) {
    var video_id, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }
    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }
      var quality_key = "maxresdefault"; // Max quality
      if (quality === "low") {
        quality_key = "sddefault";
      } else if (quality === "medium") {
        quality_key = "mqdefault";
      } else if (quality === "high") {
        quality_key = "hqdefault";
      }

      thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      return thumbnail;
    }
  }
  return false;
};
const VideoPlayerPage = () => {
  const { id } = useParams();
  const [selectedVid, setSelectedVid] = useState("");
  const [course, setCourse] = useState([]);
  const [vidLinks, setVidLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/admin/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCourse(data);

        if (data.listOfVideo) {
          const listOfVideo = data.listOfVideo.split(",");
          setVidLinks(listOfVideo);
          if (listOfVideo?.length > 0) {
            setSelectedVid(listOfVideo[0]);
          }
        } else {
          // set error
        }
      });
  }, [id]);

  if (loading) {
    return <div>Loading video links</div>;
  }

  if (vidLinks?.length === 0) {
    return <div>No videos available</div>;
  }

  const handleSelected = (link) => {
    console.log(link);
    setSelectedVid(link);
  };

  return (
    <VideoPlayerPageStyled>
      <VideoPlayerJSX vidLink={selectedVid} />
      <div className="video-list">
        {/* <input
          className="select-video-input"
          defaultValue={0}
          type="number"
          min="0" // Minimum value allowed
          max="5" // Maximum value allowed
          onChange={(event) => {
            console.log(event.target.value);
            // console.log(vidLinks);
            setSelectedVid(vidLinks[event.target.value] || vidLinks[0]);
          }}
        /> */}
        <AliceCarousel
          mouseTracking
          responsive={responsiveAlice}
          controlsStrategy="alternate"
          disableDotsControls={true}
          infinite
        >
          {vidLinks?.map((link, index) => (
            <button
              className="button-select-videoid"
              onClick={() => {
                handleSelected(link);
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src={getYtThumbnail(link, "sddefault")}
                alt=""
                width="375px"
                height="233px"
              />
            </button>
          ))}
        </AliceCarousel>

        {console.log("vidLinks ", vidLinks.length)}
      </div>
    </VideoPlayerPageStyled>
  );
};
export default VideoPlayerPage;
