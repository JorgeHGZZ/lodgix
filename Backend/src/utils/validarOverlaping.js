export const parseDateRangeStrings = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Fechas inválidas");
    }

    if (endDate <= startDate) {
        throw new Error("La fecha de fin debe ser posterior a la fecha de inicio");
    }

    return {
        startDate,
        endDate
    };
};

export const buildOverlapQuery = (startField, endField, startDate, endDate) => ({
    $or: [
        { [startField]: { $lte: endDate, $gte: startDate } },
        { [endField]: { $lte: endDate, $gte: startDate } },
        { [startField]: { $lte: startDate }, [endField]: { $gte: endDate } }
    ]
});