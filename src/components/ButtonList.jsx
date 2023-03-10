import Tour from "reactour";
import { useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { PRETRAINED_MODEL } from "../utility";
import Button from "./Button";

const ButtonList = ({
  handleCamera,
  handleCollect,
  handleTrain,
  handleReset,
  handleClear,
  handleAddClass,
  handleRemoveClass,
  openTour,
  isTourOpen,
  stepsTour,
}) => {
  const { predictionMode, classNames } = useSelector((state) => state.machine);

  return (
    <div>
      <Tour
        steps={stepsTour}
        isOpen={isTourOpen}
        onRequestClose={() => openTour(false)}
      />
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Button text="Tour" handler={() => openTour(true)} />

        <Button
          text={predictionMode === true ? "Predict!" : "Train!"}
          handler={handleTrain}
          isDanger={predictionMode}
          id="trainBtn"
        />

        <Button
          text="Add Class"
          handler={handleAddClass}
          disabled={classNames.length >= 5 || predictionMode}
          id="addBtn"
        />

        <Button
          text="Remove Class"
          handler={handleRemoveClass}
          disabled={classNames.length <= 2}
          id="removeBtn"
        />

        <Button text="Clear Log" handler={handleClear} id="clearBtn" />

        <Button text="Reset" handler={handleReset} id="resetBtn" />
      </div>

      <div
        className="flex flex-wrap justify-center gap-2 rounded-md shadow-sm mt-3"
        role="group"
      >
        {classNames.map((item, index) => (
          <Button
            text={`Gather ${classNames[index]} Data`}
            handler={() => handleCollect(index)}
            disabled={predictionMode || PRETRAINED_MODEL === undefined}
            id={`gather${index}Btn`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
