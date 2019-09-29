<template lang="md" src="./definition.md" />
<script>
import View from '@components/View';
import { head } from "@helpers/head";

export default {
    extends: View,
    name: 'DataTableDefinitionView',
    layout: 'documentation',
    head: head({
        title: 'Definition - Data Table',
        description: 'Provide contextual feedback messages for typical user actions using Inkline\'s Alert component.'
    }),
    data () {
        return {
            columns: [
                { title: 'Name', key: 'name' },
                { title: 'Email', key: 'email', type: 'string' },
                { title: 'Date', key: 'date', type: 'date' },
                { title: 'Age', key: 'age', type: 'number', align: 'right' }
            ],
            rows: [
                { id: '1', name: 'Alice Spring', email: 'alice.spring@email.com', date: '2016/04/25', age: 26 },
                { id: '2', name: 'Connie Tenamn', email: 'connie.tenman@email.com', date: '2019/07/07', age: 30 },
                { id: '3', name: 'John Reid', email: 'john.reid@email.com', date: '2018/05/12', age: 28 },
                { id: '4', name: 'Robert Smith', email: 'robert.smith@email.com', date: '2017/08/16', age: 34 },
                { id: '5', name: 'Lisa Hendricks', email: 'lisa.hendricks@email.com', date: '2014/12/01', age: 31 }
            ],
            columnsNested: [
                { title: 'Name', key: 'name' },
                { title: 'City', key: 'address.city' },
                { title: 'Country', key: 'address.country' },
            ],
            rowsNested: [
                { id: '1', name: 'Alice Spring', address: { city: 'Los Angeles', country: 'United States' } },
                { id: '2', name: 'Connie Tenamn', address: { city: 'Munich', country: 'Germany' } },
                { id: '3', name: 'John Reid', address: { city: 'Timisoara', country: 'Romania' } },
                { id: '4', name: 'Robert Smith', address: { city: 'London', country: 'England' } },
                { id: '5', name: 'Lisa Hendricks', address: { city: 'Melbourne', country: 'Australia' } },
            ]
        };
    }
};
</script>
