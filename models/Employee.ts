export default class Employee{
    createdAt:Date;
    updatedAt:Date;
    constructor(
        public id:number,
        public name:string,
        public email: string
    ){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}