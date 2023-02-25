const Button = (props) => {
  return (
    <button type="button" className={"primary-btn"} {...props}>
      {props.text}
    </button>
  );
};

export default Button;
