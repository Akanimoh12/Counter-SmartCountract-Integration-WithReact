import { button } from "./constants"

function App() {


  return (
   <div className="  h-[100vh] w-[100%] justify-items-center content-center">
     <div className="w-2xs border-1 border-white m-auto rounded-2xl bg-linear-to-bl from-gray-800 to-pink-950 h-auto p-2 ">

        <h1 className={`${button.styles}text-white text-2xl text-center`}>Counter Contract</h1>

     </div>
   </div>
  )
}

export default App
