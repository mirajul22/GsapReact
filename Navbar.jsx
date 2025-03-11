import { NavLink } from "react-router-dom";
import gsap from "gsap";

const FloatingNavLink = ({ to, children }) => {
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -5, duration: 0.3, ease: "power1.out" });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power1.out" });
  };

  return (
    <NavLink
      to={to}
      className="px-4 py-2 text-lg font-medium transition-all hover:text-blue-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav className="flex gap-6 p-4 bg-white shadow-md">
      <FloatingNavLink to="/">Home</FloatingNavLink>
      <FloatingNavLink to="/about">About</FloatingNavLink>
      <FloatingNavLink to="/services">Services</FloatingNavLink>
      <FloatingNavLink to="/contact">Contact</FloatingNavLink>
    </nav>
  );
};

export default Navbar;
