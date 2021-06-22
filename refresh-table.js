/**
 * Save rows and create links
 * 
 * saveTable() - Save the table, it is used in the the inputdata.js for the buttons
 * 
 * loadTable() - Load table when opening the extension, use in the popup.js
 * 
 * savingDefaultRows() - Save inputted data in the table
 * 
 * loadDefaultRows() - Load the default rows with no checkboxes
 * 
 * savingAddOnRows() - Save the inputted data in the rows that were created when clicking the 'Add' button
 * 
 * loadAddOnRows() - Load the rows that were created when clicking the 'Add' button
 * 
 * create_Links() - Create links in links column
 * 
 * create_default_links() - Create links for the defualt rows
 * 
 * create_Addon_Links() - Create links for the rows that were created when clicking the 'Add' button
 * 
 * isURL(url) - logic to check if its a real url.
 * 
 * getEndOfFullURL(url, flag) - remove '/' character if its there and grab the end path of the url.
 */


// in the inputdata script
function saveTable() {
    savingDefaultRows();
    savingAddOnRows();
}

function loadTable() {
    loadDefaultRows();
    loadAddOnRows();
   
}

function savingDefaultRows()
{
    var titleObj = {};
    var urlObj = {};
    var chapterObj = {};
    
    for(let i=0; i < 3 ;i++)
    {
        var chromeTitle = 'titledefault' + i;
        var chromeURL = 'urldefault' + i;
        var chromeChapter = 'chapterdefault' + i;

        var defaultIDName = 'default' + i;
        var row = document.getElementById(defaultIDName);
        var inputboxes = row.getElementsByTagName('input');

        //default tables data is saving in temp arrays for each columns for inputboxes, checkbox, and a href
        for (let j = 0; j < inputboxes.length; j++) {

            if (inputboxes[j].type == 'text' && inputboxes[j].name == 'wnTitle') {

                titleObj[chromeTitle] = inputboxes[j].value;

                //console.log(`Text-${chromeTitle}: ` + inputboxes[j].value + '\n');
                
            }

            if (inputboxes[j].type == 'text' && inputboxes[j].name =='url') {

                urlObj[chromeURL] = inputboxes[j].value;

                //console.log(`Text-${chromeURL}: ` + inputboxes[j].value + '\n');
                
            }
            if (inputboxes[j].type == 'number') {
                chapterObj[chromeChapter] = inputboxes[j].value;

                //console.log(`number-${chromeChapter}: ` + inputboxes[j].value + '\n');
                
            }
       
        }
    }

   // console.log(titleObj);
   // console.log(urlObj);
   // console.log(chapterObj);

    chrome.storage.local.set(titleObj, function () { /*console.log('===Title Data is saved===');*/ });
    chrome.storage.local.set(urlObj, function () {/*console.log('===URL Data is saved===')*/;});
    chrome.storage.local.set(chapterObj, function () {/* console.log('===Chapter Data is saved===');*/ });

    //console.log('\n');
}

