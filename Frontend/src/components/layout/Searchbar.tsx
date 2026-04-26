import Input from "../ui/Input";
import Button from "../ui/Button";


function Searchbar() {
    return(
        <div className="search-container">
        <div className="searchbar">
            <Input type="text" placeholder="Buscar..."></Input>
        </div>
        <div>
            <Button  classname="search-btn" titulo="Buscar" />
        </div>
        </div>
    )
}
export default Searchbar;