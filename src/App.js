import './App.css';
import { use, useEffect, useState, useRef } from 'react';

function App() {
  const [text, setText] = useState("");
  const sizeRef = useRef(null);
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    alert(`visualviewport: ${window.visualViewport.height},,,, innerHeight: ${window.innerHeight}`);
  }
  const handleBlur = () => {
    alert("Blur처리요!!")
  }

  useEffect(()=> {
    sizeRef.current = window.visualViewport.height;
    const handleResize = () => {
      alert("1: 오 resize 변화를 감지했어!!")
      if (window.visualViewport.height === window.innerHeight) {
        alert("2: 높이가 같아졌따!! 키패드가 내려갔다는거다!!")
      } else {
        alert("3: 높이가 다르다...")
      }
      if(sizeRef.current == window.visualViewport.height) {
        alert("4: 오 높이가 초기화가 됐어.. 이건 아마 갤럭시에서만 될거다??")
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  return (
      <div className="test">
        <h1>test:</h1>
        <br/>
        <button
          onClick = {handleClick}>
          확인
        </button>
        <input
          onChange={handleChange}
          placeholder="입력하시든가~"
          value={text || ""}
          onBlur={handleBlur}
        />
      </div>
  );
}

export default App;
