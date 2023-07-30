import styled from "styled-components";
import React, { useState } from "react";
import { DropdownSelector } from "../Selector";
import { CalenderSelector } from "../Selector";
import { Button } from "components/Button/Button";
import fakeData from "../../../LIST_CLASS_MOCK_DATA.json";
import { ClassCard } from "../DashboardCard";
import { async } from "q";
import { BASE_URL } from "url/url";

import Swal from "sweetalert2";

const MyClassPageContentsStyled = styled.div`
  height: 1273px;
  padding-top: 47px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h3 {
    color: #464444;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin: 91px 0px 13px 0px;
    min-width: 102px;
  }
  .form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .input-styled {
    border: #d3d3d3 solid;
    border-radius: 10px;
    outline: none;
    background: #fff;
    width: 50%;
    height: 52px;
    flex-shrink: 0;
    padding: 0px 10px;
  }
  .filter-button {
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-bottom: 20px;
    box-shadow: 0 1px 0 0 #edebeb;
  }
  .view-calendar {
    width: 10%;
    height: 22px;
    margin-top: 22px;
    color: #0c4ca3;
    text-align: left;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
  .class-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
  }
  @media screen and (max-width: 1212px) {
    align-items: center;
    .form-group {
      flex-direction: column;
    }
    .view-calendar {
      width: 100%;
      text-align: left;
    }
    .input-styled{
      width: 100%;
    }
  }
  .btn-add-link{
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: cornflowerblue;
    display: block;
    margin-bottom: 12px;
    cursor: pointer;
  }
  .btn-submit{
    margin-top: 12px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: green;
    color: #fff;
    display: block;
    margin-bottom: 12px;
    cursor: pointer;
  }
`;

export const AddCoursesContents = () => {
    const user = localStorage.getItem('user')

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        desciption: "",
        listOfVideo: "",
        thumbnail: "",
        tutor: localStorage.getItem("user")
    });

    const [formDataVIdeo, setformDataVIdeo] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [inputList, setInputList] = useState([]);

    const handleInputChangeLinkVideo = (e) => {
        const { name, value } = e.target;

        let tempformDataVIdeo = formDataVIdeo;
        tempformDataVIdeo[inputList.length] = value;
        setformDataVIdeo(tempformDataVIdeo);
    };


    const handleAddSubmit = async (e) => {
        e.preventDefault();
        // console.log(formDataVIdeo)
        formData.listOfVideo = formDataVIdeo.join()
        setFormData(formData)
        // console.log(formData)
        try {
            const response = await fetch(
                `${BASE_URL}/admin/add-course`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            setFormData({
                name: "",
                price: 0,
                desciption: "",
                listOfVideo: "",
                thumbnail: "",
                tutor: localStorage.getItem("user")
            })
            setInputList([])
            console.log(formData)
            const data = await response.json();


            Swal.fire({
                title: 'Success',
                text: "Added a course",
                type: 'success',

            })
            // navigate("/login-page");
        } catch (error) {
            console.error("Error add course:", error);
        }
    }


    const onAddBtnClick = event => {
        setInputList(inputList.concat(
            <>
                <label>Link of video</label>
                <br />
                <input
                    key={inputList.length}
                    className="input-styled"
                    type="text"
                    // name="listOfVideo"
                    placeholder="Price"
                    value={formDataVIdeo[inputList.length]}
                    onChange={handleInputChangeLinkVideo} />
                <br /><br />
            </>

        ));
    };



    return (
        <MyClassPageContentsStyled>
            <div className="form-group">
                <form onSubmit={handleAddSubmit}>
                    <label>Title</label>
                    <br />
                    <input
                        className="input-styled"
                        type="text"
                        name="name"
                        placeholder="Title"
                        value={formData.name}
                        onChange={handleInputChange}

                    />
                    <br /><br />

                    

                    <label>Description</label>
                    <br />
                    <input
                        className="input-styled"
                        type="text"
                        name="desciption"
                        placeholder="Description"
                        value={formData.desciption}
                        onChange={handleInputChange} />
                    <br /><br />

                    <label>Price ($)</label>
                    <br />
                    <input
                        className="input-styled"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange} />
                    <br /><br />

                    <button className="btn-add-link" type="button"
                        onClick={onAddBtnClick}
                    >Add video</button>
                    {inputList}

                    <label>thumbnail</label>
                    <br />
                    <input
                        className="input-styled"
                        type="text"
                        name="thumbnail"
                        placeholder="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleInputChange} />
                    <br />
                    {/* <Button className="btn-submit" bgColor="green" type="submit">Add Course</Button> */}

                    <button className="btn-submit" type="submit"
                    >Add Course</button>
                </form>

            </div>
            <div className="class-wrapper">
            </div>
        </MyClassPageContentsStyled>
    );
};
