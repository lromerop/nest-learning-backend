import { Length } from "class-validator";

export class CreateEventDto{
    @Length(5, 60)     
    name: string;

    @Length(5, 100)     
    description: string;

    when: string;
    
    @Length(5, 80)     
    address: string;
}