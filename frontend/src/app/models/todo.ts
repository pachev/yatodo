export class Todo {
    id: string;
    title: string = '';
    body: string = '';
    completed: boolean = false;
    created: string = '';
    editing: boolean=false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
