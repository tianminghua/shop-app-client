import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFlash } from "../redux/flashRedux";

const Container = styled.div`
  height: 30px;
  background-color: #eee296;
  color: #47442d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Flash = () => {
    const flash = useSelector(state => state.flash)
    const dispatch = useDispatch();

    setTimeout(() => { dispatch(removeFlash()) }, 5000)

    return (
        flash.hasFlash
            ?
            <Container>
                <strong>{flash.message}</strong>
            </Container>
            : null
    )
};

export default Flash;