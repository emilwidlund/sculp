export const modulate = (value: number, rangeA: number[], rangeB: number[]) => {
    const [fromLow, fromHigh] = rangeA;
    const [toLow, toHigh] = rangeB;

    return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
};
