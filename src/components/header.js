import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import clsx from "clsx"

const Header = ({
  theme,
  fixed,
  showHeader,
  currentAnchor,
  collapseMenu,
  onShowHeaderClick,
  onCollapseMenuClick,
}) => {
  const data = useStaticQuery(graphql`
    query {
      defaultThemeLogo: file(
        relativePath: { eq: "itsdyeyson-logo-default.png" }
      ) {
        publicURL
      }

      darkThemeLogo: file(relativePath: { eq: "itsdyeyson-logo-dark.png" }) {
        publicURL
      }
    }
  `)

  const handleCollapseMenuClick = () => onCollapseMenuClick(!collapseMenu)
  const handleMenuLinkNavigate = () => {
    onCollapseMenuClick(true)
    if (fixed) {
      onShowHeaderClick(true)
    }
  }

  const headerClassName = clsx("w-full bg-transparent block h-auto", {
    "fixed top-0": fixed,
    hidden: !showHeader,
    "bg-white text-primary border-b": theme === "dark" || !collapseMenu,
    "h-screen": !collapseMenu,
  })

  const menuButtonClassName = clsx(
    "flex items-center px-3 py-2 border rounded text-white border-white hover:bg-teal-500",
    {
      "block text-primary border-primary bg-white":
        theme === "dark" || !collapseMenu,
    }
  )

  const menuContainerClassName = clsx(
    "container flex justify-center items-center text-center mx-auto lg:hidden",
    { hidden: collapseMenu }
  )

  const isActive = ({ href }) => {
    return {
      className: clsx("block mt-4 lg:inline-block lg:mr-4 mx-auto", {
        "font-bold": `/${currentAnchor}` === href,
      }),
    }
  }

  const menuContent = (
    <div className="text-sm lg:flex-grow">
      <Link to="/" getProps={isActive} onClick={handleMenuLinkNavigate}>
        HOME
      </Link>
      <Link
        to="/#about-section"
        getProps={isActive}
        onClick={handleMenuLinkNavigate}
      >
        ABOUT
      </Link>
      <Link
        to="/#project-section"
        getProps={isActive}
        onClick={handleMenuLinkNavigate}
      >
        PROJECTS
      </Link>
      <Link
        className="btn btn-cta"
        to="/#contact-section"
        onClick={handleMenuLinkNavigate}
      >
        SAY HI!
      </Link>
    </div>
  )

  return (
    <header className={headerClassName}>
      <nav className="container mx-auto p-6 nav">
        <div className="nav-title">
          <Link onClick={handleMenuLinkNavigate} to="/">
            <img
              className="h-5"
              src={
                data[`${(collapseMenu && theme) || "dark"}ThemeLogo`].publicURL
              }
              alt="logo"
            />
          </Link>
        </div>
        <div className="nav-menu block lg:hidden">
          <button
            className={menuButtonClassName}
            onClick={handleCollapseMenuClick}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full hidden lg:flex lg:items-center lg:w-auto">
          {menuContent}
        </div>
      </nav>
      <div className={menuContainerClassName}>{menuContent}</div>
    </header>
  )
}

Header.propTypes = {
  theme: PropTypes.oneOf(["default", "dark"]),
  currentAnchor: PropTypes.string.isRequired,
  fixed: PropTypes.bool,
  showHeader: PropTypes.bool,
  collapseMenu: PropTypes.bool.isRequired,
  onCollapseMenuClick: PropTypes.func.isRequired,
  onShowHeaderClick: PropTypes.func,
}

Header.defaultProps = {
  fixed: false,
  theme: "default",
  showHeader: true,
  onShowHeaderClick: () => {},
}

export default Header
