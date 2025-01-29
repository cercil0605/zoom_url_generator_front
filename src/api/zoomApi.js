import axios from "axios";

export const createZoomMeeting = async (data) => {
  try {
    const response = await axios.post("http://localhost:3010/zoom/create_meeting", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    throw error;
  }
};
