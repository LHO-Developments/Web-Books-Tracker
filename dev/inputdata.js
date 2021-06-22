/**
 * Creating elements
 * 
 * checkbox_all(obj) - creatign the All checkbox
 * 
 * checkbox_single(nameVal, classN) - Creating single checkbox
 * 
 * inputbox_wnURL(nameVal, classN) - Creating input box for URL
 * 
 * inputbox_chapterNum(nameVal, classN) - Creating input box for chaoter numebrs
 * 
 * clickable_availability() - Creating the links
 * 
 * inputbox_title - Creating a input box for title
 * 
 */

//label for the all checkboz
var allID = '1a';
var allCheckbox = 'all';
function checkbox_all(obj) {

    let table = document.getElementById(allID);
    let checkbox = checkbox_single(allCheckbox, allCheckbox);
    checkbox.onclick = function () {

        var checkbox = document.getElementsByClassName(allCheckbox);
        var inputs = document.getElementsByTagName("input");

        if (checkbox[0].checked == true) {
            
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "checkbox") {
                    inputs[i].checked = true;
                }
            }
        }
        else {
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "checkbox") {
                    inputs[i].checked = false;
                }
            }
        }


    };
     table.insertBefore(checkbox, table.childNodes[0]);
}

function checkbox_single(nameVal, classN) {

    let chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.className = classN;
    chkbox.name = nameVal;

    return chkbox;
}

function inputbox_wnURL(nameVal, classN) {

    let inpbox = document.createElement("input");
    inpbox.setAttribute("type", "text");
    inpbox.name = nameVal;
    inpbox.className = classN;

    return inpbox;
}

//setting the attrivutes for only numbers
var pattern = '[0-9]+';
var max = '99999';
function inputbox_chapterNum(nameVal, classN) {
    let inpbox = document.createElement("input");
    inpbox.setAttribute("type", "number");
    inpbox.pattern = pattern;
    inpbox.max = max;
    inpbox.name = nameVal;
    inpbox.className = classN;

    return inpbox;
}

//setting the names for the buttons
var a = 'Add';
var b = 'Remove';
var c = 'Save';
var d = 'Create Links';
function buttons_tfooter(obj, btnName) {

    let button = document.createElement("button");
    let text = document.createTextNode(btnName);
    button.name = btnName;
    button.className = btnName;
    button.appendChild(text);


    //Give button onclick events
    if (btnName == a) {

        button.onclick = function () { addNewRow(obj) };

    }
    else if (btnName == b) {

        //arrow function for fun
        button.onclick = function () { removeRow(obj) };

    }
    else if (btnName == c) {

        button.onclick = function () { saveTable() };

    }

    else if (btnName == d) {

        button.onclick = function () { create_Links() };

    }

    return button;
}

function clickable_availability(nameVal, classN) {

    var a = document.createElement('a');
    var linkText = document.createTextNode("No Link");
    a.appendChild(linkText);
    a.title = "No Links";
    a.href = "#";
    a.name = nameVal;
    a.className = classN;

    return a;
}

function inputbox_title(nameVal, classN) {

    let inpbox = document.createElement("input");
    inpbox.setAttribute("type", "text");
    inpbox.name = nameVal;
    inpbox.className = classN;

    return inpbox;
}