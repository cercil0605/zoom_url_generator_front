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
      if(status ==="success"){ 
        setMessage(message);
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
      <h1></h1>
    </div>
  );
};