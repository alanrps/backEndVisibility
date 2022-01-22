import { snakeCase } from "snake-case";

export function convertToSnakeCase(params){
    const entriesParams = Object.entries(params);

    const snakeCaseParams = entriesParams.reduce(acc, ([key, value]) => {
        acc[snakeCase(key)] = value;

        return acc;
    }, {});

    return snakeCaseParams;
}

export default {};