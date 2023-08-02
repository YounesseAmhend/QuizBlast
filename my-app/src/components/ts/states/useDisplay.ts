import { Page, Pages, Display } from "../../../App";
import { create } from 'zustand';

interface UseDisplay {
    display: Display;
    setDisplays: (display: Display) => void;
    setDisplay: (page: string) => void;
  }

export const useDisplay = create<UseDisplay>((set) => ({
    display: {
      home: true,
      new: false,
      view_quiz: false,
      user_view: false,
      user_settings: false,
      register: false,
      login: false,
    },
    setDisplays: (display: Display) => set({ display }),
    setDisplay: (page: string) => {
        set((state) => ({
          display: {
            ...state.display,
            [page]: true,
          },
        }));
    },

    // for (const key of Object.keys(updatedDisplay)) {
    //   updatedDisplay[key as keyof Display] = key === page.name;
    // }
    // if (page.path !== PAGES.VIEW_QUIZ.path) {
    //   goToPath(page.path+id);
    // }
    // setDisplays(updatedDisplay);
  }));
  
