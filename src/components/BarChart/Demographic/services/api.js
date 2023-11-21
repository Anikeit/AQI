import { commonrqst } from "./apicall";
import { BASE_URL } from "../helper/helper";

export const getStatefunc = async(year_id,state_id, city_id) =>{
    return await commonrqst("GET", `${BASE_URL}/air/${year_id}?state_id=${state_id}&city_id=${city_id}`,"");
}

/*export const getCityfunc = async(year_id, state_id) =>{
    return await commonrqst("GET", `${BASE_URL}/air/${year_id}/${state_id}`,"");
}*/