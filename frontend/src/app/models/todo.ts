export class Todo {
    id: String;
    title: String = '';
    body: String = '';
    completed: boolean = false;
    created: String = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
