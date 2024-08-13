import React from 'react'
import { useState } from 'react'

import OlympicTable from './OlympicTable'
import OlympicHead from './OlympicHead'
import DataSaver from './DataSaver'

const Olympic = ({children}) => {
  
  const [country, setCountry] = useState('');
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const [data, setData] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log('addData clicked');

    // state를 업데이트하는 방법 : 비동기로 (최원장 튜터님)
    const newRow = {country:country, gold:gold, silver:silver, bronze:bronze};
    // setRow(newRow);
    // console.log('new Row :', newRow);

    if (country.trim() === '') {
      alert('국가명을 입력해주세요');
    } else {
      if (isIncluded(data, newRow)) {
        alert('이미 추가된 국가입니다. "업데이트"를 이용해주세요.');
      } else {
        setData(sortData([...data, newRow]));
        
        initialize();
      }
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('updateData clicked');

    const newRow = {country:country, gold:gold, silver:silver, bronze:bronze};

    if (!isIncluded(data, newRow)) {
      alert('등록되지 않은 국가입니다. "국가 추가"를 이용해주세요.');
    } else {
      const idx = data.findIndex(ele => ele.country === newRow.country);
      data[idx] = newRow;

      setData(sortData([...data]));
      
      initialize();

      // document.getElementById('input_country').value = '';
      // document.getElementById('input_gold').value = 0;
      // document.getElementById('input_silver').value = 0;
      // document.getElementById('input_bronze').value = 0;
    }

  }

  const initialize = () => {
    
    document.getElementById('input_country').value = '';
    document.getElementById('input_gold').value = 0;
    document.getElementById('input_silver').value = 0;
    document.getElementById('input_bronze').value = 0;
  
    setCountry('');
  }

  return (
    <div className='container'>
      <OlympicHead
      setStates={[setCountry, setGold, setSilver, setBronze]}
      handlers={[handleAdd, handleUpdate]}>
        {children}
      </OlympicHead>
      <OlympicTable data={data} setData={setData}></OlympicTable>
      <DataSaver data={data} setData={setData}></DataSaver>
    </div>
  )
}

export default Olympic

const isIncluded = (data, newData) => {
  const countryName = data.map(ele => ele.country);
  if (countryName.includes(newData.country)) {
    return true;
  } else {
    return false;
  }
}

const sortData = (prevData) => {
  let data = [...prevData];
  // console.log('sortData :', data);
  // 내림차순으로 정렬
  data.sort((data1, data2) => {
    if (Number(data1.gold) !== Number(data2.gold)) {
      return Number(data2.gold) - Number(data1.gold);
    } else {
      if (Number(data1.silver) !== Number(data2.silver)) {
        return Number(data2.silver) - Number(data1.silver);
      } else {
        if (Number(data1.bronze) !== Number(data2.bronze)) {
          return Number(data2.bronze) - Number(data1.bronze);
        } else {
          if (data1.country >= data2.country) {
            return 1
          } else {
            return -1
          }
        }
      }
    }
  })
  return data;
}