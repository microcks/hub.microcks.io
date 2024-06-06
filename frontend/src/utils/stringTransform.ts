export const stringToUppercaseWithSpace = (str: string): string => {
	return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export const stringToLowerCaseWithoutSpace = (str: string): string => {
	return str.replace(/\s/g, '_').toLowerCase();
};

export const stringToPascalCase = (formData: Record<string, string>): Record<string, string> => {
	return Object.fromEntries(
		Object.entries(formData).map(([key, value]) => [
			key
				.split(/\s+/)
				.map((word, index) =>
					index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
				)
				.join(''),
			value
		])
	);
};

export const getFirstLetterUsername = (str: string): string => {
	return str[0].toUpperCase();
};
