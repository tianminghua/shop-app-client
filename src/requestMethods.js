import axios from "axios";

const BASE_URL = "https://dl-shop-app-api.herokuapp.com/api";
const TOKEN = "123eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjU4NzZiYWY3ODRlZDVkNTUxZmM3YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzU2ODcwMywiZXhwIjoxNjQ3ODI3OTAzfQ.pU2QsYG57hlWva08BbbphwD9bxG2dcSy-IRy2AcoBG8123123";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: TOKEN },
})