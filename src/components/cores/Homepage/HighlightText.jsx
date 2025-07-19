import React from 'react'

const HighlightText = ({text , allow}) => {
  return (
    <span className={`text-cyan-400 ${allow ? "italic" : ""} `}>
      {text}
    </span>
  )
}

export default HighlightText
