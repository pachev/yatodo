export class Todo {
    id: number;
    title: String = '';
    completed: boolean = false;
    created: String = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
