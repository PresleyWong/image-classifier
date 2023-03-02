import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";

const Button = ({
  handler,
  text,
  id = null,
  disabled = false,
  isDanger = false,
}) => {
  const springs = useSpring({
    from: { y: 100 },
    to: { y: 0 },
  });

  const [pressed, setPressed] = useState(false);
  const { scale } = useSpring({ scale: pressed ? 0.8 : 1 });

  return (
    <animated.div style={springs}>
      <animated.button
        style={{
          transform: scale.to((s) => `scale(${s})`),
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        children={text}
        onClick={handler}
        className={
          disabled
            ? "primary-btn-disabled"
            : isDanger
            ? "danger-btn"
            : "primary-btn"
        }
        disabled={disabled}
        id={id}
      />
    </animated.div>
  );
};

export default Button;
