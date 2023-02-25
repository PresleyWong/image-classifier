import WebCam from "react-webcam";

const Video = ({ webcamRef }) => {
  const videoConstraints = {
    width: 640,
    height: 480,
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
