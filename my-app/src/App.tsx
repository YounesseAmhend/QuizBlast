import './App.css';
import {
  QuizForm, Navbar, Login, Register, QuizDisplay, Userview,
  Home, Settings, Categories, Category
} from './components/index'
import { useState, useEffect, useCallback } from "react"
import { useAuth } from './components/ts/states/useAuth';
import { useCategory, useUser } from './components/ts/states/userStates';
import { useDisplay } from './components/ts/states/useDisplay';
import { endsWithNumber } from './components/ts/staticFunctions';

export const PAGES: Pages = {
  HOME: { name: "home", path: "/", auth: false },
  NEW: { name: "new", path: "/new", auth: true },
  VIEW_QUIZ: { name: "view_quiz", path: "/quiz/", auth: true },
  USER_VIEW: { name:"user_view", path: "/user/", auth: false},
  USER_SETTINGS: { name:"user_settings", path: "/user/settings", auth: true},
  CATEGORIES: { name:"categories", path: "/category", auth: false},
  CATEGORY: { name:"category", path: "/category/", auth: false},

  REGISTER: { name: "register", path: "/register", auth: false },
  LOGIN: { name: "login", path: "/login", auth: false },
}

export interface Pages {
  HOME: Page,
  NEW: Page,
  VIEW_QUIZ: Page,
  USER_VIEW: Page,
  USER_SETTINGS: Page,
  CATEGORIES: Page,
  CATEGORY: Page,

  REGISTER: Page,
  LOGIN: Page,
}
export interface Display {
  home: boolean,
  new: boolean,
  view_quiz: boolean,
  user_view: boolean,
  user_settings: boolean,
  categories: boolean,
  category: boolean,

  register: boolean,
  login: boolean,
}
export interface Page {
  auth: boolean,
  name: string,
  path: string,
}
function App() {
  useEffect(() => {
    window.onpopstate = function () {
      window.location.reload()
    }
  }, [])

  const {id, setId} = useUser()
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const { is_authenticated, loaded } = useAuth()
  const { categoryId, setCategoryId } = useCategory()
  
  const {display, setDisplays} = useDisplay()
  
  const navigateTo = useCallback((page: Page, id: string="") => {
    const updatedDisplay = { ...display };
    for (const key of Object.keys(updatedDisplay)) {
      updatedDisplay[key as keyof Display] = key === page.name;
    }
    if (page.path !== PAGES.VIEW_QUIZ.path) {
      goToPath(page.path+id);
    }
    setDisplays(updatedDisplay);
  }, [display]);
  
  useEffect(() => {
    const pathname = window.location.pathname;
    const pageKeys = Object.keys(PAGES);

    if (loaded) {
      for (const key of pageKeys) {
        const Page = PAGES[key as keyof Pages];
        if(endsWithNumber(pathname)){
          console.log(pathname)
          if (pathname.substring(0, 6) === PAGES.VIEW_QUIZ.path) {
            setId(parseInt(pathname.substring(6)));
            navigateTo({ path: pathname, name: PAGES.VIEW_QUIZ.name, auth: PAGES.VIEW_QUIZ.auth });
          } else if(pathname.substring(0, 6) === PAGES.USER_VIEW.path){
            setUserId(parseInt(pathname.substring(6)));
            navigateTo({ path: pathname, name: PAGES.USER_VIEW.name, auth: PAGES.USER_VIEW.auth });
          }
          else if(pathname.substring(0, 10) === PAGES.CATEGORY.path){
            setCategoryId(parseInt(pathname.substring(10)));
            navigateTo({ path: pathname, name: PAGES.CATEGORY.name, auth: PAGES.CATEGORY.auth });
          }
        } else if (Page.path === pathname && pathname !== "/") {
          console.log("Working on navigation :", pathname)
          if (!Page.auth)
            navigateTo(Page)
          else if (is_authenticated && Page.auth)
            navigateTo(Page)
        }
      }
    }
  }
    , [is_authenticated])

  useEffect(() => { if (id && display.view_quiz) { goToPath(PAGES.VIEW_QUIZ.path + id); displayView() } }, [display.view_quiz, id])
  useEffect(() => { if (userId && display.user_view) {goToPath(PAGES.USER_VIEW.path  + userId); displayUser(userId) } }, [display.user_view, userId])
  useEffect(() => { if (categoryId && display.category) {goToPath(PAGES.CATEGORY.path + categoryId); navigateTo(PAGES.CATEGORY, String(categoryId)) } }, [display.category, categoryId])
  function goToPath(pathname: string) {
    window.history.pushState(null, "", pathname);
  }
  function displayHome() {
    navigateTo(PAGES.HOME)
  }
  function displayNew() {
    navigateTo(PAGES.NEW)
  }
  function displayLogin() {
    navigateTo(PAGES.LOGIN)
  }
  function displayRegister() {
    navigateTo(PAGES.REGISTER)
  }
  function displayView() {
    navigateTo(PAGES.VIEW_QUIZ, String(id))
  }
  function displaySettings() {
    navigateTo(PAGES.USER_SETTINGS)
  }
  function displayUser(id: number) {
    setUserId(id)
    navigateTo(PAGES.USER_VIEW, String(id))
  }
  function displayAny(page: Page){
    navigateTo(page)
  }
  return (
    <>
      <Navbar
        is_authenticated={is_authenticated}
        homeDisplay={displayHome}
        newDisplay={displayNew}
        displaySettings={displaySettings}
        displayUser={displayUser}
        loginDisplay={displayLogin}
        registerDisplay={displayRegister}
        displayAny={displayAny}
      />        
      <Home displayUser={displayUser} goView={displayView} setId={setId} visible={display.home} />
      {display.new && (
        <QuizForm goHome={displayHome} />
      )}
      {display.login && (
        <Login goRegister={displayRegister} />
      )}
      {display.register && (
        <Register goLogin={displayLogin} />
      )}
      {(display.view_quiz && id) &&
        <QuizDisplay displayUser={displayUser} id={id} key={id} />
      }
      {(display.user_view && userId) &&
        <Userview displayUser={displayUser} goView={displayView} setId={setId} visible={display.user_view} id={userId} key={userId} />
      }
      {display.user_settings && 
       <Settings/>
      }
      {display.categories &&
        <Categories />
      }
      {display.category &&
        <Category displayUser={displayUser} goView={displayView} />
      }
    </>
  );
}

export default App;
