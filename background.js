// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.eventbrite.sg'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log(msg);
  chrome.alarms.clearAll();
  chrome.alarms.create("refresh", { when: msg.time + 100 });

  chrome.storage.sync.set({alarm: msg.rawTime}, function() {
    console.log(msg.rawTime)
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(Date(), 'alarm triggered');
  var queryInfo = {
    'url': 'https://www.eventbrite.sg/e/*'
  };

  chrome.tabs.query(queryInfo, function (results) {
    console.log(results);
    for (var r of results) {  
        chrome.tabs.reload(r.id, {bypassCache: true});
    }
  });

  chrome.storage.sync.set({alarm: null}, function() {
    console.log("alarm reset");
  });
});

