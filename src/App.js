import './App.css';
import { use, useEffect, useState, useRef } from 'react';

function App() {
  const [text, setText] = useState("");
  const sizeRef = useRef(null);
  const [eventLogs, setEventLogs] = useState([]);
  // 스크롤을 맨 하단으로 이동시키기 위한 ref
  const logContainerRef = useRef(null);
  
  // 이벤트 처리 함수
  const handleEvent = (eventDescription) => {
    // 새 이벤트를 로그 배열에 추가
    setEventLogs((prevLogs) => [...prevLogs, eventDescription]);
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    handleEvent(`visualviewport: ${window.visualViewport.height}`);
    handleEvent(`innerHeight: ${window.innerHeight}`);
    handleEvent(new Date().toLocaleTimeString());
    handleEvent("#######################");
  }
  const handleBlur = () => {
    handleEvent("Blur처리요!!");
    handleEvent(new Date().toLocaleTimeString());
    handleEvent("#######################");
  }

  useEffect(()=> {
    sizeRef.current = window.visualViewport.height;
    const handleResize = () => {
      handleEvent("1: 오 resize 변화를 감지했어!!")
      if (window.visualViewport.height === window.innerHeight) {
        handleEvent("2: 높이가 같아졌따!! 키패드가 내려갔다는거다!!")
      } else {
        handleEvent("3: 높이가 다르다...")
      }
      if(sizeRef.current == window.visualViewport.height) {
        handleEvent("4: 오 높이가 초기화가 됐어.. 이건 아마 갤럭시에서만 될거다??")
      }
      handleEvent(new Date().toLocaleTimeString());
      handleEvent("===========================================================================");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  // 이벤트 로그가 변경될 때마다 스크롤을 맨 하단으로 이동
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [eventLogs]);  // eventLogs 배열이 변경될 때마다 실행됨

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
          {/* 스크롤 가능한 이벤트 로그 영역 */}
      <div 
        ref={logContainerRef}
        style={{ 
          height: '80vh',       // 고정된 높이 설정
          overflowY: 'auto',     // 수직 스크롤 자동 추가
          border: '1px solid #ccc', // 테두리
          marginTop: '10px',      // 상단 여백
          padding: '10px'         // 내용 여백
        }}>
          {eventLogs.length === 0 ? (
            <p>이벤트가 없습니다.</p>
          ) : (
            <ul>
              {eventLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
      </div>
      </div>
  );
}

export default App;
