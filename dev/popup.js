/**
 * Create the table layout
 * 
 *  class table_Default - Create the settings for how many rows and column for the table
 *  
 *  info_Default(obj) - Default information for the table
 *  
 *  create_table_Default_Init(obj) - Initialize the table creation
 *  
 *  create_Thead_Default(obj) - Create the Thead
 *  
 *  create_rows_Default(obj) - Create the rows
 *  
 *  create_columns_Default(tRow, objInfo,setID,SetIDName,className) - Create columns
 *  
 *  create_Tfoot_Default(obj) - Create Footer
 *  
 *  add3Rows(obj) - Create the 3 default rows
 * 
 * 
 */



 class table_Default{

    constructor(clumns,rws)
    {
        this.clumns = clumns;
        this.rws = rws;

     }

     get getClumns() {
         return this.clumns
     }

     get getRws() {
         return this.rws;
     }

 }


function info_Default(obj) {
    obj.title = 'Web Books Tracker';
    obj.subTitle_1 = 'All';
    obj.subTitle_2 = 'Web Novel Name';
    obj.subTitle_3 = 'Chapter URL <span id="required" data-title="It is use to save your row, if you have it empty, it will not save the row!" style="cursor: pointer; color:red;">(Required)</span>';
    obj.subTitle_5 = 'Chapter Number';
    obj.subTitle_6 = 'Next Chapter Links';

}

function create_table_Default_Init(obj) {
    info_Default(obj);
    create_Thead_Default(obj);
    create_rows_Default(obj);
    create_Tfoot_Default(obj);
    add3Rows(obj);
    addExistingRow(LIMITAD); //in the add-table.js
    loadTable();// refresh-table.js

}

function create_Thead_Default(obj) {
    let table = document.getElementById("table-content");
    let tHead = table.createTHead();
    var row = tHead.insertRow();
    var cell = row.insertCell();
    cell.colSpan = obj.getClumns;
    cell.innerHTML = `${obj.title}`;

}

//create the default rows
function create_rows_Default(obj) {
    let table = document.getElementById("table-content");
    let tbody = table.createTBody();
    let row = tbody.insertRow();
    row.id = 'default';

    for (let i = 0; i < obj.clumns; i++) {

        if (i == 0) {
            create_columns_Default(row, obj.subTitle_1, "id", "1a", 'checkbox');
        }
        if (i == 1) {
            create_columns_Default(row, obj.subTitle_2, 'id', '2b');
        }
        if (i == 2) {
            create_columns_Default(row, obj.subTitle_3, 'id', '3c');
        }
        if (i == 3) {
            create_columns_Default(row, obj.subTitle_5, 'id', '5e');
        }
        if (i == 4) {
            create_columns_Default(row, obj.subTitle_6, 'id', '6f');
        }
    }
}

//create the default columns for the rows
function create_columns_Default(tRow, objInfo,setID,SetIDName,className) {
    let cell = tRow.insertCell();
    cell.className = className;
    cell.setAttribute(setID, SetIDName);
    cell.innerHTML = objInfo;
}

//Create the buttons for the footer
function create_Tfoot_Default(obj) {
    let table = document.getElementById("table-content");
    let tfoot = table.createTFoot();
    let row = tfoot.insertRow();
    row.id = 'default';

    let emptyCell = row.insertCell(); // create an empty cell
    emptyCell.className = 'checkbox';

    let cellAdd = row.insertCell();
    let cellRemove = row.insertCell();
    let cellRefresh = row.insertCell();
    let cellCreateLink = row.insertCell();

    //also need to be change in the inputdata for the onclick functionality
    const add = 'Add';
    const remove = 'Remove';
    const refresh = 'Save';
    const create_Links = 'Create Links';
    

    let button1 = buttons_tfooter(obj, add);
    cellAdd.appendChild(button1);

    let button2 = buttons_tfooter(obj, remove);
    cellRemove.appendChild(button2);

    let button3 = buttons_tfooter(obj, refresh);
    cellRefresh.appendChild(button3);

    let button4 = buttons_tfooter(obj, create_Links);
    cellCreateLink.appendChild(button4);
}

//  have 3 empty rows
function add3Rows(obj) {
    var numberOfRows = 3;
    let table = document.getElementById("table-content");
    let getTbody = table.getElementsByTagName("tbody")[0];

    for (let i = 0; i < numberOfRows; i++) {

        let row = getTbody.insertRow();
        row.id = 'default'+i;
        

        for (let j = 0; j < obj.clumns; j++) {
            let cell = row.insertCell();

            if (j == 0) {
                cell.className = 'checkbox';
            }

            else if (j == 1) {
                let inpboxTitle = inputbox_title('wnTitle', 'wnTitle');
                cell.appendChild(inpboxTitle);
            }

            else if (j == 2) {
                let inpboxURL = inputbox_wnURL('url', 'url');
                cell.appendChild(inpboxURL);
            }

            else if (j == 3) {
                let inpboxNum = inputbox_chapterNum('chapter', 'chapter');
                cell.appendChild(inpboxNum);
            }
                //------------------------------Create the availability link
            else if (j == 4) {
                let inpboxLink = clickable_availability('link', 'link');
                cell.appendChild(inpboxLink);
            }
            
        }

    }

}


 //run default table
 const defaultTable = new table_Default(5,5); //clmns, rws
create_table_Default_Init(defaultTable);
checkbox_all(defaultTable);