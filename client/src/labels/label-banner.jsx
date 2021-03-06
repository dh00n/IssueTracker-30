import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import host from "../../config.js"
import LabelEditor from "./label-editor.jsx";

const StyledLabelBanner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: max-content;
    padding: 5px;
    box-shadow: 0 1px 1px -1px rgb(36, 41, 46);

    &:hover {
        background-color: rgba(236, 239, 241, 1);
        cursor: default;
    }

    &:focus {
        outline: none;
    }
`;

const StyledLabelInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 50px;
`;

const StyledLabelTagDiv = styled(Link)`
    width: 250px;
    
    text-decoration: none;

    &:hover {
        cursor: default;
    }
`;

const StyledLabelTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;

    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: rgb(255, 255, 255);
    font-weight: 400;
`;

const StyledLabelDetail = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 530px;

    color: rgb(88, 96, 105);
`;

const StyledLabelEditDeleteDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 120px;
`;

const StyledLabelEditDeleteButton = styled.button`
    display: ${(props) => (props.visible ? "block" : "none")};
    width: auto;

    border: none;
    background-color: transparent;
    color: rgb(88, 96, 105);

    font-weight: 100;
    font-size: 12px;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const LabelBanner = ({
    data: { ID, color, content: name, description: desc },
    getRandomColor,
}) => {
    const [isEditorVisible, setEditorVisible] = useState(false);
    const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
    const [contents, setContents] = useState({
        ID,
        name,
        desc,
        color,
    });

    const onEditButtonClick = () => {
        setEditorVisible(true);
        setIsEditButtonVisible(false);
    };

    const onDeleteButtonClick = () => {
        const isReallyDelete = confirm("정말 삭제하시겠습니까?");

        if (isReallyDelete) {
            axios({
                method: "DELETE",
                url: `http://${host}:3000/label`,
                data: { labelId: ID },
                withCredentials: true,
            })
                .then((res) => {
                    let isSuccess = false;
                    if (res.data.message === "success") {
                        alert(`레이블 "${name}"가 삭제되었습니다!`);
                        isSuccess = true;
                    }
                    return isSuccess;
                })
                .then((isSuccess) => {
                    if (isSuccess) {
                        axios({
                            method: "GET",
                            url: `http://${host}:3000/label`,
                            withCredentials: true,
                        }).then((labels) => {
                            localStorage.setItem(
                                "labelsData",
                                JSON.stringify(labels.data)
                            );
                            location.href = "/labels";
                        });
                    }
                });
        }
    };

    return (
        <StyledLabelBanner>
            <StyledLabelInfo>
                <StyledLabelTagDiv>
                    <StyledLabelTag color={color}>{name}</StyledLabelTag>
                </StyledLabelTagDiv>
                <StyledLabelDetail>{desc || name}</StyledLabelDetail>
                <StyledLabelEditDeleteDiv>
                    <StyledLabelEditDeleteButton
                        visible={isEditButtonVisible}
                        onClick={onEditButtonClick}
                    >
                        Edit
                    </StyledLabelEditDeleteButton>
                    <StyledLabelEditDeleteButton
                        visible={true}
                        onClick={onDeleteButtonClick}
                    >
                        Delete
                    </StyledLabelEditDeleteButton>
                </StyledLabelEditDeleteDiv>
            </StyledLabelInfo>

            <LabelEditor
                mode={"edit"}
                contents={contents}
                setContents={setContents}
                getRandomColor={getRandomColor}
                isEditorVisible={isEditorVisible}
                setIsNewAreaVisible={setEditorVisible}
                setIsEditButtonVisible={setIsEditButtonVisible}
            />
        </StyledLabelBanner>
    );
};

export default LabelBanner;
