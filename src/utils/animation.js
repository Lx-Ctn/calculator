export const headerVariants = {
	initial: { opacity: 0.5, y: "-30vh", scale: 0.5, transformOrigin: "top" },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", when: "beforeChildren" },
	},
	exit: {},
};

export const mainVariants = {
	initial: {},
	animate: { transition: { delayChildren: 0.25, staggerChildren: 0.16 } },
	exit: {},
};

export const screenVariants = {
	initial: { opacity: 0 },
	animate: { opacity: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1] },
	exit: {},
};

export const sectionVariants = {
	initial: { opacity: 0, y: -100, scale: 0, transformOrigin: "top" },
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", delayChildren: 0.5 },
	},
	exit: {},
};

export const digitButtonsVariants = {
	initial: {},
	animate: { transition: { staggerChildren: 0.01 } },
	exit: {},
};
export const operationButtonsVariants = {
	initial: {},
	animate: { transition: { staggerChildren: 0.03 } },
	exit: {},
};
export const secondaryButtonsVariants = {
	initial: {},
	animate: {},
	exit: {},
};

export const buttonVariants = {
	initial: { opacity: 0, scale: 0.5 },
	animate: {
		opacity: 1,
		scale: 1,
		transition: { type: "spring" },
	},
	exit: { opacity: 0, scale: 0.5 },
};
