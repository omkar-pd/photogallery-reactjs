import React from 'react'

export const Button = (props) => {
  return (
    <>
    <button className={props.className} type={props.type}>{props.children}</button>
    </>
  )
}
