import axios from 'axios'
import { IParam } from '../models/IResponse';

export default class PostService {
    static async getAll(params: IParam) {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await axios.get(url, {
        params: {
            _page: params.page,
            _limit: params.limit,
        },
        });
        return response
    }
}
