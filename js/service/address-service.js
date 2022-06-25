import Address from "../model/address.js";
import * as requestService from '../service/request-service.js'

export async function findByCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const result = await requestService.getJson(url);

    const address = new Address(result.cep,null,result.logradouro, result.localidade);
    return address;
}