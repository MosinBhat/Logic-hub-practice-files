    // Getting the elements from DOM to JS
    let nameInput = document.getElementById('name');
    let idInput = document.getElementById('id');
    let genderInput = document.getElementById("gender");
    let parentageInput = document.getElementById('parentage');
    let contactInput = document.getElementById('contact');
    let addEmployeeBtn = document.getElementById('addEmployeeBtn');
    let employeeTableBody = document.getElementById('employeeTableBody');
    let formin = document.getElementById("formin");
    let errorInInput = document.getElementById("error");

    // Creating objects to insert input in table data
    let employeesObject = [
        {
            name: "Mosin Bhat",
            id: 1,
            gender: "male",
            parentage: "Shakeel",
            photo: "",
            contact: 9906042112
        },
        {
            name: "Hamza Munir Bhat",
            id: 2,
            gender: "male",
            parentage: "Munir",
            photo: "",
            contact: 9906054545
        },
        {
            name: "Irtiqa Malik",
            id: 3,
            gender: "female",
            parentage: "malik",
            photo: "",
            contact: 111255589            

        },
        {
            name: "Harsh Parihar",
            id: 4,
            gender: "Male",
            parentage: "Parihar",
            photo: "",
            contact: 464774111           

        }
    ];

    let check = new Promise((resolve,reject)=>{
        let storedEmpList = JSON.parse(localStorage.getItem("empList"));

        if(storedEmpList){
            resolve("Employee list have stored data")
        }
        else{
            reject("Employee list does not have stored data")
        }

    });

    check.then((dataCheck)=> console.log(dataCheck)).catch((dataCheck)=> console.log(dataCheck));




    function initjsToJSONtoLs(){

        // Storing/Saving the already existing list of employees/objects so that new entry wouldn't overwrite it/ replace it
        let storedEmpList = JSON.parse(localStorage.getItem("empList"))

        //if condition becouse everytime page reloads, its replaces localStorage data from original data manually inserted in js(Hardcode)
        //so this make sure that if the storedEmpList is emplty thn only insert original data otherwise, it wont run hence not replacing the user/client inserted data
        if(!storedEmpList){
        
         //converting javascript object to JSON object
         let jsToJSON = JSON.stringify(employeesObject)

         //Setting JSON object to localStorage
         localStorage.setItem("empList",jsToJSON)
        }  



         insertEmp()
    }
    initjsToJSONtoLs()
    

    // creating function for pushing object data to html using loop for array of object
    function insertEmp(){


            //Getting JSON object from localStorage
            let lsToJs = localStorage.getItem("empList")

            //coverting JSON object to javascript object
            let JSONTojs = JSON.parse(lsToJs);
            // console.log(JSONTojs);

        let td = ""
        for(let insertLoop of JSONTojs){
        td += `<tr>
                <td>${insertLoop.name}</td>
                <td>${insertLoop.id}</td>
                <td>${insertLoop.gender}</td>
                <td>${insertLoop.parentage}</td>
                <td><img src="/photos/user.png" alt=""></td>
                <td>${insertLoop.contact}</td>
                <td><a href="#">Edit</a></td>
            </tr>`
        }
        employeeTableBody.innerHTML = td;
    }
  


    // An event listener onclick, it will push the data to array of objects input by client and will check if all the sections are filled or not
    // Also takes the input from the user/client as form data and shows on the employee list on the webpage
    addEmployeeBtn.addEventListener("click",()=>{

        errorInInput.innerHTML = "";

        if(nameInput.value === "" || idInput.value === "" || genderInput.value === "" || parentageInput.value === "" || contactInput.value === ""){

            errorInInput.innerHTML = `<h4> Fill all the above sections</h4>`
            
        }

        else{

        // getting new data from form (without name attribute, it work since name attribute act as property for object)
            let newFormData = new FormData(formin);

        // converting that data to js object
            let newFormStore = Object.fromEntries(newFormData);
            
        // Storing/Saving the already existing list of employees/objects so that new entry wouldn't overwrite it/ replace it
            let storedEmpList = JSON.parse(localStorage.getItem("empList"))

        // Pushing the new data from user/client to array of object of js (simply pushing new data in old array list address in the new variable with same old data)
            storedEmpList.push(newFormStore);

        // Converting new entriy data from js object to JSON object and setting it to localStorage in one line code.
            localStorage.setItem("empList",JSON.stringify(storedEmpList))
            insertEmp();

        }
    })



