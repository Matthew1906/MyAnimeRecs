export const formatMembers = (num)=>{
    if(num>=1000000){
        return String(Math.round(num/1000000)) + "M";
    }
    else if(num>=1000){
        return String(Math.round(num/1000)) + "K";
    }
    else{
        return String(num);
    }
}

export const cleanText = (text, toReplace) => text.replace(toReplace,"");