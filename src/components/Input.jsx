const InputBox = ({children, id, setInput}) => {

  return (
    <div className="input_box">
      <p>{children}</p>
      <input className="input_medal" id={id} type="number" min="0" defaultValue={"0"} 
      onChange={(e) => {
        setInput(Number(e.target.value));
      }}/>
    </div>
  );
}

export default InputBox;