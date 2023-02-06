import React, { FC } from "react";
import styles from "./Paginator.module.css";
import { useState } from "react";
import cn from "classnames";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Stack from "@mui/material/Stack";

type PropsType = {
    totalItemsCount: number;
    pageSize: number;
    currentPage?: number;
    onPageChanged?: (pageNumber: number) => void;
    portionSize?: number;
};

const Paginator: FC<PropsType> = ({
    currentPage = 1,
    onPageChanged,
    totalItemsCount,
    pageSize,
    portionSize = 10,
}) => {
    const [portionNumber, setPortionNumber] = useState<number>(1);

    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const previousPortion = () => {
        setPortionNumber(portionNumber - 1);
    };

    const nextPortion = () => {
        setPortionNumber(portionNumber + 1);
    };

    return (
        <div className={styles.paginator}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                margin={2}
            >
                {portionNumber > 1 && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={previousPortion}
                        startIcon={<NavigateBeforeIcon />}
                    >
                        PREVIOUS
                    </Button>
                )}
                {pages
                    .filter(
                        (p) =>
                            p >= leftPortionPageNumber &&
                            p <= rightPortionPageNumber
                    )
                    .map((page, index) => (
                        <div key={index}>
                            <span
                                className={cn(
                                    {
                                        [styles.selectedPage]:
                                            currentPage === page,
                                    },
                                    styles.pageNumber
                                )}
                                key={page}
                                // className={currentPage === page ? style.selectedPage : ""}
                                onClick={() => {
                                    onPageChanged && onPageChanged(page);
                                }}
                            >
                                {page}
                            </span>
                        </div>
                    ))}
                {portionCount > portionNumber && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={nextPortion}
                        endIcon={<NavigateNextIcon />}
                    >
                        NEXT
                    </Button>
                )}
            </Stack>
        </div>
    );
};

export default Paginator;
