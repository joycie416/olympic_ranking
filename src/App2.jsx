import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [data, setData] = useState([]);

  const addData = () => {
    console.log('addData clicked');

    const country = document.getElementById('input_country');
    const gold = document.getElementById('input_gold');
    const silver = document.getElementById('input_silver');
    const bronze = document.getElementById('input_bronze');

    const row = {
      country: country.value,
      gold: gold.value,
      silver: silver.value,
      bronze: bronze.value,
    }

    if (isIncluded(data, row)) {
      alert('이미 추가된 국가입니다. "업데이트"를 이용해주세요.')
    } else {
      setData(sortData([...data, row]));

      country.value = '';
      gold.value = 0;
      silver.value = 0;
      bronze.value = 0;

      // console.log('addData :', data);
    }
  }

  const updateData = () => {
    console.log('updateData clicked');

    const country = document.getElementById('input_country');
    const gold = document.getElementById('input_gold');
    const silver = document.getElementById('input_silver');
    const bronze = document.getElementById('input_bronze');

    const row = {
      country: country.value,
      gold: gold.value,
      silver: silver.value,
      bronze: bronze.value,
    }

    if (!isIncluded(data, row)) {
      alert('등록되지 않은 국가입니다. "국가 추가"를 이용해주세요.');
    } else {
      const idx = data.findIndex(ele => ele.country === row.country);
      data[idx] = row;

      setData(sortData([...data]));

      country.value = '';
      gold.value = 0;
      silver.value = 0;
      bronze.value = 0;

      console.log('updateData :', data);
    }

  }

  return (
    <div className="container">
      <header>
        <div className="title">
          <h2>2024 파리 올림픽</h2>
        </div>
        <div className="form_container">
          <form className="medal_form">
            <div className="input_box">
              <p>국가명</p>
              <input className="input_country" id="input_country" />
            </div>
            <div className="input_box">
              <p>금메달</p>
              <input className="input_medal" id="input_gold" type="number" min="0" defaultValue="0" />
            </div>
            <div className="input_box">
              <p>은메달</p>
              <input className="input_medal" id="input_silver" type="number" min="0" defaultValue="0" />
            </div>
            <div className="input_box">
              <p>동메달</p>
              <input className="input_medal" id="input_bronze" type="number" min="0" defaultValue="0" />
            </div>
            <div className="button_container">
              <button id="add_country" type='button' onClick={addData}>국가 추가</button>
              <button id="update" type='button' onClick={updateData}>업데이트</button>
            </div>
          </form>
        </div>
      </header>
      <div className="table_container">
        {/* <table> 자리 */}
        <MakeTable data={data} setData={setData} />
      </div>
    </div>
  )
}

export default App

const MakeTable = ({data, setData}) => {
  


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
          <tr className="data" key={row.country}>
            <td>{row.country}</td>
            <td>{row.gold}</td>
            <td>{row.silver}</td>
            <td>{row.bronze}</td>
            <td><button className='delete_btn' onClick={deleteData(row.country)}>삭제</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const sortData = (prevData) => {
  let data = [...prevData];
  console.log('sortData :', data);
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

const isIncluded = (data, newData) => {
  const countryName = data.map(ele => ele.country);
  if (countryName.includes(newData.country)) {
    return true;
  } else {
    return false;
  }
}