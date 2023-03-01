import WebCam from "react-webcam";

const Video = ({ webcamRef }) => {
  let vidWidth;
  let vidHeight;

  const currentDeviceWidth = window.innerWidth;
  if (currentDeviceWidth >= 640) {
    vidWidth = 640;
    vidHeight = 480;
  } else {
    vidWidth = currentDeviceWidth;
    vidHeight = (currentDeviceWidth / 4) * 3;
  }

  const videoConstraints = {
    width: vidWidth,
    height: vidHeight,
    facingMode: "user",
  };

  return (
    <WebCam
      audio={false}
      height={videoConstraints.height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
    />
  );
};

export default Video;
