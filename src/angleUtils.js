// Radian math

const { PI } = Math;
const TAU = PI * 2;
const TWO_PI = TAU;
const HALF_PI = PI / 2;
const DEGREES_PER_RADIAN = (180 / PI);
const CARDINAL_FACING_RADIANS = Object.freeze([0, PI * 0.5, PI, PI * 1.5]);

function averageTwoAngles(angle1Param, angle2Param) {
	let angle1 = angle1Param;
	let angle2 = angle2Param;
	const diff = Math.abs(angle1 - angle2);
	if (diff > PI) {
		if (angle1 < angle2) {
			angle1 += 2 * PI;
		} else {
			angle2 += 2 * PI;
		}
	}
	return (angle1 + angle2) / 2;
}

function averageAngles(...args) {
	let angles = [];
	if (args.length === 1) angles = args[0]; // eslint-disable-line prefer-destructuring
	else if (args.length === 2) averageTwoAngles(args[0], args[1]);
	else if (args.length > 2) angles = args;
	else return 0;
	if (angles.length < 1) return 0;
	let x = 0;
	let y = 0;
	for (let i = 0; i < angles.length; i += 1) {
		x += Math.cos(angles[i]);
		y += Math.sin(angles[i]);
	}
	const avgAngle = Math.atan2(y / angles.length, x / angles.length);
	// TODO: Is % TWO_PI necessary?
	return (avgAngle >= 0) ? avgAngle : avgAngle + 2 * PI;
}

export {
	averageAngles,
	averageTwoAngles,
	// constants
	CARDINAL_FACING_RADIANS,
	PI,
	TAU,
	TWO_PI,
	HALF_PI,
	DEGREES_PER_RADIAN,
};
