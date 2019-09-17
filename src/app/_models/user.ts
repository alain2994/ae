import { Item } from '@app/entities/item.entity';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}