import {Todo} from './todo'

export class TodoGroup {
    name: string = '';
    id: string='';
    items: string = '';
    count: number= 0;
    selected: boolean=false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
