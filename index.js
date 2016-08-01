var tabs = require("sdk/tabs");
var windows = require("sdk/windows").browserWindows;
var seenURLs = {};


function onOpen(tab) {
  console.log(tab.url + " -- open -- ", tab.id, " -- ", Date.now() );
  tab.on("pageshow", logShow);
  //tab.on("load", logLoading);
  //tab.on("ready", logReady);
  tab.on("activate", logActivate);
  tab.on("deactivate", logDeactivate);
  tab.on("close", logClose);
}

// TODO:
// close first tab!!
// If we want to turn off bfcache change Browser.sessionhistory.max_total_viewers to 0
// http caching via browser.cache.memory.enable and browser.cache.disk.enable

function logShow(tab) {

  if (seenURLs[tab.title] === tab.url){
    // seenURLs[tab.title] exists. do stuff.
    console.log(tab.url + " -- load -- ", tab.id, " -- ", Date.now(), "Yes");
  } else {
    // seenURLs[tab.title] does not exist
    seenURLs[tab.title] = tab.url;
    console.log(tab.url + " -- load -- ", tab.id, " -- ", Date.now(), "No");
  }
}

function logLoading(tab) {
  console.log(tab.url + " -- load -- ", tab.id, " -- ", Date.now() );
}

function logReady(tab) {
  console.log(tab.url + " -- ready -- ", tab.id, " -- ", Date.now() );
}

function logActivate(tab) {
  console.log(tab.url + " -- activated -- ", tab.id, " -- ", Date.now() );
}

function logDeactivate(tab) {
  console.log(tab.url + " -- deactivated -- ", tab.id, " -- ", Date.now() );
}

function logClose(tab) {
  console.log(tab.url + " -- closed -- ", tab.id, " -- ", Date.now() );
}

//function pageShown(event) {
//    if (event.persisted)
//        console.log(event);
        //console.log("pageshow event handler called.  The page was just restored from the Page Cache.");
//    else
        //console.log("pageshow event handler called for the initial load.  This is the same as the load event.");
//        console.log(event);
//}


//// -----------

console.log('URL -- Action Type -- Tab ID -- Time -- Previously Visited?')

tabs.on('open', onOpen);

tabs.open("about:blank");

tabs[0].close();
