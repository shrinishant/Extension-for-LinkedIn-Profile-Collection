var start;
var counter;
var end;
var signal;

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

    const scroll_to_btm = () => {
        window.scrollTo(0, document.body.scrollHeight);

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            signal = true;
            clearInterval(scroll_to_btm);
        }

    };

    setInterval(scroll_to_btm, 500);

    const doing_work = setInterval(() => {
        if(signal){
            if(counter <= end){

                var profile = [];
        
                let name_tags = document.getElementsByClassName('entity-result__title-text');
        
                for(let i=0; i<name_tags.length; i++){
                    profile.push(name_tags[i].firstElementChild.firstElementChild.firstElementChild.innerText);
                }

                document.getElementsByClassName('artdeco-pagination__button--next')[0].click();

                console.log("clicked");
                console.log(start, counter, end);
                signal = false;

                for(let a=0; a<profile.length; a++){
                    console.log(profile[a]);
                }

                counter = counter + 1;

                setInterval(scroll_to_btm);
                    
            }
        
            if (counter > end) {
                console.log("clearing the interval");
                signal = false;
                clearInterval(doing_work);
            }
        
            console.log("\n");
        }
    }, 500);
};