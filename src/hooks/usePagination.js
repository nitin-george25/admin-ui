export const usePagination = ({ totalCount, pageSize, siblingCount = 2 }) => {
    const pageNos = useMemo(() => {
        const noOfPages = totalCount / pageSize;

        return Array.from({ length: noOfPages });
    }, [totalCount, pageSize, siblingCount, currentPage]);
};