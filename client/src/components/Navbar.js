import { NavLink } from "react-router-dom";
import styled from "styled-components";
import gamerimg from "../images/gamerimg.png";

//React Icons
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { BsHourglassSplit } from "react-icons/bs";
import { TbDeviceDesktopHeart } from "react-icons/tb"

const NavBar = () => {
  


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


export default NavBar;
