import React, { useState } from "react";
import styled from "styled-components";

import HeaderButtons from "./header-buttons.jsx";
import HeaderSearchInput from "./header-search-input.jsx";
import HeaderNewButton from "./header-new-button.jsx";
import NewIssueArea from "./new-label-editor-area.jsx";

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;

    width: 900px;

    margin-top: 20px;
`;

const StyledDefaultHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const StyledSearchInputs = styled.div`
    display: flex;
    justify-content: space-between;
    width: 590px;
`;

const SearchHeader = ({ getRandomColor, filterText, setFilterText }) => {
    const [isNewAreaVisible, setIsNewAreaVisible] = useState(false);

    return (
        <StyledHeader>
            <StyledDefaultHeader>
                <StyledSearchInputs>
                    <HeaderButtons />
                    <HeaderSearchInput
                        filterText={filterText}
                        setFilterText={setFilterText}
                    />
                </StyledSearchInputs>
                <HeaderNewButton setIsNewAreaVisible={setIsNewAreaVisible} />
            </StyledDefaultHeader>
            <NewIssueArea
                isNewAreaVisible={isNewAreaVisible}
                setIsNewAreaVisible={setIsNewAreaVisible}
                getRandomColor={getRandomColor}
            />
        </StyledHeader>
    );
};

export default SearchHeader;
