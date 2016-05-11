/**
 * Created by lamppostgroup on 2/15/16.
 */

attributeFunction = function () {
    console.log('button clicked');
    var divMain = document.getElementById('attributeDiv');
    var div = document.createElement('DIV');
    div.setAttribute('id', 'addedAttributes');

    var inputValue = document.createElement('INPUT');
    var inputKey = document.createElement('INPUT');
    inputKey.setAttribute('id', 'addedInput');
    inputKey.setAttribute('type', 'text');
    inputKey.setAttribute('name', 'attributesName');
    inputKey.setAttribute('placeholder', 'key');

    inputValue.setAttribute('id', 'addedInput');
    inputValue.setAttribute('name', 'attributesValue');
    inputValue.setAttribute('type', 'text');
    inputValue.setAttribute('placeholder', 'value');

    div.appendChild(inputKey);
    div.appendChild(inputValue);
    divMain.appendChild(div);

    var signButton = document.getElementById('attributeErr');
    signButton.insertBefore(divMain, signButton.childNodes[0]);
    //  signButton.insertBefore(div, signButton.childNodes[0]);

};
deleteAttribute = function () {
    console.log('delete shit button');
    var child = document.getElementById('addedAttributes');
    child.parentNode.removeChild(child);

};
