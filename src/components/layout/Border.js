import styled from "styled-components";

const Border = styled.div`
  display: flex;
  flex-direction: column;
  border-left-style: solid !important;
  border-left: 5px;
  border-color: ${(props) => (props.color ? props.color : "red")};
  color: ${(props) => (props.color ? props.color : "red")};
  padding-left: 15px;
`;

export default Border;
