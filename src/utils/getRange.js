export const getRange = (start, end) => {
    return Array.from({ length: end }, (_, index) => {
        if (index + 1 >= start) {
            return index + 1;
        }

        return;
    });
};