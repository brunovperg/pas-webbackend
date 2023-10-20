/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #007bff;
    width: 136px;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #0062cc;
    }
`;

const Button = ({ text, onClick }) => {
        return (
                <StyledButton onClick={onClick}>
                        {text}
                </StyledButton>
        );
};

export default Button;
