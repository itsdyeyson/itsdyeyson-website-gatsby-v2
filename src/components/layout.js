/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"

import SiteContext from "../context/SiteContext"
import Header from "./header"
import "../scss/global.scss"

const Layout = ({ children }) => {
  const site = useContext(SiteContext)
  return (
    <>
      <Header
        theme="dark"
        fixed
        showHeader={site.showHeader}
        collapseMenu={site.collapseMenu}
        onCollapseMenuClick={site.setCollapseMenu}
      />
      <main>{children}</main>
      <footer className="w-full text-center bg-primary text-gray-400 p-6 text-xs">
        <span className="block">Crafted with ♥ by @itsdyeyson</span>
        <span>Made with Gatsby and TailwindCSS</span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
