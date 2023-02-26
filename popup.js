document.getElementById("normalMSG").addEventListener('click', normalMSG);
document.getElementById("woMSG").addEventListener('click', woMSG);
document.getElementById("copy").addEventListener('click', copy);
let textarea = document.getElementById("textarea");

// Get the signature
function onError(error) {
    console.log(`Error: ${error}`); 
  }
function onGot(item) {
      signature = item.signature;
    }
const getting = browser.storage.sync.get("signature");
getting.then(onGot, onError);

// Get the itmes from the DOM
function modifyDOM() {
    let result = [];

    // Get the resident information
    let resident = document.getElementById("resinfodiv").innerHTML;
    let firstReplace = resident.replace(/<br>/g, "$");
    let firstSplit = firstReplace.split('$');

    // Get the property name 
    let propertyTemp = firstSplit[3];
    let propertySplit = propertyTemp.split(':');
    let property = propertySplit[1].substring(5);
    result.push(property);

    // Get the Unit
    let unitTemp = firstSplit[4];
    let unitSplit = unitTemp.split(':');
    let unit = unitSplit[1].substring(5);
    result.push(unit);

    // Get the Address
    let address = firstSplit[5];
    result.push(address);

    // Get WO number if a WO page is opened
    let woItem = document.getElementById("WOTB");
    if (woItem != undefined){
        let wo = woItem.value;
        result.push(wo);
    }
    else {
        result.push("noWO");
    }

    // Get problem description last update
    let desription = document.getElementById("ProblemDescription");
    if (desription != null) {
    let dValue = desription.value;
    let startDesription = dValue.indexOf("CST");
    let endDesription = dValue.indexOf("CGhiran");
        if (startDesription === -1){
            let tempText1 = dValue.substring(0,endDesription);
            result.push(tempText1);
        }
        else {
            let tempText = dValue.substring(startDesription + 5,endDesription);
            result.push(tempText);
        }
    }
    else result.push("noText");
  
    return result;
}

function normalMSG () {
    //We have permission to access the activeTab, so we can call browser.tabs.executeScript:
    browser.tabs.executeScript({
        code: '(' + modifyDOM + ') ();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        if (results !== undefined) {
            if (results[0][3] == "noWO"){
                textarea.innerHTML = " ";
                let text = document.createElement('p');
                var textContent =`
Address: (${results[0][0]}), Unit: ${results[0][1]}, ${results[0][2]}.
Reason for calling: 
Please call back ASAP. Agent actions: offered to send a message.
${signature}`;
                text.innerHTML = textContent;
                textarea.append(textContent);
            }

            else if (results[0][3] != "noWO") {
                textarea.innerHTML = " ";
                let text = document.createElement('p');
                var textContent = `

            !!! You have a WO page opened !!!
                        


                            Use this option instead
                                        I
                                        I
                                        I
                                        I
                                        V
                    `;
                text.innerHTML = textContent;
                textarea.append(textContent);
        }
        }

        else {
            textarea.innerHTML = " ";
            let text = document.createElement('p');
            var textContent = `


                !!! Nothing to see here !!!
                        
                          (✖╭╮✖)
        
  
            Please switch to the resident's page !
                    `;
                text.innerHTML = textContent;
                textarea.append(textContent);
        }
    });
};

function woMSG () {
    //We have permission to access the activeTab, so we can call browser.tabs.executeScript:
    browser.tabs.executeScript({
        code: '(' + modifyDOM + ') ();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        if (results !== undefined) {
            if (results[0][3] != "noWO"){
                let findDuplicate = results[0][4].indexOf("DUPLICATE");
                let findRepeat = results[0][4].indexOf("Repeat");
                if (findDuplicate == 0) {
                    textarea.innerHTML = " ";
                    let text = document.createElement('p');
                    var textContent =`
Address: (${results[0][0]}), Unit: ${results[0][1]}, ${results[0][2]}.
Reason for email: Received WO ${results[0][3]}: ${results[0][4]}
Agent actions: Sent email reply that onsite will follow up and updated WO. 
${signature}`;
                    text.innerHTML = textContent;
                    textarea.append(textContent);
                }
                else if (findRepeat == 0) {
                    textarea.innerHTML = " ";
                    let text = document.createElement('p');
                    var textContent =`
Address: (${results[0][0]}), Unit: ${results[0][1]}, ${results[0][2]}. 
Reason for calling: In reference to WO ${results[0][3]}: ${results[0][4]}
Agent actions: submitted and scheduled WO.
${signature}`;
                    text.innerHTML = textContent;
                    textarea.append(textContent);
                }
                else {
                    textarea.innerHTML = " ";
                    let text = document.createElement('p');
                    var textContent =`
Address: (${results[0][0]}), Unit: ${results[0][1]}, ${results[0][2]}.
Reason for calling: In reference to WO ${results[0][3]}: ${results[0][4]}
Please call back ASAP. Agent actions: offered to send a message.
${signature}`;
                    text.innerHTML = textContent;
                    textarea.append(textContent);
                }
            }
            else if (results[0][3] == "noWO") {
                textarea.innerHTML = " ";
                let text = document.createElement('p');
                var textContent = `

            !!! You have a RESIDENT page opened !!!
                        


    Use this option instead
               I
               I
               I
               I
               V
                    `;
                text.innerHTML = textContent;
                textarea.append(textContent);
        }
        }
        else {
            textarea.innerHTML = " ";
            let text = document.createElement('p');
            var textContent = `


                !!! Nothing to see here !!!
                        
                          (✖╭╮✖)
        
  
            Please switch to the resident's page !
                    `;
                text.innerHTML = textContent;
                textarea.append(textContent);
        }
    });
}

function copy(){
  let copyText = document.getElementById("textarea");
  copyText.select();
  let trimText = copyText.value.trim();
  navigator.clipboard.writeText(trimText);
}