function loadDefaultRows()
{
    var chromeTitle = 'titledefault';
    var chromeURL = 'urldefault';
    var chromeChapter = 'chapterdefault';

    var tempTitle = [];
    var tempURL = [];
    var tempChapter = [];

    for (let i = 0; i < 3 ; i++) {

        tempTitle[i] = chromeTitle + i;
        tempURL[i] = chromeURL + i;
        tempChapter[i] = chromeChapter + i;
    }

    var tempcount = 0;
    var tempcount1 = 0;
    var tempcount2 = 0;

    chrome.storage.local.get(tempTitle, function (obj) {

        for (let i = 0; i < 3; i++) {
            var defaultIDName = 'default' + i;
            var row = document.getElementById(defaultIDName);
            var inputboxes = row.getElementsByTagName('input');

            for (let j = 0; j < inputboxes.length; j++) {
                if (inputboxes[j].type == 'text' && inputboxes[j].name == 'wnTitle') {

                    if (obj[tempTitle[j]] === undefined) {
                        inputboxes[j].value = '';
                       // console.log(`GET Default Title in Undefined ${tempcount}-: ` + obj[tempTitle[tempcount]]);
                    }
                    else {
                        var text = obj[tempTitle[tempcount]];
                        inputboxes[j].value = text;
                        inputboxes[j].title = text;
                       // console.log(`GET Default Title ${tempcount}-: ` + obj[tempTitle[tempcount]]);
                    }
                    tempcount++;

                }
            }
        }
       // console.log('\n');
    });


    tempcount = 0;

    chrome.storage.local.get(tempURL, function (obj) {

        for (let i = 0; i < 3 ; i++) {
            var defaultIDName = 'default' + i;
            var row = document.getElementById(defaultIDName);
            var inputboxes = row.getElementsByTagName('input');
            
            for (let j = 0; j < inputboxes.length; j++) {
                if (inputboxes[j].type == 'text' && inputboxes[j].name == 'url') {

                    if (obj[tempURL[j]] === undefined) {
                        inputboxes[j].value = '';
                       // console.log(`GET Default URL in Undefined ${j}-: ` + obj[tempURL[tempcount1]]);
                    }
                    else {
                        var text = obj[tempURL[tempcount1]];
                        inputboxes[j].value = text;
                       // console.log(`GET Default URL ${j}-: ` + obj[tempURL[tempcount1]]);
                    }
                    tempcount1++;

                }
            }
        }
       // console.log('\n');
    });


    tempcount1 = 0;

    chrome.storage.local.get(tempChapter, function (obj) {


        for (let i = 0; i < 3 ; i++) {
            var defaultIDName = 'default' + i;
            var row = document.getElementById(defaultIDName);
            var inputboxes = row.getElementsByTagName('input');

            for (let j = 0; j < inputboxes.length; j++) {
                if (inputboxes[j].type == 'number') {

                   // console.log('NUMBER: ' + obj[tempChapter[tempcount2]]);

                    var tempParse = parseInt(obj[tempChapter[tempcount2]]);
                  //  console.log('PARSING: ' + tempParse);
                    if (isNaN(tempParse)) {
                        inputboxes[j].value = 0;
                       // console.log(`GET Default Chapter in Undefined ${j}-: ` + obj[tempChapter[tempcount2]]);
                    }
                    else {
                        var number = tempParse;
                        inputboxes[j].value = number;
                        //console.log(`GET Default Chapter ${j}-: ` + obj[tempChapter[tempcount2]]);
                    }
                    tempcount2++;

                }
            }
        }
     //   console.log('\n');
       // console.log('\n');
    });
    tempcount2 = 0;
}


function savingAddOnRows()
{
    var titleObj = {};
    var urlObj = {};
    var chapterObj = {};

    for (let i = 0; i < LIMITAD; i++) {

        var chromeTitle = 'rowTitle' + i;
        var chromeURL = 'rowURL' + i;
        var chromeChapter = 'rowChap' + i;
        var defaultIDName = 'row' + i;
        var row = document.getElementById(defaultIDName);
        var inputboxes;

        let flag = true;
        try {
            inputboxes = row.getElementsByTagName('input');
        }
        catch (err) {
            flag = false;
        }

        if (flag == true)
        {
            if (inputboxes.length >= 1) {
                //default tables saving
                for (let j = 0; j < inputboxes.length; j++) {

                    var strInclude = inputboxes[j].name;

                    if (inputboxes[j].type == 'text' && strInclude.includes('titleAR')) {

                        titleObj[chromeTitle] = inputboxes[j].value;

                       // console.log(`Add-on Text-${chromeTitle}: ` + inputboxes[j].value + '\n');
                    }

                    if (inputboxes[j].type == 'text' && strInclude.includes('urlAR')) {

                        urlObj[chromeURL] = inputboxes[j].value;

                     //   console.log(`Add-on Text-${chromeURL}: ` + inputboxes[j].value + '\n');
                    }
                    if (inputboxes[j].type == 'number' && strInclude.includes('chapterAR')) {
                        chapterObj[chromeChapter] = inputboxes[j].value;

                      //  console.log(`Add-on Chapter-${chromeChapter}: ` + inputboxes[j].value + '\n');
                    }

                }
            }
            else {
               // console.log('This row does not exist yet: ' + defaultIDName);
            }
        }
        else {
            //console.log('Chapter Row is null: ' + defaultIDName);
        }
 

    }

  //  console.log(titleObj);
  //  console.log(urlObj);
  //  console.log(chapterObj);

    chrome.storage.local.set(titleObj, function () {/* console.log('===Add-On Title Data is saved===');*/ });
    chrome.storage.local.set(urlObj, function () {/* console.log('===Add-On URL Data is saved==='); */});
    chrome.storage.local.set(chapterObj, function () { /*console.log('===Add-On Chapter Data is saved==='); */});

    //console.log('\n');
}








