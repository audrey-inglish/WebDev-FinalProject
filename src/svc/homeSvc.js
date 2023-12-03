

export function SaveLatestCollectionName(collectionName){
    localStorage.setItem("previousCollection", collectionName);
}

export function GetLatestCollectionName(){
    return localStorage.getItem("previousCollection");
}

export default {
    SaveLatestCollectionName,
    GetLatestCollectionName
}