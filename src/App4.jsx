import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import InputBox from './components/Input'
import Button from './components/Button'
import Row from './components/Row'


function App() {
  const [country, setCountry] = useState('');
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  // const [row, setRow] = useState({
  //   country: country,
  //   gold: gold,
  //   silver: silver,
  //   bronze: bronze,
  // })

  const [data, setData] = useState([]);

  const addData = (e) => {
    e.preventDefault();
    console.log('addData clicked');

    // state를 업데이트하는 방법 : 비동기로 (최원장 튜터님)
    const newRow = {country:country, gold:gold, silver:silver, bronze:bronze};
    // setRow(newRow);
    // console.log('new Row :', row);

    if (country.trim() === '') {
      alert('국가명을 입력해주세요');
    } else {
      if (isIncluded(data, newRow)) {
        alert('이미 추가된 국가입니다. "업데이트"를 이용해주세요.');
      } else {
        setData(sortData([...data, newRow]));
        
        document.getElementById('input_country').value = '';
        document.getElementById('input_gold').value = 0;
        document.getElementById('input_silver').value = 0;
        document.getElementById('input_bronze').value = 0;
      }
    }
  }

  const updateData = (e) => {
    e.preventDefault();
    console.log('updateData clicked');

    const newRow = {country:country, gold:gold, silver:silver, bronze:bronze};
    setRow(newRow);

    if (!isIncluded(data, newRow)) {
      alert('등록되지 않은 국가입니다. "국가 추가"를 이용해주세요.');
    } else {
      const idx = data.findIndex(ele => ele.country === newRow.country);
      data[idx] = newRow;

      setData(sortData([...data]));
      
      document.getElementById('input_country').value = '';
      document.getElementById('input_gold').value = 0;
      document.getElementById('input_silver').value = 0;
      document.getElementById('input_bronze').value = 0;
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
              <input className="input_country" id="input_country" type='text' defaultValue={''}
              onChange={(e) => {
                setCountry(e.target.value.trim());
              }}/>
            </div>
            <InputBox id="input_gold" setInput={setGold}>금메달</InputBox>
            <InputBox id="input_silver" setInput={setSilver}>은메달</InputBox>
            <InputBox id="input_bronze" setInput={setBronze}>동메달</InputBox>
            <div className="button_container">
              <Button id='add_country' onClick={addData}>국가 추가</Button>
              <Button id='update' onClick={updateData}>업데이트</Button>
            </div>
          </form>
        </div>
      </header>
      <div className="table_container">
        {/* <table> 자리 */}
        <MakeTable data={data} setData={setData} />
      </div>
      <SaveData data={data} setData={setData} />
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
          <Row row={row}>
              <Button className='delete_btn' onClick={deleteData(row.country)}>삭제</Button>
          </Row>
        ))}
      </tbody>
    </table>
  );
}

const SaveData = ({data, setData}) => {

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

