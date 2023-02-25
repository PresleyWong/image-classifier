import * as tf from "@tensorflow/tfjs";
import {
  addLogMessage,
  setPredictionMode,
  resetClassName,
} from "./redux/features/machine/machineSlice";

export let PRETRAINED_MODEL = undefined;
export let CUSTOM_MODEL = undefined;

const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;

let gatherDataState = STOP_DATA_GATHER;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];

export const gatherDataForClass = (
  classNumber,
  videoStream,
  classNames,
  dispatch
) => {
  gatherDataState =
    gatherDataState === STOP_DATA_GATHER ? classNumber : STOP_DATA_GATHER;
  dataGatherLoop(videoStream, classNumber, classNames, dispatch);
};

export const dataGatherLoop = (
  videoStream,
  classNumber,
  classNames,
  dispatch
) => {
  if (videoStream?.width && gatherDataState !== STOP_DATA_GATHER) {
    let imageFeatures = tf.tidy(function () {
      let videoFrameAsTensor = tf.browser.fromPixels(videoStream);
      let resizedTensorFrame = tf.image.resizeBilinear(
        videoFrameAsTensor,
        [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
        true
      );
      let normalizedTensorFrame = resizedTensorFrame.div(255);
      return PRETRAINED_MODEL.predict(
        normalizedTensorFrame.expandDims()
      ).squeeze();
    });

    trainingDataInputs.push(imageFeatures);
    trainingDataOutputs.push(gatherDataState);

    if (examplesCount[gatherDataState] === undefined) {
      examplesCount[gatherDataState] = 0;
    }
    examplesCount[gatherDataState]++;

    let msg =
      classNames[classNumber] + " data count: " + examplesCount[classNumber];
    dispatch(addLogMessage({ message: msg }));

    window.requestAnimationFrame(dataGatherLoop);
  }
};

const datasetReady = (classNames, dispatch) => {
  const minCount = 10;
  let output = true;

  for (let i = 0; i < classNames.length; i++) {
    if (examplesCount[i] < minCount || examplesCount[i] == undefined) {
      output = false;
      dispatch(
        addLogMessage({
          message: `Not enough data for Class ${i + 1}`,
        })
      );
    }
  }

  return output;
};

export const trainAndPredict = async (
  videoStream,
  predictionMode,
  classNames,
  dispatch
) => {
  if (!datasetReady(classNames, dispatch)) {
    dispatch(
      addLogMessage({
        message: "Please gather at least 10 samples in each class",
      })
    );
  } else if (!predictionMode) {
    buildCustomModel(classNames, dispatch);
    dispatch(addLogMessage({ message: "Start training..." }));
    tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
    let outputsAsTensor = tf.tensor1d(trainingDataOutputs, "int32");
    let oneHotOutputs = tf.oneHot(outputsAsTensor, classNames.length);
    let inputsAsTensor = tf.stack(trainingDataInputs);

    let results = await CUSTOM_MODEL.fit(inputsAsTensor, oneHotOutputs, {
      shuffle: true,
      batchSize: 5,
      epochs: 10,
      callbacks: { onEpochEnd: logProgress },
    });

    const accuracy = results.history.acc[results.history.acc.length - 1];
    const loss = results.history.loss[results.history.loss.length - 1];

    outputsAsTensor.dispose();
    oneHotOutputs.dispose();
    inputsAsTensor.dispose();

    dispatch(setPredictionMode({ isPrediction: true }));
    dispatch(
      addLogMessage({
        message: `Training Results:- Accuracy: ${accuracy} Loss: ${loss}`,
      })
    );
  }

  predictLoop(videoStream, predictionMode, classNames, dispatch);
};

export const predictLoop = (
  videoStream,
  predictionMode,
  classNames,
  dispatch
) => {
  if (predictionMode && videoStream?.width) {
    tf.tidy(function () {
      let videoFrameAsTensor = tf.browser.fromPixels(videoStream).div(255);
      let resizedTensorFrame = tf.image.resizeBilinear(
        videoFrameAsTensor,
        [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
        true
      );

      let imageFeatures = PRETRAINED_MODEL.predict(
        resizedTensorFrame.expandDims()
      );
      let prediction = CUSTOM_MODEL.predict(imageFeatures).squeeze();
      let highestIndex = prediction.argMax().arraySync();
      let predictionArray = prediction.arraySync();

      let result =
        "Prediction: " +
        classNames[highestIndex] +
        " with " +
        Math.floor(predictionArray[highestIndex] * 100) +
        "% confidence";

      // console.log(result);
      dispatch(addLogMessage({ message: result }));
    });

    window.requestAnimationFrame(predictLoop);
  }
};

export const logProgress = (epoch, logs) => {
  console.log("Data for epoch " + epoch, logs);
};

export const resetTrainData = (dispatch) => {
  for (let i = 0; i < trainingDataInputs.length; i++) {
    trainingDataInputs[i].dispose();
  }

  examplesCount = [];
  trainingDataInputs = [];
  trainingDataOutputs = [];
  CUSTOM_MODEL = undefined;

  dispatch(addLogMessage({ message: "Training data and model reseted" }));
  dispatch(setPredictionMode({ isPrediction: false }));
  dispatch(resetClassName());
};

export const loadPretrainedModel = async (dispatch) => {
  dispatch(addLogMessage({ message: "Loading pretrained model..." }));

  if (PRETRAINED_MODEL === undefined) {
    const URL =
      "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";

    PRETRAINED_MODEL = await tf.loadGraphModel(URL, { fromTFHub: true });
    dispatch(
      addLogMessage({ message: "Pretrained model loaded successfully!" })
    );

    tf.tidy(function () {
      let answer = PRETRAINED_MODEL.predict(
        tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3])
      );
      // console.log(answer.shape);
    });
  }
};

export const buildCustomModel = (classNames, dispatch) => {
  dispatch(addLogMessage({ message: "Building classifying model..." }));
  let model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
  );
  model.add(
    tf.layers.dense({ units: classNames.length, activation: "softmax" })
  );

  model.summary();
  model.compile({
    optimizer: "adam",
    loss:
      classNames.length === 2
        ? "binaryCrossentropy"
        : "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  CUSTOM_MODEL = model;
};
