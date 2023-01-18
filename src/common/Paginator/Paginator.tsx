import React, {FC} from 'react';
import styles from "./Paginator.module.css";
import { useState } from "react";
import cn from 'classnames';

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void,
    portionSize?: number,
}

const Paginator: FC<PropsType> = ({ currentPage = 1, onPageChanged = () => {}, totalItemsCount, pageSize, portionSize = 10,}) => {

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
          {portionNumber > 1 && (
            <button onClick={previousPortion}>PREVIOUS</button>
          )}
          {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((page) => (
              <span
                className={cn({
                    [styles.selectedPage]: currentPage === page
                }, styles.pageNumber )}
                key={page}
                // className={currentPage === page ? style.selectedPage : ""}
                onClick={() => {
                    onPageChanged(page);
                }}
              >
                    {page}
                </span>
            ))}
          {portionCount > portionNumber && (
            <button onClick={nextPortion}>NEXT</button>
          )}
      </div>
    );
};

export default Paginator;