function loadAddOnRows()
{
    var chromeTitle = 'rowTitle';
    var chromeURL = 'rowURL';
    var chromeChapter = 'rowChap';

    var tempTitle = [];
    var tempURL = [];
    var tempChapter = [];

    for (let i = 0; i < LIMITAD ; i++) {

        tempTitle[i] = chromeTitle + i;
        tempURL[i] = chromeURL + i;
        tempChapter[i] = chromeChapter + i;
    }

    var tempcount = 0;
    var tempcount1 = 0;
    var tempcount2 = 0;

    chrome.storage.local.get(tempTitle, function (obj) {

        for (let i = 0; i < LIMITAD; i++) {
            var defaultIDName = 'row' + i;
            var row = document.getElementById(defaultIDName);
            let inputboxes;
            let flag = true;
            try {
                inputboxes = row.getElementsByTagName('input');
            }
            catch (err) {
                flag = false;
                //console.log('Error : ' + err);

            }

            if (flag == true) {

                if (inputboxes.length >= 1) {
                    for (let j = 0; j < inputboxes.length; j++) {

                        var strInclude = inputboxes[j].name;
                        //console.log('strinclude title: ' + strInclude);
                        
                        if (inputboxes[j].type == 'text' && strInclude.includes('titleAR')) {

                           // console.log(`inputbox id title: ${tempcount}: ` + inputboxes[j].name);

                             
                                let string = inputboxes[j].name;
                                let num = string.match(/\d/g);
                                num = num.join("");

                                //console.log('num: ' + num + '     tempcount: ' + tempcount);
                                if (num != tempcount) {
                                    tempcount = num;
                                }
                            
                            if (obj[tempTitle[tempcount]] === undefined) {
                                inputboxes[j].value = '';
                               // console.log(`GET Title in Undefined ${tempcount}-: ` + obj[tempTitle[tempcount]]);
                              //  console.log('\n');
                            }
                            else {
                                var text = obj[tempTitle[tempcount]];
                                inputboxes[j].value = text;
                                inputboxes[j].title = text;
                               // console.log(`GET Title ${tempcount}-: ` + obj[tempTitle[tempcount]]);
                               // console.log('\n');
                            }
                            tempcount++;

                        }

                        
                    }

                }
                else {
                    //console.log('This row does not exist yet: ' + defaultIDName);
                }
            }
            else {
                //console.log('URL Row is null: ' + defaultIDName);
            }
        }
        //console.log('===title obj dat===')
       // console.log(obj);
       // console.log('\n');
    });

    tempcount = 0;

    chrome.storage.local.get(tempURL, function (obj) {

        for (let i = 0; i < LIMITAD ; i++) {
            var defaultIDName = 'row' + i;
            var row = document.getElementById(defaultIDName);
            let inputboxes;
            let flag = true;
            try {
                inputboxes = row.getElementsByTagName('input');
            }
            catch(err)
            {
                flag = false;
            }

            if(flag == true)
            {
                if (inputboxes.length >= 1) {
                    for (let j = 0; j < inputboxes.length; j++) {

                        var strInclude = inputboxes[j].name;
                        //console.log('strinclude url: ' + strInclude);

                        if (inputboxes[j].type == 'text' && strInclude.includes('urlAR')) {

                           // console.log(`inputbox id url: ${tempcount1}: ` + inputboxes[j].name);

                                let string = inputboxes[j].name;
                                let num = string.match(/\d/g);
                                num = num.join("");

                          //  console.log('num: ' + num + '     tempcount: ' + tempcount1);
                            if (num != tempcount1) {
                                tempcount1 = num;
                            }

                            if (obj[tempURL[tempcount1]] === undefined) {
                                inputboxes[j].value = '';
                             //   console.log(`GET URL in Undefined ${tempcount1}-: ` + obj[tempURL[tempcount1]]);
                               // console.log('\n');
                            }
                            else {
                                var text = obj[tempURL[tempcount1]];
                                inputboxes[j].value = text;
                              //  console.log(`GET URL ${tempcount1}-: ` + obj[tempURL[tempcount1]]);
                              //  console.log('\n');
                            }
                            tempcount1++;

                        }
                    }

                }
                else {
                    console.log('This row does not exist yet: ' + defaultIDName);
                }
            }
            else
            {
                //console.log('URL Row is null: ' + defaultIDName);
            }
        }
      //  console.log('===Url obj data===')
      //  console.log(obj);
      //  console.log('\n');
    });

    tempcount1 = 0;

    chrome.storage.local.get(tempChapter, function (obj) {


        for (let i = 0; i < LIMITAD; i++) {
            var defaultIDName = 'row' + i;
            var row = document.getElementById(defaultIDName);
            let inputboxes;
            let flag = true;
            try {
                inputboxes = row.getElementsByTagName('input');
            }
            catch (err) {
                flag = false;

            }
            if (flag == true)
            {
                if (inputboxes.length >= 1) {
                    for (let j = 0; j < inputboxes.length; j++) {

                        var strInclude = inputboxes[j].name;

                        if (inputboxes[j].type == 'number' && strInclude.includes('chapterAR')) {

                          //  console.log(`inputbox id chapter: ${tempcount2}: ` + inputboxes[j].name);

                                let string = inputboxes[j].name;
                                let num = string.match(/\d/g);
                                num = num.join("");

                           // console.log('num: ' + num + '     tempcount2: ' + tempcount2);
                            if (num != tempcount2) {
                                tempcount2 = num;
                            }

                           // console.log('NUMBER: ' + obj[tempChapter[tempcount2]]);

                            var tempParse = parseInt(obj[tempChapter[tempcount2]]);
                           // console.log('PARSING: ' + tempParse);
                            if (isNaN(tempParse)) {
                                inputboxes[j].value = 0;
                               // console.log(`GET chapter in Undefined ${tempcount2}-: ` + obj[tempChapter[tempcount2]]);
                              //  console.log('\n');
                            }
                            else {
                                var number = tempParse;
                                inputboxes[j].value = number;
                              //  console.log(`GET Chapter ${tempcount2}-: ` + obj[tempChapter[tempcount2]]);
                             //   console.log('\n');
                            }
                            tempcount2++;

                        }
                        
                    }

                }
                else {
                    //console.log('This row does not exist yet: ' + defaultIDName);
                }
            }
            else
            {
                //console.log('Chapter Row is null: ' + defaultIDName);
            }
        }

      //  console.log('===Chapter obj data===')
      //  console.log(obj);
      //  console.log('\n');
    });

    tempcount2 = 0;
}

