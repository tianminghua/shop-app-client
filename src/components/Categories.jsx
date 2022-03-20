import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 0px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}

`;

const Categories = (props) => {
  return (
    <Container>
      {props.data.map((item) => (
        <props.component item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
