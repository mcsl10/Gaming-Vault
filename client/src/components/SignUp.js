import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SignUp = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //Initialize navigate

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()
      console.log("Sign up response data:", data); // Log the entire response

      if (response.ok) {
        alert("Sign up successful!")
        //Set user state after successful signup
        setUser({id: data.user.id, email: data.user.email})
        navigate("/explore") //Redirect to explore on successful sign up
        
      } else {
        alert(data.message || "Sign up failed")
      }

    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.")
    }
  };

  return (
    <FormContainer>
    <StyledForm onSubmit={handleSignUp}>
      <InsideFormContainer>
      <EmailLabel htmlFor="email">Email:</EmailLabel>
      <EmailInput
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@hotmail.com"
        autoComplete="username"
        required
        />
      <PasswordLabel htmlFor="password">Password:</PasswordLabel>
      <PasswordInput
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="************"
        autoComplete="current-password"
        required
      />
      <SignUpButton type="submit">Sign Up</SignUpButton>
      </InsideFormContainer>
    </StyledForm>
    <Link to="/">
    <GoBackButton>Go back</GoBackButton>
    </Link>
    </FormContainer>
  );
};

const FormContainer = styled.div`
display: flex;
margin-top: 10%;
justify-content: center;
align-items: center;
flex-direction: column;
`

const InsideFormContainer = styled.div`
display: flex;
flex-direction: column;
`

const StyledForm = styled.form`
margin-bottom: 1.5rem;
`

const EmailLabel = styled.label`
font-size: 1.5rem;
color: lightslategray;
font-weight: 700;
`

const EmailInput = styled.input`
width: 12rem;
height: 2rem;
font-size: 1.15rem;
`

const PasswordLabel = styled.label`
font-size: 1.5rem;
color: lightslategray;
font-weight: 700;
`

const PasswordInput = styled.input`
width: 12rem;
height: 2rem;
margin-bottom: 1rem;
font-size: 1.15rem;
`

const SignUpButton = styled.button`
margin: 0 15%;
font-size: 1.6rem;
height: 2rem;
width: 8rem;
font-weight: 600;
font-family: "Poppins", sans-serif;
background-color: springgreen;
border-radius: 7px;
border-width: 0;
transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;

&:hover {
    cursor: pointer;
    opacity: 0.9;
transform: scale(0.9);
}
`

const GoBackButton = styled.button`
font-size: 1.3rem;
height: 1.6rem;
width: 6rem;
font-weight: 600;
font-family: "Poppins", sans-serif;
background-color: lightyellow;
border-radius: 7px;
border-width: 0;
transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s ease;

&:hover {
    cursor: pointer;
    opacity: 0.9;
transform: scale(0.9);
}
`


export default SignUp;
