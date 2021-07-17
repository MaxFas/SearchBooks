import React, {ChangeEvent, KeyboardEvent} from "react";
import {searchBookTC, sortingByCategoriesBooksTC, sortingByOrderBooksTC} from "../../reducers/appReducer";
import {useDispatch, useSelector} from "react-redux";
import styles from "./SearchingPanel.module.css";
import backgroundImg from "../../assets/imges/background.jpg";
import { useHistory } from "react-router-dom";
import {AppRootStateType} from "../../store/store";

export type SearchingPanelType = {
    nameBook: string
    setNameBook: (title: string) => void
    setSelect: (select: string) => void
}

export const SearchingPanel: React.FC<SearchingPanelType> = (props) => {

    const background= {
        backgroundImage: `url(${backgroundImg})`,};
    const {nameBook, setNameBook,setSelect} = props

    const history = useHistory();
    const dispatch = useDispatch()
    const sortError = useSelector<AppRootStateType, boolean>(
      (state) => state.app.error)

    const getBooks = () => {
        dispatch(searchBookTC(nameBook))
        history.push('/books')
    }

    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            getBooks()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameBook(e.currentTarget.value)
    }



    const selectorByOrderHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const select = e.currentTarget.value
        dispatch(sortingByOrderBooksTC(nameBook, select))
    }
    const selectorByCategoriesHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setNameBook('')
        const select = e.currentTarget.value
        setSelect(select)
        dispatch(sortingByCategoriesBooksTC(select))
    }



    return (
        <div className={styles.container} style={background}>
            <h1>Search for books</h1>
            <div className={styles.inputButton}>
                <input
                  onChange={onChangeHandler}
                  value={nameBook}
                  onKeyPress={onEnter}
                  type="text"
                />
                <button onClick={getBooks}>SEARCH</button>
            </div>
            <div>
                <b>Categories</b>
                <select onChange={selectorByCategoriesHandler} className={styles.selectors}>
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
            </select>
                <b>Sorting by</b>
                <select onChange={selectorByOrderHandler} className={styles.selectors}>
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
            </select>
                {sortError&&<div><b style={{color:"red"}}>PLEASE ENTER THE TITLE OF THE BOOK</b></div>}
            </div>
        </div>
    )
}