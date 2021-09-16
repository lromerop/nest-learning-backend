import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//Use the sintax 'name' in decorator Entity for xreate a new row in database
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    
    //Change length use property lenght
    @Column({length: 100})
    name: string;
    
    @Column()
    description: string;

    //Change name in table use name
    @Column({name: 'when_date'})
    when: Date;

    @Column()
    address: string;
}