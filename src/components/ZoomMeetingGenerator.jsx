// import some libraries
import React, {useState} from "react"
import { createZoomMeeting } from "../api/zoomApi"
import {getDate} from "../utils/dateUtils"
import "bulma/css/bulma.min.css"

export default function ZoomMeetingGenerator (){
  //define state
  const [studentName,setStudentName] = useState(""); // studentname
  const [day,setDay] = useState(""); // meeting day
  const [koma,setKoma] = useState(""); // when the class?
  const [week,setWeek] = useState("this"); // this week or next week?
  const [message,setMessage] = useState(""); // message for copie
  // 授業コマをmapに保存（平日なら1-3コマ、休日なら1-5コマ、時間が異なる）
  const komaTimes ={
    weekday: new Map([
      [1, "16:30"],
      [2, "18:05"],
      [3, "19:40"],
    ]),
    weekend: new Map([
      [1, "10:00"],
      [2, "11:35"],
      [3, "13:10"],
      [4, "14:45"],
      [5, "16:20"],
    ])
  }
  // handle submit (input from user), this func is 
  async function handleSubmit(){
    // check info arent null
    if(!studentName || !day || !koma){
      alert("全てのフォームを入力してください！")
    }
    // Insert startTime by using day of week
    const isWeekend = (day === "Saturday" || day === "Sunday");
    const startTime = isWeekend ? komaTimes.weekend.get(koma) : komaTimes.weekday.get(koma);
    console.log(startTime)
    if(!startTime){
      alert ("無効なコマが選択されました")
      return 0;
    }
    // define meeting date(ex. YYYY-MM-DD)
    const date = getDate(day,week);
    // get message from railsAPI, createZoomMeeting function
    try{
      const {message,status} = await createZoomMeeting({
        student_name: studentName,
        selected_date: date,
        start_time: startTime
      });
      if(status === "success"){ 
        // setMessage and init all input
        setMessage(message);
        setStudentName("");
        setDay("");
        setKoma("");
        setWeek("this");
      }
      else{
        alert("ZOOMミーティングの作成に失敗しました。もう一度試してください。")
      }
    } catch (error){
      alert("ZOOMミーティング作成中にエラーが発生しました。")
    }
  };
  return (
    <div className="container mt-5">
      <h1>Zoom Meeting Generator</h1>

      <div className="field">
        <label className="label">生徒名</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="生徒名を入力"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">曜日</label>
        <div className="control">
          <div className="select">
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="" disabled selected>選択してください</option>
              <option value="Monday">月曜日</option>
              <option value="Tuesday">火曜日</option>
              <option value="Wednesday">水曜日</option>
              <option value="Thursday">木曜日</option>
              <option value="Friday">金曜日</option>
              <option value="Saturday">土曜日</option>
              <option value="Sunday">日曜日</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">コマ</label>
        <div className="control">
          <div className="select">
            <select value={koma} onChange={(e) => setKoma(parseInt(e.target.value))}>
              <option value="" disabled selected>選択してください</option>
              <option value="1">1コマ</option>
              <option value="2">2コマ</option>
              <option value="3">3コマ</option>
              {(day === "Saturday" || day === "Sunday") ? (
                <>
                  <option value="4">4コマ</option>
                  <option value="5">5コマ</option>
                </>
                ): null}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">今週または来週</label>
        <div className="control">
          <div className="select">
            <select value={week} onChange={(e)=> setWeek(e.target.value)}>
              <option value="this">今週</option>
              <option value="next">来週</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleSubmit}>Generate Zoom Meeting</button>
        </div> 
      </div>

      <div className="field">
        <label className="label">Generated Message</label>
        <div className="control">
          <textarea
          className="textarea"
          readOnly
          value={message}
          onClick={(e) => e.target.select()}
          style={{ minHeight: '150px' }} // Ensures it has a fixed height for easy readability
          ></textarea>
        </div>
      </div>
    </div>
  );
};