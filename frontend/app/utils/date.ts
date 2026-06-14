const toLocaleString = (date:string)=> {
    let dateString:string ='';
    try{
        dateString = new Date(date).toLocaleString();
    }catch(e){
        console.error("Invalid date format:", date);
    }
    return dateString;
}

const DateUtils = {
    toLocaleString
}

export default DateUtils;