function create_Links() {
    create_default_links();
    create_Addon_Links();
}

function create_default_links() {
    let table = document.getElementById("table-content");
    let inputboxes = table.getElementsByTagName("input");
    let links = table.getElementsByTagName('a');

    let title = [];
    let url = [];
    let chapterNum = [];

    let tempCount = 0
    let tempCount1 = 0;
    let tempCount2 = 0;

    for (let i = 0; i < inputboxes.length; i++) {

        if (inputboxes[i].type == 'text' && inputboxes[i].name == 'wnTitle') {

            title[tempCount] = inputboxes[i].value;
            tempCount++;
           // console.log(`title-: ` + inputboxes[i].value + '    :' + i);

        }

        if (inputboxes[i].type == 'text' && inputboxes[i].name == 'url') {

            url[tempCount1] = inputboxes[i].value;
            tempCount1++;
           // console.log(`url-: ` + inputboxes[i].value + '    :' + i);

        }
        if (inputboxes[i].type == 'number' && inputboxes[i].name == 'chapter') {
            chapterNum[tempCount2] = inputboxes[i].value;
            tempCount2++;
           // console.log(`chapter-: ` + inputboxes[i].value + '    :' + i);
          //  console.log('\n\n');

        }

    }

    let loopCount = 0;

    for (let i = 0; i < links.length; i++) {
        if (links[i].name == 'link') {

            let flag = false;
            var urlNum;
            if (url[loopCount] != '' && isURL(url[loopCount]) == true) {
                urlNum = getEndOfFullURL(url[loopCount]);
                flag = true
            }
            else {
                flag = false;
            }

            let newChapterNum = chapterNum[i];
            newChapterNum++;

            let replaceURL = url[loopCount];
            replaceURL = replaceURL.replace(urlNum, newChapterNum);
          //  console.log('replace URL old: ' + url[loopCount]);
          //  console.log('replace URL: ' + replaceURL);
          //  console.log('\n');

          //  console.log('flagger: ' + flag);
            if (isURL(replaceURL) == true && replaceURL != '' && flag == true) {
                links[i].text = title[i] + ' Chapter ' + newChapterNum;
                links[i].href = replaceURL.trim();
                links[i].target = '_blank';
                links[i].title = replaceURL;
                links[i].id = 'valid';
            }
            else {
                links[i].text = 'Enter a valid URL!';
                links[i].href = '#';
                links[i].title = 'Enter a valid URL!';
                links[i].id = 'notvalid';
            }

            loopCount++

            if (loopCount > 3) {
                loopCount = 0;
            }

        }
    }
}

