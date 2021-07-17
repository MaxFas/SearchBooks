import React, {useState} from 'react';
import '../../App.css';
import {SearchingPanel} from "../SearchingPanel/SearchingPanel";
import {ResultData} from "../ResultData/ResultData";
import styles from "./App.module.css"
import {Route, Switch, Redirect} from "react-router-dom";
import {CurrentBook} from "../CurrentBook/CurrentBook";

function App() {
  const [nameBook, setNameBook] = useState<string>('')
  const [select, setSelect] = useState<string>('')

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SearchingPanel
          nameBook={nameBook}
          setNameBook={setNameBook}
          setSelect={setSelect}
        />
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => <Redirect to={"/books"}/>}
          />
          <Route
            exact
            path={'/books'}
            render={() => <ResultData select={select} nameBook={nameBook}/>}
          />
          <Route
            exact
            path={'/books/:bookId'}
            render={() => <CurrentBook/>}
          />
          <Route
            exact
            path={'*'}
            render={() => <div style={{textAlign: 'center', fontSize: '80px'}}>
              404: PAGE IS NOT FOUND
            </div>}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
