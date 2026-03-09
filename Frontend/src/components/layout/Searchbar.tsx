import Input from "../ui/Input";
import Button from "../ui/Button";


function Searchbar() {
    return(
        <div className="searchbar">
            <Input type="text" placeholder="Search..."></Input>
            <Button titulo="Buscar" />
        </div>
    )
}
export default Searchbar;