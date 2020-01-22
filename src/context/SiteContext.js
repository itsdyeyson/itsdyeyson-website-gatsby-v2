import React, { useState } from "react"

const defaultState = {
  showHeader: false,
  setShowHeader: () => {},
}

const SiteContext = React.createContext(defaultState)

export const SiteProvider = ({ children }) => {
  const [title, setTitle] = useState("Home")
  const [showHeader, setShowHeader] = useState(false)
  const [collapseMenu, setCollapseMenu] = useState(true)

  return (
    <SiteContext.Provider
      value={{
        title,
        setTitle,
        showHeader,
        setShowHeader,
        collapseMenu,
        setCollapseMenu,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const SiteConsumer = SiteContext.Consumer
export default SiteContext