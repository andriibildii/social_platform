import style from "./Paginator.module.css"

const Paginator = ({
    currentPage,
    onPageChanged,
    totalUsersCount,
    pageSize,
}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((page, index) => (
                <span
                    key={index}
                    className={currentPage === page ? style.selectedPage : ""}
                    onClick={() => {
                        onPageChanged(page);
                    }}
                >
                    {page}
                </span>
            ))}
        </div>
    );
};

export default Paginator;
