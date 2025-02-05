import axios from "axios";

export const createZoomMeeting = async (data) => {
  try {
    const response = await axios.post("http://localhost:3010/zoom/create_meeting", data,{withCredentials: true});
    return response.data;
  } catch (error) {
    // show error message
    console.error("Error creating Zoom meeting:", error.response.data);
    // railsAPIから受け取ったmessageを表示
    alert(error.response.data.message)
    throw error;
  }
};
