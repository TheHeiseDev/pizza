import { FC, memo, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { sortList } from "../constants";

import { handleTypeSort } from "../store/slices/filterSlice/filterSlice";
import { Sort } from "../store/slices/filterSlice/typesFilter";

import SvgTriangle from "./IconComponents/SvgTriangle";

interface ISortPopupProps {
  sort: Sort;
}

const SortPopup: FC<ISortPopupProps> = memo(({ sort }) => {
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const onClickSortListItem = (obj: Sort) => {
    dispatch(handleTypeSort(obj));
    setOpen(false);
  };

  const handleSort = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      const path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (!path) {
        setOpen(false);
      }
    };

    const handleKeyEvent = (event: KeyboardEvent) => {
      let path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (event.key === "Escape") {
        if (!path) {
          setOpen(false);
        }
      }
    };
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);

      document.body.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SvgTriangle />
        <b>Сортировка по:</b>
        <span onClick={handleSort}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.sortProperty}
                onClick={() => onClickSortListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
