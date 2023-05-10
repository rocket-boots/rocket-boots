// eslint-disable-next-line no-nested-ternary
const clamp = (v, min = 0, max = 1) => (v < min ? min : v > max ? max : v);
export default clamp;