function create_Addon_Links() {

    let table = document.getElementById("table-content");
    let inputboxes = table.getElementsByTagName("input");
    let links = table.getElementsByTagName('a');

    let title = [];
    let url = [];
    let chapterNum = [];

    let tempCount = 0
    let tempCount1 = 0;
    let tempCount2 = 0;

    for (let i = 0; i < inputboxes.length; i++) {



        if (inputboxes[i].type == 'text' && inputboxes[i].name == 'titleAR' + tempCount) {

            title[tempCount] = inputboxes[i].value;
            tempCount++;
          //  console.log(`titleAR-: ` + inputboxes[i].value + '    :' + i);

        }

        if (inputboxes[i].type == 'text' && inputboxes[i].name == 'urlAR' + tempCount1) {

            url[tempCount1] = inputboxes[i].value;
            tempCount1++;
          //  console.log(`urlAR-: ` + inputboxes[i].value + '    :' + i);

        }
        if (inputboxes[i].type == 'number' && inputboxes[i].name == 'chapterAR' + tempCount2) {
            chapterNum[tempCount2] = inputboxes[i].value;
            tempCount2++;
           // console.log(`chapter-: ` + inputboxes[i].value + '    :' + i);
          //  console.log('\n\n');

        }

    }

    let loopCount = 0;
    for (let i = 0; i < links.length; i++) {
        if (links[i].name == 'linkAR' + loopCount) {

            var urlNum;
            if (url[loopCount] != '') {
                urlNum = getEndOfFullURL(url[loopCount]);
            }
            let newChapterNum = chapterNum[loopCount];
           // console.log('chapternum: ' + chapterNum[loopCount]);
            newChapterNum++;

            let replaceURL = url[loopCount];
           // console.log('newchapternumber: ' + newChapterNum);
          //  console.log('chapterNum: ' + chapterNum[loopCount]);
            replaceURL = replaceURL.replace(urlNum, newChapterNum);
          //  console.log('replace URLAR old: ' + url[loopCount]);
          //  console.log('replace URLAR: ' + replaceURL);
          //  console.log('\n');



            if (isURL(replaceURL) == true && replaceURL != '') {
                links[i].text = title[loopCount] + ' Chapter ' + newChapterNum;
                links[i].href = replaceURL.trim();
                links[i].target = '_blank';
                links[i].title = replaceURL;
                links[i].id = 'valid';
            }
            else {
                links[i].text = 'Enter a valid URL!';
                links[i].href = '#';
                links[i].title = 'Enter a valid URL!';
                links[i].id = 'notvalid';
            }

            loopCount++

            if (loopCount > links.length) {
                loopCount = 0;
            }

        }
    }

}

//check if url is real
var elm;
function isURL(url) {
    if (!elm) {
        elm = document.createElement('input');
        elm.setAttribute('type', 'url');
    }
    elm.value = url;
    return elm.validity.valid;
}

function getEndOfFullURL(url, flag) {
    var string;
    if (url.slice(-1) == "/") {
        let tempString = url.substring(0, url.length - 1);
        string = tempString.substr(tempString.lastIndexOf("/"));
    }
    else {
        string = url.substr(url.lastIndexOf("/"));
    }

    let num = string.replace(/\D/g, "");
    return num;
}