import clamp from './clamp.js';
import ArrayCoords from './ArrayCoords.js';

function getFrictionVelocity(vel, frictionAmountParam = 0.01, movement = false) {
	// Calculate the friction force vector. The friction force is proportional
	// to the velocity vector and acts in the opposite direction.
	const frictionAmount = clamp(frictionAmountParam, 0, 1);
	const frictionVel = ArrayCoords.scale(vel, -1 * frictionAmount);
	// If we're not moving then just apply all the friction
	if (!movement || !ArrayCoords.magnitude(movement)) {
		return frictionVel;
	}
	// Normalize the vectors to get a unit vector in the direction of movement and friction.
	const moveNormal = ArrayCoords.normalize(movement);
	const frictionNormal = ArrayCoords.normalize(frictionVel);
	let frictionMag = ArrayCoords.magnitude(frictionVel);
	// Calculate the dot product of the friction and the movement vectors. The dot product
	// of two vectors gives you the projection of one vector onto the other. In this case,
	// we want to find the component of the friction vector that is in the direction of
	// the movement.
	const fDotM = ArrayCoords.dotProduct(frictionNormal, moveNormal);
	const frictionPercent = (fDotM + 1) / 2;
	frictionMag *= frictionPercent;
	const finalFriction = ArrayCoords.scale(frictionNormal, frictionMag);
	return finalFriction;
}

function applyFrictionToVelocity(vel, frictionAmount = 0.01, movement = false) {
	const frictionVel = getFrictionVelocity(vel, frictionAmount, movement);
	return ArrayCoords.add(vel, frictionVel);
}

function getAccelerationDueToForce(netForceCoords, mass = 0) {
	if (!mass) return [0, 0, 0];
	return ArrayCoords.scale(netForceCoords, (1 / mass));
}

export {
	applyFrictionToVelocity,
	getAccelerationDueToForce,
	getFrictionVelocity,
};
