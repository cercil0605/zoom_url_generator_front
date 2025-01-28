import React from "react";
import OAuthScreen from "./components/OAuthScreen";
import ZoomMeetingGenerator from "./components/ZoomMeetingGenerator";

const App = () => {
  // Conditionally render based on the route (handled by backend redirection)
  const path = window.location.pathname;

  return path === "/" ? <OAuthScreen /> : <ZoomMeetingGenerator />;
};

export default App;
