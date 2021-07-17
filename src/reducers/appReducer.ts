import {appAPI, BookDataType, BooksType} from "../DAL/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

const initialState = {
  items: [],
  kind: '',
  totalItems: 0,
  searchTitle: '',
  error: false,
  searchIsFailed: false,
  isLoading: false
} as BooksType & {
  searchTitle: string, error: boolean,
  isLoading: boolean, searchIsFailed: boolean
}


export const appReducer = (state = initialState, action: ActionType) => {

  const uniqueArr = (copyState: BooksType & { searchTitle: string, error: boolean }) => {
    const resArr: Array<BookDataType> = [];
    copyState.items.filter(item => {
      const i = resArr.findIndex(x => (x.id === item.id));
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    })
    return resArr
  }

  switch (action.type) {
    case "App-reducer/addBooks": {
      const copyState = {...state}
      copyState.items = [...copyState.items, ...action.booksData]
      copyState.items = uniqueArr(copyState)
      copyState.totalItems = action.totalItems
      console.log(copyState)
      return copyState
    }
    case "App-reducer/addBooksByCategories": {
      const copyState = {...state}
      copyState.items = [...copyState.items, ...action.booksData]
      copyState.items = uniqueArr(copyState)
      copyState.totalItems = action.totalItems
      return copyState
    }
    case "App-reducer/searchBooks": {
      const copyState = {...state}
      copyState.items = [...action.booksData]
      copyState.items = uniqueArr(copyState)
      copyState.totalItems = action.totalItems
      copyState.searchTitle = action.searchTitle
      return copyState
    }
    case "App-reducer/sortingByOrderBooks": {
      const copyState = {...state}
      copyState.items = [...action.booksData]
      copyState.totalItems = action.totalItems
      copyState.items = uniqueArr(copyState)
      return copyState
    }
    case "App-reducer/sortingByCategoriesBooks": {
      const copyState = {...state}
      copyState.items = [...action.booksData]
      copyState.totalItems = action.totalItems
      copyState.items = uniqueArr(copyState)
      return copyState
    }
    case "App-reducer/sortError": {
      return {...state, error: action.error}
    }
    case "App-reducer/searchIsFailed": {
      return {...state, searchIsFailed: action.inputError}
    }
    case "App-reducer/isLoading": {
      return {...state, isLoading: action.isLoading}
    }

    default:
      return state
  }
}

export const addBooks = (
  booksData: Array<BookDataType>, totalItems: number) => ({
  type: 'App-reducer/addBooks', booksData, totalItems
}) as const

export const addBooksByCategories = (
  booksData: Array<BookDataType>, totalItems: number) => ({
  type: 'App-reducer/addBooksByCategories', booksData,
  totalItems
}) as const

export const searchBooks = (
  booksData: Array<BookDataType>,
  totalItems: number,
  searchTitle: string
) => ({
  type: 'App-reducer/searchBooks', booksData, totalItems, searchTitle
}) as const

export const sortingByOrderBooks = (
  booksData: Array<BookDataType>, totalItems: number) => ({
  type: 'App-reducer/sortingByOrderBooks',
  booksData,
  totalItems
}) as const

export const sortingByCategoriesBooks = (
  booksData: Array<BookDataType>, totalItems: number) => ({
  type: 'App-reducer/sortingByCategoriesBooks',
  booksData,
  totalItems
}) as const

export const sortError = (error: boolean) =>
  ({type: 'App-reducer/sortError', error}) as const

export const searchIsFailed = (inputError: boolean) =>
  ({type: 'App-reducer/searchIsFailed', inputError}) as const

export const isLoading = (isLoading: boolean) =>
  ({type: 'App-reducer/isLoading', isLoading}) as const


export const addBooksTC = (title: string) => (
  dispatch: Dispatch, getState: () => AppRootStateType) => {
  const index = getState().app.items.length

  appAPI.getBooks(title, index)
    .then(res => {
      dispatch(addBooks(res.data.items, res.data.totalItems))
    })
    .catch(() => {
      dispatch(searchIsFailed(true))
      dispatch(sortError(false))
    })
}

export const addBooksByCategoriesTC = (
  select: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const index = getState().app.items.length
  appAPI.getMoreBookByCategory(select, index)
    .then(res => {
      dispatch(addBooksByCategories(res.data.items, res.data.totalItems))
    })
  dispatch(sortError(false))
  dispatch(searchIsFailed(false))
}

export const searchBookTC = (title: string) => (
  dispatch: Dispatch,
  getState: () => AppRootStateType
) => {
  dispatch(isLoading(true))
  const searchedTitle = getState().app.searchTitle
  let index = getState().app.items.length

  if (searchedTitle !== title) {
    index = 0
  }

  appAPI.getBooks(title, index)
    .then(res => {
      dispatch(searchBooks(res.data.items, res.data.totalItems, title))
      dispatch(sortError(false))
      dispatch(isLoading(false))
    })
    .catch(() => {
      dispatch(searchIsFailed(true))
      dispatch(sortError(false))
      dispatch(isLoading(false))
    })
}

export const sortingByOrderBooksTC = (
  title: string, select: string) => (dispatch: Dispatch) => {
  dispatch(isLoading(true))
  let sort = ''
  if (select === 'relevance') {
    sort = '&orderBy=relevance'
  }
  if (select === 'newest') {
    sort = '&orderBy=newest'
  }

  appAPI.sortByOrderBooks(title, sort)
    .then(res => {
      dispatch(sortingByOrderBooks(res.data.items, res.data.totalItems))
      dispatch(sortError(false))
      dispatch(isLoading(false))
    })
    .catch(() => {
      dispatch(sortError(true))
      dispatch(isLoading(false))
    })
  dispatch(searchIsFailed(false))
}
export const sortingByCategoriesBooksTC = (
  select: string) => (dispatch: Dispatch) => {
  dispatch(isLoading(true))
  let currentSelect = select

  if (select === 'all') {
    currentSelect = ""
  }
  appAPI.sortByCategoriesBooks(currentSelect)
    .then(res => {
      dispatch(sortingByCategoriesBooks(res.data.items, res.data.totalItems))
      dispatch(isLoading(false))
    })
  dispatch(sortError(false))
  dispatch(searchIsFailed(false))
}


export type ActionType =
  ReturnType<typeof addBooks>
  | ReturnType<typeof searchBooks>
  |
  ReturnType<typeof sortingByOrderBooks>
  | ReturnType<typeof sortingByCategoriesBooks>
  |
  ReturnType<typeof sortError>
  | ReturnType<typeof addBooksByCategories>
  | ReturnType<typeof isLoading>
  | ReturnType<typeof searchIsFailed>
