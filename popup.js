'use strict';
let alarm = document.getElementById('alarm');

document.getElementById('confirm').onclick = function(e) {
    var now = new Date();
    var timeSelected = document.getElementById("time").value;
    var setTime = timeSelected.split(':');
    var alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), setTime[0], setTime[1]);
    alarmTime = alarmTime.getTime();
    chrome.runtime.sendMessage({ time: alarmTime, rawTime: timeSelected });
    alarm.textContent = timeSelected;
};


chrome.storage.sync.get('alarm', function(data) {
    if (data.alarm) {
        alarm.textContent = data.alarm;
    } else {
        alarm.textContent = "not set";
    }
});