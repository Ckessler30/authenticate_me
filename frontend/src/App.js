import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import QuestionPage from './components/QuestionPage';
import * as sessionActions from "./store/session";
import HomePage from './components/HomePage';
import FilteredQuestions from './components/FilteredQuestions';
// import { getQuestions } from './store/questions';


function App() {

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // const questions = useSelector((state) => {
  //   // console.log("STATE", state)
  //   return state.questions.list;
  // });
  // console.log(questions)
  
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    // dispatch(getQuestions())
  }, [dispatch])
  
  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <main>
          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/questions/:questionId">
                <QuestionPage />
              </Route>
              <Route path="/filtered/questions">
                <FilteredQuestions />
              </Route>
            </Switch>
          )}
        </main>
      </>
    )
  );

}

export default App;
