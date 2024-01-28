
                        // This is going to be populated on each question.
                        var rowValues = null;
                        var currentNodeValue = null;
                        
                            const prompts = [
                                "Get ready for the Vegan Life Challenge!",
                                "Your journey begins now...",
                                "Now, let's ask a question...",
                                // Add more prompts as needed
                            ];


                            function startGame() {
                                document.getElementById('level2-container').style.display = 'inline';
                                document.getElementById('start-button').style.display = 'none';
                                if(document.getElementById('image-box')){
                                    document.getElementById('image-box').style.display = 'inline';
                                }
                                displayScenario('Tier0.1');
                            }

                            function displayScenario(nodeName) {
                                // Hide the options table first
                                document.getElementById('optionsTable').style.display = 'none';
                                // Set current Value Node first.
                                currentNodeValue = nodeName;

                                const promptElement = document.getElementById('typewriter-prompt');
                                promptElement.innerHTML = '';
                                
                                rowValues = findRowByText(currentNodeValue, sheet1Values);

                                // Show Tier Overall Text on Top of the Level
                                const tierOverallPromptElement = document.getElementById('tier-overall');
                                topTextRowValue = findRowByText(currentNodeValue, sheetTopTextValues);
                                //assert(topTextRowValue == null, 'Some Problem in TopText Sheet');
                                tierOverallPromptElement.innerHTML = topTextRowValue[1];

                                // Change the Top Image
                                if(document.getElementById('image-box')){
                                    image_path = '/images/' + topTextRowValue[2];
                                    document.getElementById('image-box').src = image_path;
                                }

                                const currentPrompt = rowValues[1];

                                let delayedPromise = showThePrompt(promptElement, currentPrompt);
                                
                                // Show options after prompt is displayed fully
                                delayedPromise.then(()=>{ 
                                    // Show the options table
                                    document.getElementById('optionsTable').style.display = 'inline';
                                    showOptionText(1, 4);
                                    showOptionText(2, 6);
                                    showOptionText(3, 8);
                                    showOptionText(4, 10);
                                });                                
                            }

                            function chooseOptionBtnClick(OptionNum) {
                                // Handle the logic for each option
                                // For example, update the image, change the prompt, etc.
                                
                                var optionTextId = 'option' + OptionNum;
                                var htmlElement = document.getElementById(optionTextId);
                                
                                var neighborNode = htmlElement.getAttribute("neighborNode")

                                // Before we go to next scenario, based on current scenario and the option chosen, we should show a text - funny one.
                                // This data is being taken from sheet named - cutText. This data is already stored in a global variable 
                                // while starting the game.
                                var cutTextValueRow = findRowByText(currentNodeValue, sheetCutTextsValues);
                                var cutText = cutTextValueRow[OptionNum];

                                let modalDonePromise = showModal(cutText);

                                // After handling the option, proceed to next scenario
                                modalDonePromise.then(()=>
                                    displayScenario(neighborNode));
                            }
                            
                            function showThePrompt(htmlElement, textToType){
                                    let index = 0;
                                    return new Promise((resolve, reject) => {
                                        if(textToType == null || textToType.length == 0){
                                            // A safety check. Resolve and move ahead
                                            resolve();
                                        }
                                        function typeWriter(){
                                            if (index < textToType.length) {
                                                htmlElement.innerHTML += textToType.charAt(index);
                                                index++;
                                                setTimeout(typeWriter, 40);
                                            }
                                            else{
                                                resolve();
                                            }
                                        }
                                    typeWriter();
                                    })
                            }
                                
                            function showOptionText(OptionNum, columnIndexNum){
                                var optionTextId = 'option' + OptionNum;
                                var htmlElement = document.getElementById(optionTextId);
                                var newHTML = rowValues[columnIndexNum];
                                //newHTML = newHTML.replace('placeholder',rowValues[columnIndexNum]);
                                htmlElement.innerHTML = newHTML;
                                
                                // set the neighbour attribute on option, so as to access it once we click on choose button
                                htmlElement.setAttribute("neighborNode", rowValues[columnIndexNum+1])
                            }

                            // Showing popups in between
                            function showModal(messageToShow){
                                $('#exampleModal').modal('show');
                                $('#modal-body-id')[0].innerHTML = messageToShow;
                                
                                // Set a timeout to close the modal after 3 seconds (adjust the time as needed)
                                return new Promise((resolve, reject) => {
                                    setTimeout(function(){
                                        $('#exampleModal').modal('hide');
                                        resolve();
                                    }, 4000);
                                });
                                
                            };