import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearLogMessage,
  addClassName,
  removeClassName,
} from "../redux/features/machine/machineSlice";
import {
  gatherDataForClass,
  trainAndPredict,
  resetTrainData,
} from "../utility";
import Video from "../components/Video";
import ButtonList from "../components/ButtonList";
import Log from "../components/Log";

const Homepage = () => {
  // const [webcamEnabled, setWebcamEnabled] = useState(false);
  // const [webcamBtn, setWebcamBtn] = useState("Disable Webcam");
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const [isTourOpen, setIsTourOpen] = useState(true);

  const stepsTour = [
    {
      selector: "#logWin",
      content: "Step 1 Wait for the pretrained model to be loaded.",
    },
    {
      selector: "#gather0Btn",
      content:
        "Step 2 Gather 10 or more images for Class 1 by clicking the button.",
    },
    {
      selector: "#gather1Btn",
      content: "Step 3 Continue to gather 10 or more images for Class 2.",
    },
    {
      selector: "#trainBtn",
      content: "Step 4 Train the classification AI model.",
    },
    {
      selector: "#trainBtn",
      content: "Step 5 Predict the result.",
    },
  ];

  const { logMessage, predictionMode, classNames } = useSelector(
    (state) => state.machine
  );

  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const collectData = (classNumber) => {
    gatherDataForClass(
      classNumber,
      webcamRef?.current?.video,
      classNames,
      dispatch
    );
  };

  const addClass = () => {
    if (classNames.length < 5) {
      dispatch(addClassName({ name: `Class ${classNames.length + 1}` }));
    }
  };

  const removeClass = () => {
    if (classNames.length > 2) {
      dispatch(removeClassName({ name: `Class ${classNames.length}` }));
    }
  };

  const resetData = () => {
    resetTrainData(dispatch);
  };

  const clearLog = () => {
    dispatch(clearLogMessage());
  };

  const trainData = () => {
    trainAndPredict(
      webcamRef?.current?.video,
      predictionMode,
      classNames,
      dispatch
    );
  };

  const toggleCamera = () => {
    setWebcamEnabled(!webcamEnabled);
  };

  const MainDisplay = () => {
    let content;
    if (webcamEnabled && hasGetUserMedia) {
      content = <Video webcamRef={webcamRef} />;
    } else {
      content = <div className="bg-black h-[480px] w-[640px]"></div>;
    }

    return content;
  };

  return (
    <div className="">
      <div className="flex justify-center mb-5">
        <Video webcamRef={webcamRef} />
        <Log logMessage={logMessage} />
      </div>

      <ButtonList
        handleCamera={toggleCamera}
        handleCollect={collectData}
        handleTrain={trainData}
        handleReset={resetData}
        handleClear={clearLog}
        handleAddClass={addClass}
        handleRemoveClass={removeClass}
        openTour={setIsTourOpen}
        isTourOpen={isTourOpen}
        stepsTour={stepsTour}
      />
    </div>
  );
};

export default Homepage;
