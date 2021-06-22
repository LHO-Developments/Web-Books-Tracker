/**
 * To remove rows.
 * 
 * removeRow(obj) - Remove row based on what checkboxes are checked, used in the InnputData.JS for the buttons
 * 
 * RemoveExistingRow(limit, rowName) - Put previous store value in a temp array, then change any value in the array that was marked for deletion, set the temp array as new google storage data.
 * 
 * */

var all = 'all';
var removeNameList = [];
var flagRemove = false;

function removeRow(obj) {

    //console.log('\n\n\n');
    let table = document.getElementById("table-content");
    let Allcheckboxes = table.getElementsByTagName("input");
    let tempArray = [];
    let flag = false;

    // check for checked boxes and put name of the checked boxes into a temp array
    for (let i = 0; i < Allcheckboxes.length; i++) {

        if (Allcheckboxes[i].type == 'checkbox') {

            if (Allcheckboxes[i].name != all) {

                //console.log(Allcheckboxes[i]);
            }


            if (Allcheckboxes[i].name == all) {
                Allcheckboxes[i].checked = false;
            }

            if (Allcheckboxes[i].checked == true && Allcheckboxes[i].name != all) {
                tempArray[i] = Allcheckboxes[i].name;
                //console.log('Row that will be remove: ' + tempArray[i]);
                flag = true;
                flagRemove = true;


            }
        }



    }
    //console.log('\n\n\n');
    let removelistCounter = 0;

    //remove the row and the local data of the row
    if (flag == true) {
        for (let i = 0; i < tempArray.length; i++) {

            if (tempArray[i] != null || tempArray[i] != undefined) {

                //console.log('This row has been removed: ' + tempArray[i]);
                let tempNameID = tempArray[i];


                if (tempNameID != all) {
                    removeNameList[removelistCounter] = tempNameID;
                    removelistCounter++;
                    var element = document.getElementById(tempNameID);
                    element.parentNode.removeChild(element);
                }


            }


        }

        //console.log(removeNameList);
        RemoveExistingRow(LIMITAD, removeNameList);

    }
    //console.log('\n\n');
}    


    



// put previous store value in a temp array, then change any value in the array that was marked for deletion, set the temp array as new google storage data.
function RemoveExistingRow(limit, rowName) {
    var chromeURL = 'rowURL';
    let newUrlObj = {};
    var tempURL = [];

    for (let i = 0; i < limit; i++) {

        tempURL[i] = chromeURL + i;
    }

    chrome.storage.local.get(tempURL, function (obj) {

        for (let i = 0; i < limit; i++) {
            let urlName = chromeURL + i;
            newUrlObj[urlName] = obj[tempURL[i]]
        }

        for (let i = 0; i < limit; i++) {
            try {
                //console.log(rowName[i]);
                if (rowName[i] != undefined) {

                    let string = rowName[i];
                    let num = string.match(/\d/g);
                    num = num.join("");
                    let tempurlName = chromeURL + num;
                    newUrlObj[tempurlName] = '';

                }
            }
            catch (err) {

            }
        }


        chrome.storage.local.set(newUrlObj, function () { /*console.log('===Remove Add-On URL Data is Updated===');*/ });
        
        

    });
}