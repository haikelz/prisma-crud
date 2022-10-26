import { m, domAnimation, LazyMotion } from "framer-motion";
import { Children } from "src/types";

const LazyMotionLayout = ({ children, className, config }: Children) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section {...config} className={className}>
        {children}
      </m.section>
    </LazyMotion>
  );
};

export default LazyMotionLayout;
