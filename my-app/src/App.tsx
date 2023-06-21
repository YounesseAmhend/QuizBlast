import './App.css';
import {
  QuizForm, Navbar, Login, Register, QuizDisplay,
  Home
} from './components/index'
import { useState, useEffect, useCallback } from "react"
import { useAuth } from './components/ts/hooks';

const PAGES: Pages = {
  HOME: { name: "home", path: "/", auth: false },
  NEW: { name: "new", path: "/new", auth: true },
  VIEW_QUIZ: { name: "view_quiz", path: "/quiz/", auth: true },

  REGISTER: { name: "register", path: "/register", auth: false },
  LOGIN: { name: "login", path: "/login", auth: false },
}

interface Pages {
  HOME: Page,
  NEW: Page,
  VIEW_QUIZ: Page,

  REGISTER: Page,
  LOGIN: Page,
}
interface Display {
  home: boolean,
  new: boolean,
  view_quiz: boolean,

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
  const { is_authenticated, loaded } = useAuth()
  const [display, setDisplays] = useState({
    home: true,
    new: false,
    view_quiz: false,
    register: false,
    login: false,
  })
  const navigateTo = useCallback((page: Page) => {
    Object.keys(display).forEach((key, value) => {
      console.log("working on navigation")
      key === page.name ? display[key as keyof Display] = true : display[key as keyof Display] = false
    })
    if (page.path !== PAGES.VIEW_QUIZ.path) { goToPath(page.path) }
    setDisplays({ ...display })
  }, [display])
  useEffect(() => {
    const pathname = window.location.pathname;
    Object.keys(PAGES).forEach((key, value) => {
        const Page = PAGES[key as keyof Pages]
      if (loaded) {
        if (pathname.substring(0, 6) === PAGES.VIEW_QUIZ.path) {
          console.log("navigating...")
          setId(parseInt(pathname.substring(6, pathname.length)))
          navigateTo({ path: pathname, name: PAGES.VIEW_QUIZ.name, auth: PAGES.VIEW_QUIZ.auth })
        }
          else if (Page.path === pathname && pathname !== "/" && PAGES[key as keyof Pages].auth === is_authenticated) {
            navigateTo(PAGES[key as keyof Pages])
        }
      }
    })
  }
    , [is_authenticated])

  useEffect(() => { if (id && display.view_quiz) { goToPath("/quiz/" + id) } }, [display.view_quiz, id])
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
    navigateTo(PAGES.VIEW_QUIZ)
  }
  return (
    <>
      <Navbar
        is_authenticated={is_authenticated}
        homeDisplay={displayHome}
        newDisplay={displayNew}
        loginDisplay={displayLogin}
        registerDisplay={displayRegister}
      />
      {(display.home && loaded) && (
        <Home goView={displayView} setId={setId} />
      )}
      {display.new && (
        <QuizForm goHome={displayHome} />
      )}
      {display.login && (
        <Login goRegister={displayHome} />
      )}
      {display.register && (
        <Register goLogin={displayLogin} />
      )}
      {(display.view_quiz && id) &&
        <QuizDisplay id={id} key={id} />
      }
    </>
  );
}

export default App;
