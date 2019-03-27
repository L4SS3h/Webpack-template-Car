import axios,{
    AxiosResponse, AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";
let contentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let getAllCarsbtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("GetAllBtn")
let addBtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addBtn");

addBtn.addEventListener("click", addCar)
getAllCarsbtn.addEventListener("click", showAllCars)

function addCar():void {
    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel")
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor")
    let addPricelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice")

    let myModel : string = addModelelement.value;
    let myVendor : string = addVendorelement.value;
    let myPrice : number = +addPricelement.value;

    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",{model : myModel, vendor : myVendor, price : myPrice})
    .then(function(response : AxiosResponse) : void{
        console.log(response.status)
    }) 
    .catch(function(error : AxiosError) : void {
        console.log(error)
    })
}
function showAllCars():void {
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function(response:AxiosResponse<ICar[]>): void {
        console.log(response);
        let result : string = "<ol>"
        response.data.forEach((car : ICar) => {
            result += "<li>"+ car.model +" | "+ car.vendor +" | "+ car.price +" | "+ car.id +"</li>";
        });
        result += "</ol>";
        contentElement.innerHTML = result;
        console.log("Er i slutningen af 'then'")
    })

    .catch(function(error : AxiosError) : void {
        console.log(error);
    })
    console.log("Er i slutningen af 'showallcars' function")
}
