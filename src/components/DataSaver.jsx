import React from 'react'
import Button from './Button'


const DataSaver = ({data, setData}) => {

  const saveData = (e) => {
    e.preventDefault();
    alert('데이터를 저장했습니다.');
    localStorage.setItem('olympic_medal', JSON.stringify(data));
  }

  const removeData = (e) => {
    e.preventDefault();

    const result = confirm('정말로 초기화하시겠습니까?');

    if (result) {
      window.location.reload();
      // setData([]);
    }
  }

  const loadData = (e) => {
    e.preventDefault();
    
    const loaded = localStorage.getItem('olympic_medal');

    if (!loaded) {
      alert('저장된 데이터가 없습니다.');
    } else {
      alert('데이터를 불러왔습니다.');

      setData(JSON.parse(loaded))
    }
  }

  return (
    <footer>
      <div className='footer_container'>
        <Button id='saveData' onClick={saveData}>저장하기</Button>
        <Button id='removeData' onClick={removeData}>초기화</Button>
        <Button id='loadData' onClick={loadData}>불러오기</Button>
      </div>
    </footer>
  )
}

export default DataSaver