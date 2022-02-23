import { createServer, Model } from 'miragejs';
import data from './data.json';

export const usePagination = (schema: any, req: any, model: any) => {
    const { models: items } = schema[model].all();
    const page = req.queryParams.page ? parseInt(req.queryParams.page, 10) : 1;
    const rowsPerPage = req.queryParams.rowsPerPage ? parseInt(req.queryParams.rowsPerPage, 10) : 25;
    const query = req.queryParams.query;

    const filteredItems = query
        ? items.filter((item: any) => `${item.firstName} ${item.lastName}`.toLowerCase().includes(query.toLowerCase()))
        : items;

    return {
        items: filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage),
        total: filteredItems.length
    };
};

export const useServer = () => createServer({
    models: {
        user: Model
    },
    seeds (server) {
        data.forEach((row) => (server.schema as any).users.create(row));
    },
    routes () {
        this.namespace = 'api';

        this.get('/users', (schema, req) => usePagination(schema, req, 'users'));
    }
});
