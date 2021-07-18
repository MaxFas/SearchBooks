import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import styles from "./ResultData.module.css";
import {BookDataType} from "../../DAL/api";
import bookImg from "../../assets/imges/book.jpg";
import {NavLink} from "react-router-dom";
import {
  addBooksByCategoriesTC,
  addBooksTC,
  sortingByCategoriesBooksTC
} from "../../reducers/appReducer";
import {Preloader} from "../../assets/common/Preloader/Preloader";

export type ResultDataType = {
  nameBook: string
  select: string
}

export const ResultData: React.FC<ResultDataType> = (props) => {
  const {nameBook, select} = props

  const arrBooks = useSelector<AppRootStateType, Array<BookDataType>>(
    (state) => state.app.items)
  const totalCount = useSelector<AppRootStateType, number>(
    (state) => state.app.totalItems)
  const isLoading = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isLoading)

  const dispatch = useDispatch()

  const onClickHandler = () => {
    if (nameBook === '') {
      dispatch(addBooksByCategoriesTC(select))
    } else {
      dispatch(addBooksTC(nameBook))
    }
  }

  const books = arrBooks.map(b => {
    return <div className={styles.book} key={b.id}>
      <NavLink to={`/books/${b.id}`}>
        <img
          src={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.smallThumbnail : bookImg}
          alt="img"/>
      </NavLink>

      <div className={styles.text}>
        <div>{b.volumeInfo.title?
          <div><b>Title: </b>{b.volumeInfo.title}</div> : ''}
        </div>
        <div>{b.volumeInfo.authors?
          <div><b>Authors: </b>{b.volumeInfo.authors}</div> : ''}
        </div>
        <div>
          {b.volumeInfo.categories?
            <div><b>Categories: </b>{b.volumeInfo.categories[0]}</div> : ''}
        </div>
      </div>
    </div>
  })

  useEffect(() => {
    dispatch(sortingByCategoriesBooksTC('all'))
  }, [dispatch])

  if(isLoading) {
    return <Preloader/>
  }

  return (
    <div className={styles.main}>
      {totalCount === 0 ? '' : `Found ${totalCount} results`}
      <div className={styles.container}>{books}</div>

      {
        totalCount === 0
        ? ''
        : (
          <button
            className={styles.buttonMore}
            onClick={onClickHandler}
          >
            load more
          </button>
        )
      }
    </div>
  )
}
