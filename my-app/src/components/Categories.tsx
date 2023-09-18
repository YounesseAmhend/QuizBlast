import { useDisplay } from "./ts/states/useDisplay";
import { useCategory } from "./ts/states/userStates";
import { PAGES } from "../App";
interface Props {}

interface Category {
  id: number;
  name: string;
  classColor?: string; // We will use Tailwind CSS color classes here
}

export default function Categories(props: Props) {
  const categories: Category[] = [
    { id: 1, name: 'Casual', classColor: 'hover:bg-[#4957D7] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '},
    { id: 2, name: 'Math', classColor: 'hover:bg-[#FF4646] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '},
    { id: 3, name: 'Science', classColor: 'hover:bg-[#156391] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 4, name: 'History', classColor: 'hover:bg-[#FF9500] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 5, name: 'Geography', classColor: 'hover:bg-[#008080] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 6, name: 'Literature', classColor: 'hover:bg-[#FFBE19] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 7, name: 'Language', classColor: 'hover:bg-[hsla(225,73%,57%,0.95)] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 8, name: 'Logic', classColor: 'hover:bg-[#487AFA] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 9, name: 'Environment', classColor: 'hover:bg-[#00AC59] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 10, name: 'Astronomy', classColor: 'hover:bg-[hsla(300,100%,25%,0.95)] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 11, name: 'Economics', classColor: 'hover:bg-[#FF007F] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 12, name: 'Government', classColor: 'hover:bg-[#00A199] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 13, name: 'Health', classColor: 'hover:bg-[#FF3737] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 14, name: 'Art', classColor: 'hover:bg-[#723AFF] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    { id: 15, name: 'Computer Science', classColor: 'hover:bg-[#009DFF] hover:text-white hover:scale-[1.2] transform duration-200 p-5 max-[600px]:p-3 rounded-xl shadow-lg font-semibold text-xl cursor-pointer max-[600px]:text-base '  },
    ]
  const { setCategoryId } = useCategory()
  const { setDisplay } = useDisplay()

  function handleClick(id: number){
    setCategoryId(id)
    setDisplay(PAGES.CATEGORY.name)
  }
  
  return (
    <div className="grid grid-cols-3 gap-4 mx-2 mb-4 max-[600px]:grid-cols-2">
      {categories
        .map((category: Category) => (
        <div key={category.id} onClick={()=>{handleClick(category.id)}} className={category.classColor}>
          <div onClick={(event)=>{console.log(event.currentTarget.className)}} className={`hover:scale-[1.2] text-center transform duration-200`}>
          {category.name}
          </div>
        </div>
      ))}
    </div>
  );
}
