import React from 'react'
import Row from './Row'
import Button from './Button'

const OlympicTable = ({ data, setData }) => {
  const deleteData = (country) => {
    return () => {
      console.log('delete btn clicked');
      const result = confirm('정말로 삭제하시겠습니까?');

      if (result) {
        console.log('deleting...');

        const newData = data.filter(ele => ele.country !== country);
        setData(newData);
        console.log(country, 'deleted');
      }
    }
  }

  return (
    <div className="table_container">
      <table id="medal_table">
        <thead className="fixed">
          <tr className="table_head">
            <th>국가명</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <Row row={row}>
              <Button className='delete_btn' onClick={deleteData(row.country)}>삭제</Button>
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OlympicTable;