import styled from "styled-components";

const SearchBar = styled.div`
  margin: -10px 100px 10px 0;
  position: absolute;
  top: 0;
  right: 0;
  @media screen and (min-width: 400px) and (max-width: 1400px) {
    margin-right: 49px;
  }
`;

export default SearchBar;
