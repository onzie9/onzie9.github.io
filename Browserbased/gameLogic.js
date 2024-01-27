    let currentPromptIndex = 0;
                    // This is going to be populated on each question.
                    var rowValues = null;
                    var currentNodeValue = null;

                    const image_source = [
                        '/images/Tier1.jpeg',
                        '/images/Tier5.jpeg',
                        '/images/Tier6.jpeg'
                    ]
                    
                        const prompts = [
                            "Get ready for the Vegan Life Challenge!",
                            "Your journey begins now...",
                            "Now, let's ask a question...",
                            // Add more prompts as needed
                        ];


                        function startGame() {
                            document.getElementById('level2-container').style.display = 'block';
                            document.getElementById('start-button').style.display = 'none';
                            document.getElementById('image-box').style.display = 'none';
                            displayScenario('Tier0.1');
                        }

                        function displayScenario(nodeName) {
                            // Set current Value Node first.
                            currentNodeValue = nodeName;

                            const promptElement = document.getElementById('typewriter-prompt');
                            promptElement.innerHTML = '';
                            //document.getElementById('image-box').src = image_source[currentPromptIndex];
                            
                            rowValues = findRowByText(currentNodeValue, sheet1Values);

                            // Show Tier Overall Text on Top of the Level
                            const tierOverallPromptElement = document.getElementById('tier-overall');
                            topTextRowValue = findRowByText(currentNodeValue, sheetTopTextValues);
                            //assert(topTextRowValue == null, 'Some Problem in TopText Sheet');
                            tierOverallPromptElement.innerHTML = topTextRowValue[1];

                            //const currentPrompt = prompts[currentPromptIndex];
                            const currentPrompt = rowValues[1];

                            showThePrompt(promptElement, currentPrompt);
                            
                            // Show options 
                            showOptionText(1, 4);
                            showOptionText(2, 6);
                            showOptionText(3, 8);
                            showOptionText(4, 10);
                            
                            currentPromptIndex++;
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

                            showModal(cutText);
                            //alert(cutText);

                            // After handling the option, display the next prompt
                            displayScenario(neighborNode);
                        }
                        
                        function showThePrompt(htmlElement, textToType){
                                let index = 0;
                                
                                function typeWriter(){
                                    if (index < textToType.length) {
                                        htmlElement.innerHTML += textToType.charAt(index);
                                        index++;
                                        setTimeout(typeWriter, 50);
                                    }
                                }
                                
                                typeWriter();
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
                        setTimeout(function(){
                            $('#exampleModal').modal('hide');
                        }, 5000);
                        };