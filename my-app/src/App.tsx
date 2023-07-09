import './App.css';
import {
  QuizForm, Navbar, Login, Register, QuizDisplay, Userview,
  Home, Settings
} from './components/index'
import { useState, useEffect, useCallback } from "react"
import { useAuth } from './components/ts/states/useAuth';

const PAGES: Pages = {
  HOME: { name: "home", path: "/", auth: false },
  NEW: { name: "new", path: "/new", auth: true },
  VIEW_QUIZ: { name: "view_quiz", path: "/quiz/", auth: true },
  USER_VIEW: { name:"user_view", path: "/user/", auth: false},
  USER_SETTINGS: { name:"user_settings", path: "/user/settings", auth: true},

  REGISTER: { name: "register", path: "/register", auth: false },
  LOGIN: { name: "login", path: "/login", auth: false },
}

interface Pages {
  HOME: Page,
  NEW: Page,
  VIEW_QUIZ: Page,
  USER_VIEW: Page,
  USER_SETTINGS: Page,

  REGISTER: Page,
  LOGIN: Page,
}
interface Display {
  home: boolean,
  new: boolean,
  view_quiz: boolean,
  user_view: boolean,
  user_settings: boolean,

  register: boolean,
  login: boolean,
}
interface Page {
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

  const [id, setId] = useState<number | undefined>(undefined)
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const { is_authenticated, loaded } = useAuth()
  
  const [display, setDisplays] = useState<Display>({
    home: true,
    new: false,
    view_quiz: false,
    user_view: false,
    user_settings: false,

    register: false,
    login: false,
  })
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
        if(!isNaN(Number(pathname.substring(6))) && pathname.substring(6) !== ""){
          console.log(pathname)
          if (pathname.substring(0, 6) === PAGES.VIEW_QUIZ.path) {
            setId(parseInt(pathname.substring(6)));
            navigateTo({ path: pathname, name: PAGES.VIEW_QUIZ.name, auth: PAGES.VIEW_QUIZ.auth });
          } else if(pathname.substring(0, 6) === PAGES.USER_VIEW.path){
            setUserId(parseInt(pathname.substring(6)));
            navigateTo({ path: pathname, name: PAGES.USER_VIEW.name, auth: PAGES.USER_VIEW.auth });
          }
        } else if (Page.path === pathname && pathname !== "/" && Page.auth === is_authenticated) {
          navigateTo(Page);
        }
      }
    }
  }
    , [is_authenticated])

  useEffect(() => { if (id && display.view_quiz) { goToPath("/quiz/" + id) } }, [display.view_quiz, id])
  useEffect(() => { if (userId && display.user_view) {goToPath("/user/" + userId) } }, [display.user_view, userId])
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
    </>
  );
}

export default App;
