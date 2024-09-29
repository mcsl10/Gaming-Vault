import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import gamerimg from "../images/gamerimg.png";

//React Icons
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { BsHourglassSplit } from "react-icons/bs";
import { TbDeviceDesktopHeart } from "react-icons/tb"

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate(); //Initialize navigate

  const handleLogout = () => {
    setUser(null); //Clear user
    alert("Logged out successfully!");
    navigate("/"); //Redirect to landing page
  }


  return (
    <StyledNav>
      <ContainerForImg>
        <StyledImg src={gamerimg} alt="Gaming-Logo" />
      </ContainerForImg>
      <ContainerForLinks>
        <StyledNavLink end to="/explore">
          Explore <MdOutlineExplore />
        </StyledNavLink>
        <StyledNavLink end to="/search">
          Search <IoGameControllerOutline />
        </StyledNavLink>
        <StyledNavLink end to="/interested">
          Interested <TbDeviceDesktopHeart />
        </StyledNavLink>
        <StyledNavLink end to="/in-progress">
          In Progress <BsHourglassSplit />
        </StyledNavLink>
        <StyledNavLink end to="/completed">
          Completed <GiTrophyCup />
        </StyledNavLink>
        {user && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>} {/* Show Logout if user is logged in */}
      </ContainerForLinks>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  background-color: black;
  height: 5.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
  border-bottom: 3px solid chartreuse;
  z-index: 1000;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.35rem;
  margin: 0 3rem;
  color: mintcream;
  transition: font-size 0.3s ease, opacity 0.3s ease, transform 0.3s, font-weight 0.2s;

  &:hover {
    color: chartreuse;
    opacity: 0.7;
    transform: scale(0.98);
  }

  &.active {
    font-weight: 700;
    color: chartreuse;
  }

  @media (max-width: 768px) {
    margin: 0 1rem; /* Reduce margin on smaller screens */
  }

  @media (max-width: 500px) {
    font-size: 1rem; /* Adjust font size for very small screens */
    margin: 0 0.5rem; /* Further reduce margin */
  }
`;

const ContainerForLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const StyledImg = styled.img`
  height: 5rem;
  margin-left: 0.5rem;
`;

const ContainerForImg = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LogoutButton = styled.button`
 font-size: 1rem;
  background: transparent;
  border: 2px solid chartreuse;
  color: chartreuse;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: absolute; //Needs to be fixed to be responsive 
  // Need the Button to be fully on the right 
  right: 2rem;
  top: 1.32rem;

  &:hover {
    background: chartreuse;
    color: black;
  } 
`

export default NavBar;
