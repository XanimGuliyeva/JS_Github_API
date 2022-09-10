class Storage{
    static getSearchedUsersFromStorage(){
        //All users
        let users;

        if(localStorage.getItem("searched") === null){
            users =[];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        //Add users

        let users = this.getSearchedUsersFromStorage();
        //indexOf
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllUsersFromStorage(){
        localStorage.removeItem("searched");
    }
}