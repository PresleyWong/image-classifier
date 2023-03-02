const Button = ({
  handler,
  text,
  id = null,
  disabled = false,
  isDanger = false,
}) => {
  return (
    <button
      onClick={handler}
      type="button"
      className={
        disabled
          ? "primary-btn-disabled"
          : isDanger
          ? "danger-btn"
          : "primary-btn"
      }
      disabled={disabled}
      id={id}
    >
      {text}
    </button>
  );
};

export default Button;
