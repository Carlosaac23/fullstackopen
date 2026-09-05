import { isNotNumber } from "./utils.ts";

interface Values {
  height: number;
  weight: number;
}

function parseArguments(args: string[]): Values {
  if (args.length < 4) throw new Error("Not enough arguments. Insert your height and your weight");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

export function calculateBmi(height: number, weight: number): string | undefined {
  if (height === 0) return 'Can"t divide by 0!';

  // Convert height in cm to m
  const heightInMts = height / 100;
  const BMI = Number((weight / (heightInMts * heightInMts)).toFixed(2));

  if (BMI < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (BMI > 16.0 && BMI < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (BMI > 17.0 && BMI < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (BMI > 18.5 && BMI < 25.0) {
    return "Normal range";
  } else if (BMI > 25.0 && BMI < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (BMI > 30.0 && BMI < 35.0) {
    return "Obese (Class I)";
  } else if (BMI > 35.0 && BMI < 40.0) {
    return "Obese (Class II)";
  } else if (BMI >= 40.0) {
    return "Obese (Class III)";
  } else {
    return undefined;
  }
}

try {
  if (process.argv[1] === import.meta.filename) {
    const { height, weight } = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
