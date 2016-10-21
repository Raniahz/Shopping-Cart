/**
 * Created by lamppostgroup on 2/15/16.
 */
var i = 0;
attributeFunction = function () {
    console.log('button clicked');
    var divMain = document.getElementById('attributeDiv');
    var span = document.createElement('SPAN');
    function increment() {
        i++;
    }

    var inputValue = document.createElement('INPUT');
    var inputKey = document.createElement('INPUT');
    var button = document.createElement('INPUT');
    increment();
    span.setAttribute('id', 'id' + i);

    inputKey.setAttribute('id', 'addedInput');
    inputKey.setAttribute('type', 'text');
    inputKey.setAttribute('name', 'attributesName');
    inputKey.setAttribute('placeholder', 'key');

    inputValue.setAttribute('id', 'addedInput');
    inputValue.setAttribute('name', 'attributesValue');
    inputValue.setAttribute('type', 'text');
    inputValue.setAttribute('placeholder', 'value');

    button.setAttribute('type', 'button');
    button.setAttribute('onclick', 'deleteAttribute(\"id' + i + '\")');
    button.setAttribute('value', '-');
    button.setAttribute('class', 'removeField');

    span.appendChild(inputKey);
    span.appendChild(inputValue);
    span.appendChild(button);

   divMain.appendChild(span);

    var signButton = document.getElementById('attributeErr');
    signButton.insertBefore(divMain, signButton.childNodes[0]);

};
deleteAttribute = function (id) {
    console.log('delete shit button');
    console.log(id);
    var child = document.getElementById(id);
    if(child){
        child.remove();
    }
};

