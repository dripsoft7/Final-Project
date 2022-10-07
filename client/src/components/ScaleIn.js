import { useSpring, animated } from "react-spring";

//animation for favorites button
export const ScaleIn = ({ children }) => {
  const style = useSpring({
    transform: "scale(1)",
    from: {
      transform: "scale(1.2)",
    },
    config: {
      tension: 180,
      friction: 10,
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};
