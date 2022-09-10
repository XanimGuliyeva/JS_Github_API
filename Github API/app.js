//Elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");

const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();


eventListener();


function eventListener(){

   githubForm.addEventListener("submit",getData);
   clearLastUsers.addEventListener("click",clearAllSearched);
   document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let userName = nameInput.value.trim();
    if(userName === ""){
        alert("Please enter your name");
    }
    else{
        github.getGithubData(userName)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("User is not found");
            }
            else{
                ui.addSearchedUserToUI(userName);
                Storage.addSearchedUserToStorage(userName);
                ui.showUserINfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    if(confirm("Are u sure?")){
        Storage.clearAllUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // //Get all searched items from storage and add UI
     let users = Storage.getSearchedUsersFromStorage();
     let result = "";
     users.forEach(user => {
         result +=`<li class="list-group-item">${user}</li>`;
     });
         lastUsers.innerHTML = result;
}