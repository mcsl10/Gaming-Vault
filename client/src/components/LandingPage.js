import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Components
import SignUp from "./SignUp";
import LogIn from "./LogIn";

//React Icon
import { IoGameControllerOutline } from "react-icons/io5";

const LandingPage = ({user}) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleToggle = () => {
    setShowSignUp((prevState) => !prevState);
  };

  return (
    <Container>
      <Title>Gaming Vault</Title>
      <Description>
        Gaming Vault is your all-in-one platform for discovering, tracking, and
        rating games. Organize your library and add personal
        notes with ease. Elevate your gaming experience today <IconStyling><IoGameControllerOutline size={30} /></IconStyling>
      </Description>
    
    <ButtonsContainer>
      <Link to="/signup">
        <GetStartedButton>Get Started</GetStartedButton>
      </Link>

      <Link to="/login">
        <AccountButton>Log in</AccountButton>
      </Link>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Title = styled.h1`
font-size: 4.5rem;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
margin-bottom: 3rem;
margin-top: 2rem;
/* background: linear-gradient(to right, #A8E6CF, #4A6A4D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */

  background: linear-gradient(270deg, #ADD8E6, #2E8B57);
  background-size: 300% 300%;
  animation: gradientAnimation 5s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Description = styled.p`
max-width: 40%;
font-size: 1.6rem;
font-family: Arial, Helvetica, sans-serif;
margin-bottom: 2rem;
color: gainsboro;
`;

const IconStyling = styled.span`
display: inline-flex;
align-items: center;
transform: translateY(0.31rem); //Check if there are better ways for this 
`

const GetStartedButton = styled.button`
height: 4rem;
padding: 0.5rem 3rem;
margin-bottom: 1.5rem;
border-radius: 7px;
font-size: 2.5rem;
font-family: "Poppins", sans-serif;
font-weight: 600;
background-color: springgreen;
transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
border-width: 0;
line-height: 1;

&:hover {
    cursor: pointer;
    opacity: 0.9;
transform: scale(0.9);
}
`

const AccountButton = styled.button`
height: 3rem;
width: 10rem;
margin-left: 25%;
padding: 0.5rem 1rem;
border-radius: 7px;
font-size: 1.8rem;
font-family: "Poppins", sans-serif;
font-weight: 600;
background-color: aquamarine;
transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
border-width: 0;
line-height: 1;

&:hover {
    cursor: pointer;
    opacity: 0.9;
transform: scale(0.9);
}
`

const ButtonsContainer = styled.div`
display: flex;
flex-direction: column;
`

export default LandingPage;
