import { isNotNumber } from "./utils.ts";

interface Values {
  exercises: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function parseArguments(args: string[]): Values {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  if (!isNotNumber(args[args.length - 1])) {
    const exercises = args.slice(2, args.length - 1).map(Number);
    const target = Number(args[args.length - 1]);

    return {
      exercises,
      target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

function calculateExercises(exercises: number[], target: number): Result {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((exercise) => exercise !== 0).length;
  const average = exercises.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const rating = average >= target ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Great job! You met your target."
      : rating === 2
        ? "Not too bad but could be better."
        : "You need to work harder to meet your target.";

  return {
    periodLength,
    trainingDays,
    success: trainingDays > target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { exercises, target } = parseArguments(process.argv);

  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
