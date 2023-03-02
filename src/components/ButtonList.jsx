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
        {/* <button
          onClick={() => openTour(true)}
          type="button"
          className="primary-btn"
        >
          Tour
        </button> */}

        <Button
          text={predictionMode === true ? "Predict!" : "Train!"}
          handler={handleTrain}
          isDanger={predictionMode}
          id="trainBtn"
        />
        {/* <button
          onClick={handleTrain}
          type="button"
          className={predictionMode === true ? "danger-btn" : "primary-btn"}
          id="trainBtn"
        >
          {predictionMode === true ? "Predict!" : "Train!"}
        </button> */}

        <Button
          text="Add Class"
          handler={handleAddClass}
          disabled={classNames.length >= 5 || predictionMode}
          id="addBtn"
        />
        {/* <button
          onClick={handleAddClass}
          type="button"
          className={
            classNames.length >= 5 || predictionMode
              ? "primary-btn-disabled"
              : "primary-btn"
          }
          disabled={classNames.length >= 5 || predictionMode}
          id="addBtn"
        >
          Add Class
        </button> */}

        <Button
          text="Remove Class"
          handler={handleRemoveClass}
          disabled={classNames.length <= 2}
          id="removeBtn"
        />
        {/* <button
          onClick={handleRemoveClass}
          type="button"
          className={
            classNames.length > 2 ? "primary-btn" : "primary-btn-disabled"
          }
          disabled={classNames.length <= 2}
          id="removeBtn"
        >
          Remove Class
        </button> */}

        <Button text="Clear Log" handler={handleClear} id="clearBtn" />
        {/* <button
          onClick={handleClear}
          type="button"
          className="primary-btn"
          id="clearBtn"
        >
          Clear Log
        </button> */}

        <Button text="Reset" handler={handleReset} id="resetBtn" />
        {/* <button
          onClick={handleReset}
          type="button"
          className="primary-btn"
          id="resetBtn"
        >
          Reset
        </button> */}
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

          // <button
          //   id={`gather${index}Btn`}
          //   key={index}
          //   type="button"
          //   className={
          //     predictionMode === true || PRETRAINED_MODEL === undefined
          //       ? "primary-btn-disabled"
          //       : "primary-btn"
          //   }
          //   disabled={predictionMode}
          //   onClick={() => handleCollect(index)}
          // >
          //   {`Gather ${classNames[index]} Data`}
          // </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
