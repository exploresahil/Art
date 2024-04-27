export const slideUp = {
  initial: {
    top: "100px",
    opacity: 0,
  },
  enter: {
    top: 0,
    opacity: 1,

    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 },
  },
};

export const slideUpTwo = {
  initial: {
    top: "100px",
    opacity: 0,
  },
  enter: {
    top: 0,
    opacity: 1,

    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 },
  },
};

export const slideUpFlower = {
  initial: {
    top: "100%",
    opacity: 0,
    scale: 0,
  },
  enter: {
    top: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideUpLeft = {
  initial: {
    top: "100%",
    opacity: 0,
    scale: 0,
  },
  enter: {
    top: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
  },
};

export const slideUpRight = {
  initial: {
    top: "100%",
    opacity: 0,
    scale: 0,
  },
  enter: {
    top: "0%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};
