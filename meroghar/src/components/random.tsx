
interface Etext{
    text:string
}

export function ErrorText({text}:Etext){
    return(
        <p className="block w-[95%] text-left text-sm text-red-700">
        {text}
      </p>
    )
}