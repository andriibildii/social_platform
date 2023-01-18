type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) => (value ? undefined : "Field is Required!");

// export const maxValue = (max) => (value) => isNaN(value) || value >= max ? undefined : `Should be lower than ${max}`;

export const maxValue = (maxLength: number): ValidatorType => (value) => {
	if (value?.length > maxLength) return `Max length is ${maxLength} symbols`;
	return undefined;
}