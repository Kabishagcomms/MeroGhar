import {FaSpinner} from 'react-icons/fa'


export default function LoadingPage() {
  return (
    <main className=" w-full">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
       <FaSpinner  className='animate-spin h-10 w-10 fill-themeColor stroke-themeColor'/>
      </div>
    </main>
  )
}
