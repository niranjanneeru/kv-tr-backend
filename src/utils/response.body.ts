export default class ResponseBody {
    public meta: object
    constructor(
        public data: object,
        public errors: object,
        public message: string,
    ) { }

    set_meta(records: number){
        this.meta = {
            'length' : records,
            'took' : this.get_ns_time(),
            'total' : records
        }
    }

    get_ns_time(){
        return Math.round(performance.measure('start to end', 'start').duration);
    }

}