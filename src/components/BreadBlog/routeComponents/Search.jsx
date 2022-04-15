import {useSearchParams} from "react-router-dom";

export default function Search(){
    const [search,setSearch] = useSearchParams()
    return(
        <div>
            搜索了{search.get('query')}
        </div>
    )
}