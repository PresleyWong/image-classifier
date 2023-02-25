import Tour from "reactour";
import { useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

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
      <div className="flex justify-center items-center gap-x-5">
        <button
          onClick={() => openTour(true)}
          type="button"
          className="primary-btn"
        >
          Tour
        </button>

        <button
          onClick={handleTrain}
          type="button"
          className={predictionMode === true ? "danger-btn" : "primary-btn"}
          id="trainBtn"
        >
          {predictionMode === true ? "Predict!" : "Train!"}
        </button>

        <button
          onClick={handleAddClass}
          type="button"
          className={
            classNames.length < 5 ? "primary-btn" : "primary-btn-disabled"
          }
          disabled={classNames.length >= 5}
          id="addBtn"
        >
          Add Class
        </button>

        <button
          onClick={handleRemoveClass}
          type="button"
          className={
            classNames.length > 2 ? "primary-btn" : "primary-btn-disabled"
          }
          disabled={classNames.length <= 2}
          id="removeBtn"
        >
          Remove Class
        </button>

        <button
          onClick={handleClear}
          type="button"
          className="primary-btn"
          id="clearBtn"
        >
          Clear Log
        </button>

        <button
          onClick={handleReset}
          type="button"
          className="primary-btn"
          id="resetBtn"
        >
          Reset
        </button>
      </div>

      <div
        className="flex justify-center gap-x-2 rounded-md shadow-sm mt-3"
        role="group"
      >
        {classNames.map((item, index) => (
          <button
            id={`gather${index}Btn`}
            key={index}
            type="button"
            className={
              predictionMode === true ? "primary-btn-disabled" : "primary-btn"
            }
            disabled={predictionMode}
            onClick={() => handleCollect(index)}
          >
            {`Gather ${classNames[index]} Data`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
