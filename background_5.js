var start;
var counter;
var end;
var signal;
var done = false;

var profile = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

        if (request.go == "true"){
            start = request.start;
            end = request.end;
            counter = start;

            just_start();
            sendResponse({farewell: "goodbye"});
        }
});

function just_start(){

    do {
        var current_page = document.getElementsByClassName("artdeco-pagination__indicator--number active");
        var pages = document.getElementsByClassName("artdeco-pagination__indicator--number");

        if(String(current_page[0].innerText) !== String(start)){
            for(let t=0; t<pages.length; t++){
                if(String(pages[t].innerText) === String(start)){
                    pages[t].firstElementChild.click();
                    good_to_go = true;
                }
            }
        }
    } while (false);

    if(start <= end){
        const doing_work = () => {
            if(signal){
                if(counter <= end){
            
                    let name_tags = document.getElementsByClassName('entity-result__title-text');
            
                    for(let i=0; i<name_tags.length; i++){
                        profile.push(name_tags[i].firstElementChild.firstElementChild.firstElementChild.innerText);
                    }
    
                    try {
                        document.getElementsByClassName('artdeco-pagination__button--next')[0].click();   
                    } catch (error) {
                        
                    }
    
                    // console.log("clicked");
                    // console.log(start, counter, end);
                    signal = false;
    
                    for(let a=0; a<profile.length; a++){
                        console.log(profile[a]);
                    }
    
                    counter = counter + 1;
    
                    setInterval(scroll_to_btm);
                        
                }
            
                if (counter > end) {
                    // console.log("clearing the interval");
                    signal = false;
                    clearInterval(doing_work);
                    clearInterval(scroll_to_btm);
                }
            
                console.log("\n");
            }
        };
    
        const scroll_to_btm = () => {
            window.scrollTo(0, document.body.scrollHeight);
    
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && done === false) {
                signal = true;
                
                clearInterval(scroll_to_btm);
                setInterval(doing_work, 500);
            }
    
        };
    
        setInterval(scroll_to_btm, 500);
    }else{
        alert("Please Enter valid starting and ending page !!!");
    }
};