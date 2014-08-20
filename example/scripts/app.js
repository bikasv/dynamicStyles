/* global dynamicStyle */
(function () {
    "use strict";

    var styles = [
        {path: "styles/bootstrap.min.css"},
        {path: "styles/common.css"},
        {path: "styles/red.css", title: "red"},
        {path: "styles/blue.css", title: "blue"},
        {path: "styles/green.css", title: "green"},
        {path: "styles/brown.css", title: "brown"},
    ];

    dynamicStyle.init(styles);
    if(!dynamicStyle.getStoredStyle().exists) {
        dynamicStyle.setStyle("green");
    }

    var blueButton = document.getElementById("blue");
    blueButton.addEventListener("click", function() {
        dynamicStyle.setStyle("blue");
    });

    var redButton = document.getElementById("red");
    redButton.addEventListener("click", function() {
        dynamicStyle.setStyle("red");
    });

    var cycleButton = document.getElementById("cycle");
    cycleButton.addEventListener("click", function() {
        dynamicStyle.cycleStyle();
    });

    var removeButton = document.getElementById("remove");
    removeButton.addEventListener("click", function() {
        dynamicStyle.removeStyle("green");
    });

    var removeLButton = document.getElementById("removel");
    removeLButton.addEventListener("click", function() {
        dynamicStyle.removeStoredStyle();
    });

    var getButton = document.getElementById("get");
    getButton.addEventListener("click", function() {
        var style = dynamicStyle.getCurrentStyle();
        alert(style.title);
    });

    var addButton = document.getElementById("add");
    addButton.addEventListener("click", function() {
        var style = {path: "styles/black.css", title: "black"};
        dynamicStyle.addStyle(style);
    });
} ());