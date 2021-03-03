// Click on first level green Register btn
var id = document.querySelector('[id^="eventbrite-widget-modal-trigger-"]').id;
var btn = document.getElementById(id);
// console.log(btn);
btn.click();

// Click on the orange register button in the modal opened
const interval = setInterval(function() {
    var nodes = document.querySelectorAll('[id^="eventbrite-widget-modal-"]');
    for (node of nodes) {
        // console.log(node)
        if (node.contentWindow) {
            // console.log(node.contentWindow)
            var btn = node.contentWindow.document.getElementsByClassName('eds-btn--fill')[0];
            // console.log(btn);
            if (btn) {
                btn.click();
                clearInterval(interval);
            }
        }
    }    
    
}, 100);

setTimeout(function() {
    clearInterval(interval);
}, 15000);