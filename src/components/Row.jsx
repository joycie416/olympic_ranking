import React from 'react'

const Row = ({children, row}) => {
  const {country, gold, silver, bronze} = row;
  return (
    <tr className="data" key={country}>
            <td>{country}</td>
            <td>{gold}</td>
            <td>{silver}</td>
            <td>{bronze}</td>
            <td>
              {children}
            </td>
          </tr>
  )
}

export default Row