import React from "react";
import {useParams, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {BookDataType} from "../../DAL/api";
import styles from "./CurrentBook.module.css";
import bookImg from "../../assets/imges/book.jpg";

export const CurrentBook = () => {
    const {bookId} = useParams<{bookId: string}>()
    const arrBooks = useSelector<AppRootStateType, Array<BookDataType>>(
         (state) => state.app.items)

    const currentBook = arrBooks.find(book => book.id === bookId)

    const img = currentBook && currentBook.volumeInfo.imageLinks
        ? currentBook.volumeInfo.imageLinks.thumbnail
        : bookImg

    if (currentBook) {
        return (
            <div className={styles.container}>
                <img src={img} alt=""/>
                <div className={styles.commonInformation}>
                    <div>
                        <b>Title: </b>{currentBook.volumeInfo.title?currentBook.volumeInfo.title:''}
                    </div>
                    <div>
                        <b>All categories: </b>{currentBook.volumeInfo.categories?currentBook.volumeInfo.categories:''}
                    </div>
                    <div>
                        <b>Authors: </b>{currentBook.volumeInfo.authors?currentBook.volumeInfo.authors:''}
                    </div>
                    <div>
                        <b>Descriptions: </b>{currentBook.volumeInfo.description?currentBook.volumeInfo.description:''}
                    </div>
                </div>
            </div>

        )
    }

    return <Redirect to={'*'}/>
}
