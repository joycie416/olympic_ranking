import React from 'react'
import InputBox from './Input'
import Button from './Button'

const OlympicHead = ({children, setStates, handlers}) => {
  const [setCountry, setGold, setSilver, setBronze] = setStates;
  const [handleAdd, handleUpdate] = handlers;

  return (
    <header>
        <div className="title">
          <h2>{children}</h2>
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
              <Button id='add_country' onClick={handleAdd}>국가 추가</Button>
              <Button id='update' onClick={handleUpdate}>업데이트</Button>
            </div>
          </form>
        </div>
      </header>
  )
}

export default OlympicHead;