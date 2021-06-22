/**
 * To create new rows and existing rows.
 * 
 * addNewRow(obj) - Create a new row. Used in the inputdata.js for the buttons
 * 
 * addRowNotRemoved(rowID) - Add rows that was not removed, example: row 6 and 7 is removed, but 8,9, and 10 are not. It is used in the readLocalStorageURL function
 * 
 * addExistingRow(limit) - create arrays of ids of the rows to be used to track what rows are existing or not
 * 
 * readLocalStorageURL(tempcount, tempURL, urlNotEmpty) - Use to identify all the existing row and prep them to be created
 * 
 * awaitLocalStorage(tempcount, tempURL, urlNotEmpty) - Use to execute the readLocalStorageUR function
 * 
 * */

function addNewRow(obj) {

    let table = document.getElementById("table-content");
    let getTbody = table.getElementsByTagName("tbody")[0];

    let trCounter = table.getElementsByTagName("tbody")[0].getElementsByTagName('tr').length;

    if (trCounter < LIMITAD) {

        let row = getTbody.insertRow();
        
        const newRowName = 'row';
        let noRowNameDupe = newRowName + trCounter;

        row.id = noRowNameDupe;
        row.className = 'selectable';

        // Prevent duplicates
        for (let i = 0; i < LIMITAD; i++)
        {
            let xName = newRowName + i;
            let x = document.querySelectorAll('#' + xName);
            
            if (x.length <= 0)
            {
                row.id = xName;
                noRowNameDupe = xName;
                break;
            }
            else
            {
                //console.log('There already an existing RowID: ' + xName);
            }
        }

        let string = noRowNameDupe;
        let num = string.match(/\d/g);
        num = num.join("");

        // Creating the checkbox, title, URL, and chapter
        for (let j = 0; j < obj.clumns; j++) {
            let cell = row.insertCell();

            if (j == 0) {
                cell.className = 'checkbox';
                let checkbox = checkbox_single(noRowNameDupe, noRowNameDupe);
                cell.appendChild(checkbox);

            }

            if (j == 1) {
                let inpboxTitle = inputbox_title('titleAR'+num, noRowNameDupe);
                cell.appendChild(inpboxTitle);

            }

            else if (j == 2) {
                let inpboxURL = inputbox_wnURL('urlAR'+num, noRowNameDupe);
                cell.appendChild(inpboxURL);
            }

            else if (j == 3) {
                let inpboxNum = inputbox_chapterNum('chapterAR' + num, noRowNameDupe);
                cell.appendChild(inpboxNum);
            }

            else if (j == 4) {
                let inpboxLink = clickable_availability('linkAR' + num, noRowNameDupe);
                cell.appendChild(inpboxLink);
            }

        }

        //console.log('This row is inserted: ' + row.id);
        //console.log('\n');

    }
    else {
        let limits = LIMITAD - 1;
        return alert(`You can only have up to ${limits} rows!`);
    }

  
    
}
//Add rows that were not removed example: 6 rows, remove 3 and 4. It should display 1,2,5,6
var columns = 5; //obj columns
function addRowNotRemoved(rowID) {

    let table = document.getElementById("table-content");
    let getTbody = table.getElementsByTagName("tbody")[0];

        let row = getTbody.insertRow();

        let noRowNameDupe = rowID;

        row.id = noRowNameDupe;
        row.className = 'selectable';

        let string = noRowNameDupe;
        let num = string.match(/\d/g);
        num = num.join("");

        // Creating the checkbox, URL, and chapter
    for (let j = 0; j < columns; j++) {
            let cell = row.insertCell();

        if (j == 0) {
            cell.className = 'checkbox';
            let checkbox = checkbox_single(noRowNameDupe, noRowNameDupe);
            cell.appendChild(checkbox);

        }

        if (j == 1) {
            let inpboxTitle = inputbox_title('titleAR'+num, noRowNameDupe);
            cell.appendChild(inpboxTitle);

        }

        else if (j == 2) {
            let inpboxURL = inputbox_wnURL('urlAR'+num, noRowNameDupe);
            cell.appendChild(inpboxURL);
        }

        else if (j == 3) {
            let inpboxNum = inputbox_chapterNum('chapterAR' + num, noRowNameDupe);
            cell.appendChild(inpboxNum);
        }

        else if (j == 4) {
            let inpboxLink = clickable_availability('linkAR' + num, noRowNameDupe);
            cell.appendChild(inpboxLink);
        }

        }

        //console.log('This row is inserted: ' + row.id);




}

function addExistingRow(limit)
{
    var chromeURL = 'rowURL';
    var chromeChapter = 'rowChap';
    var tempURL = [];
    var tempChapter = [];

    for (let i = 0; i < limit; i++) {

        tempURL[i] = chromeURL + i;
        tempChapter[i] = chromeChapter + i;
    }

    var tempcount = 0;
    var tempcount2 = 0;

    let urlNotEmpty = [];
    let chapterNotEmpty = []

    awaitLocalStorage(tempcount, tempURL, urlNotEmpty, tempcount2, tempChapter, chapterNotEmpty);

    tempcount = 0;
    tempcount2 = 0;



}

function readLocalStorageURL(tempcount, tempURL, urlNotEmpty) {

    let name = 'row';

        chrome.storage.local.get(tempURL, function (obj) {

            for (let i = 0; i < LIMITAD ; i++) {

                try{
                
                    if (obj[tempURL[tempcount]] != undefined && obj[tempURL[tempcount]].length >=1) {
                        //console.log('There value in URL Row: ' + tempURL[tempcount] + '\n Data: ' + obj[tempURL[tempcount]]);
                        urlNotEmpty[i] = true;
                    }
                    else {
                        //console.log('There no value in URL Row: ' + tempURL[tempcount]);
                        urlNotEmpty[i] = false;
                    }
                }
                catch(err)
                {
                    urlNotEmpty[i] = false;
                }
                tempcount++;

            }

            //console.log('\n');

            for (let i = 0; i < LIMITAD; i++) {
                if (urlNotEmpty[i] == true) {

                    //console.log('add row that was not removed id: ' + i);
                    addRowNotRemoved(name + i);
                }
            }

            //console.log('\n');

        });

}

function awaitLocalStorage(tempcount, tempURL, urlNotEmpty) {
    readLocalStorageURL(tempcount, tempURL, urlNotEmpty);
}