import React from 'react'

const Button = ({children, className, id, onClick, ...args}) => {
  return (
    <button className={className} id={id} onClick={onClick}>{children}</button>
  )
}

export default Button