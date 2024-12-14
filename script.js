// import { rewriteContent } from './chatgpt.js';  // Adjust path as necessary

window.onload = function () {
    const checkbox = document.getElementById("light");
    if (checkbox.checked) {
        darkntMode();
    }
    // check if browser is in light mode
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        darkntMode();
    }
};

function darkntMode() {
    let element = document.body;
    element.classList.toggle("darknt");
    // transition: background-color 0.5s ease;
    element.style.transition = "background-color 0.5s ease";
    element.style.transition = "color 0.5s ease";
}

// 


const util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem);
			}
			if (!util.f.isArray(prop)) {
				prop = [prop];
				val = [val];
			}
			if (typeof vendors !== "undefined" && !util.f.isArray(vendors)) {
				vendors = vendors.toLowerCase() == "all" ? ["webkit", "moz", "ms", "o"] : [vendors];
			}
			prop.forEach((thisProp, i) => {
				thisProp = String(thisProp);
				const thisVal = String(val[i]);
				if (vendors) {
					vendors.forEach(vendor => {
						elem.style[vendor + thisProp] = thisVal;
					});
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1);
				elem.style[thisProp] = thisVal;
			});
		},
		cssLoaded: function (event) {
			let child = util.f.gettrg(event)
			child.setAttribute("media", "all")
		},
		events: {
			cancel: function (event) {
				util.f.events.prevent(event)
				util.f.events.stop(event)
			},
			prevent: function (event) {
				event = event || window.event
				event.preventDefault()
			},
			stop: function (event) {
				event = event || window.event
				event.stopPropagation()
			}
		},
		getSize: function (elem, prop) {
			return parseInt(elem.getBoundingClientRect()[prop], 10)
		},
		gettrg: function (event) {
			event = event || window.event
			if (event.srcElement) {
				return event.srcElement
			} else {
				return event.target
			}
		},
		isElem: function (elem) {
			return (util.f.isNode(elem) && elem.nodeType == 1)
		},
		isArray: function(v) {
			return (v.constructor === Array)
		},
		isNode: function(elem) {
			return (typeof Node === "object" ? elem instanceof Node : elem && typeof elem === "object" && typeof elem.nodeType === "number" && typeof elem.nodeName==="string" && elem.nodeType !== 3)
		},
		isObj: function (v) {
			return (typeof v == "object")
		},
		replaceAt: function(str, index, char) {
			return str.substr(0, index) + char + str.substr(index + char.length);
		}
	}
},

form = {
f: {
	init: {
		register: function () {
			let child, children = document.getElementsByClassName("field"), i
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.addStyle(child, "opacity", 1)
			}
			children = document.getElementsByClassName("psuedo_select")
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				child.addEventListener("click", form.f.select.toggle)
			}
		},
		unregister: function () {
			//just here as a formallity
			//call this to stop all ongoing timeouts are ready the page for some sort of json re-route
		}
	},
	select: {
		blur: function (field) {
			field.classList.remove("focused");
			let children = field.childNodes;
			for (const element of children) {
				let child = element;
				if (util.f.isElem(child)) {
					this.handleChildBlur(child, field);
				}
			}
		},	

		handleChildBlur: function (child, field) {
			if (child.classList.contains("deselect")) {
				child.parentNode.removeChild(child);
			} else if (child.tagName == "SPAN") {
				this.handleSpanBlur(child, field);
			} else if (child.classList.contains("psuedo_select")) {
				this.handlePsuedoSelectBlur(child, field);
			}
		},

		handleSpanBlur: function (child, field) {
			if (!field.dataset.value) {
				util.f.addStyle(child, ["fontSize", "Top"], ["16px", "32px"]);
			}
		},

		handlePsuedoSelectBlur: function (child, field) {
			let nested_children = child.childNodes;
			for (const element of nested_children) {
				let nested_child = element;
				if (util.f.isElem(nested_child)) {
					this.handleNestedChildBlur(nested_child, field);
				}
			}
		},

		handleNestedChildBlur: function (nested_child, field) {
			if (nested_child.tagName == "SPAN") {
				if (!field.dataset.value) {
					util.f.addStyle(nested_child, ["opacity", "transform"], [0, "translateY(24px)"]);
				}
			} else if (nested_child.tagName == "UL") {
				util.f.addStyle(nested_child, ["height", "opacity"], [0, 0]);
			}
		},
		focus: function (field) {
			field.classList.add("focused");
			this.addDeselectElement(field);
			this.expandPsuedoSelect(field);
		},

		addDeselectElement: function (field) {
			let bool = false;
			const children = field.childNodes;
			for (const child of children) {
				if (util.f.isElem(child) && child.classList.contains("deselect")) {
					bool = true;
					break;
				}
			}
			if (!bool) {
				const child = document.createElement("div");
				child.className = "deselect";
				child.addEventListener("click", form.f.select.toggle);
				field.insertBefore(child, children[0]);
			}
		},

		expandPsuedoSelect: function (field) {
			const children = field.childNodes;
			for (const child of children) {
				if (util.f.isElem(child) && child.classList.contains("psuedo_select")) {
					this.expandNestedChildren(child);
				}
			}
		},

		expandNestedChildren: function (child) {
			const nested_children = child.childNodes;
			for (const nested_child of nested_children) {
				if (util.f.isElem(nested_child) && nested_child.tagName == "UL") {
					this.expandNestedNestedChildren(nested_child);
				}
			}
		},

		expandNestedNestedChildren: function (nested_child) {
			const nested_nested_children = nested_child.childNodes;
			let size = 0;
			for (const nested_nested_child of nested_nested_children) {
				if (util.f.isElem(nested_nested_child) && nested_nested_child.tagName == "LI") {
					size += util.f.getSize(nested_nested_child, "height");
				}
			}
			util.f.addStyle(nested_child, ["height", "opacity"], [size + "px", 1]);
		},
		selection: function (child, parent) {
			if (util.f.isElem(child) && util.f.isElem(parent)) {
				parent.dataset.value = child.dataset.value;
				const value = child.innerHTML;
				this.updateChildren(parent.childNodes, value);
			}
		},



		updateChildren: function (children, value) {
			for (const child of children) {
				if (util.f.isElem(child)) {
					if (child.classList.contains("psuedo_select")) {
						this.updateNestedChildren(child.childNodes, value);
					} else if (child.tagName == "SPAN") {
						util.f.addStyle(child, ["fontSize", "top"], ["12px", "8px"]);
						util.f.addStyle(child, ["color"], ["#666666"]);
						// translateX(-10px)
						util.f.addStyle(child, ["transform"], ["translateX(-12px)"]);
					}
				}
			}
		},

		updateNestedChildren: function (nested_children, value) {
			let time = 0;
			for (const nested_child of nested_children) {
				if (util.f.isElem(nested_child) && nested_child.classList.contains("selected")) {
					if (nested_child.innerHTML) {
						time = 1E2;
						util.f.addStyle(nested_child, ["opacity", "transform"], [0, "translateY(24px)"], "all");
					}
					setTimeout(function (c, v) {
						c.innerHTML = v;
						util.f.addStyle(c, ["opacity", "transform", "transitionDuration"], [1, "translateY(0px)", ".1s"], "all");
					}, time, nested_child, value);
				}
			}
		},
		toggle: function (event) {
			util.f.events.stop(event)
			let child = util.f.gettrg(event), parent
			switch (true) {
				case (child.classList.contains("psuedo_select")):
				case (child.classList.contains("deselect")):
					parent = child.parentNode
					break
				case (child.classList.contains("options")):
					parent = child.parentNode.parentNode
					break
				case (child.classList.contains("option")):
					parent = child.parentNode.parentNode.parentNode
					form.f.select.selection(child, parent)
					break
			}
			parent.classList.contains("focused") ? form.f.select.blur(parent) : form.f.select.focus(parent)
		}  
	}
}}
window.onload = form.f.init.register

// 

getData(null, null, null, null, null) // Fetch all data initially
    .then(data => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.classList.add('wrapper');

        // Set up event listeners on the dropdowns to trigger content rendering
        document.querySelector('#img_category_discipline').addEventListener('click', handleSelectionChange);
        document.querySelector('#img_category_knowledge').addEventListener('click', handleSelectionChange);	

        function handleSelectionChange() {
            const selectedDiscipline = document.querySelector('#img_category_discipline .selected')?.getAttribute('data-value');
            const selectedKnowledge = document.querySelector('#img_category_knowledge .selected')?.getAttribute('data-value');

            // Only render content when both selections are made
            if (selectedDiscipline && selectedKnowledge) {
                renderContent(selectedDiscipline, selectedKnowledge);
            }


        }

		function renderContent(selectedDiscipline, selectedKnowledge) {
			// Clear existing content
			contentContainer.innerHTML = '';
		
			// Fetch and filter data dynamically based on selected values
			getData(selectedDiscipline, selectedKnowledge, null, null)
				.then(filteredData => {
					// Group filtered data by category and section
					const groupedData = {};
					filteredData.forEach(item => {
						if (!groupedData[item.category]) {
							groupedData[item.category] = [];
						}
						groupedData[item.category].push(item);
					});
		
					// Create tabs for categories
					const tabWrapper = document.createElement('div');
					tabWrapper.classList.add('tabs-wrapper');
		
					let categoryIndex = 1; // Index for categories
					for (const category in groupedData) {
						const radioInput = document.createElement('input');
						radioInput.classList.add('radio');
						radioInput.type = 'radio';
						radioInput.name = 'group';
						radioInput.id = `sec${categoryIndex}`;
						if (categoryIndex === 1) radioInput.checked = true;
		
						tabWrapper.appendChild(radioInput);
		
						const tabLabel = document.createElement('label');
						tabLabel.classList.add('tab');
						tabLabel.setAttribute('for', `sec${categoryIndex}`);
						tabLabel.textContent = category;
						tabWrapper.appendChild(tabLabel);
		
						categoryIndex++;
					}
		
					contentContainer.appendChild(tabWrapper);
		
					// Panels for each category
					const panelWrapper = document.createElement('div');
					panelWrapper.classList.add('panels');
		
					categoryIndex = 1; // Start from 1 to match radio button IDs
					for (const category in groupedData) {
						const panel = document.createElement('div');
						panel.classList.add('panel');
						panel.classList.add('explainer');
						panel.id = `panel${categoryIndex}`;
						if (categoryIndex === 1) panel.style.display = 'grid';
		
						const categoryTitle = document.createElement('h2');
						categoryTitle.classList.add('category');
						categoryTitle.id = `c${categoryIndex}`;
						const catSpan = document.createElement('span');
						catSpan.textContent = category;
						categoryTitle.appendChild(catSpan);
						panel.appendChild(categoryTitle);
		
						groupedData[category].forEach((item, sectionIndex) => {
							const section = document.createElement('div');
							section.classList.add('section');
							section.id = `sec${sectionIndex + 1}`;
		
							// Add data attributes to hold category and section values
							section.setAttribute('data-category', category);
							section.setAttribute('data-section', item.section);
		
							// Attach event listener to capture clicks
							section.addEventListener('click', () => {
								const selectedCategory = section.getAttribute('data-category');
								const selectedSection = section.getAttribute('data-section');
								// get discipline and knowledge
								const selectedDiscipline = document.querySelector('#img_category_discipline .selected')?.getAttribute('data-value');
								const selectedKnowledge = document.querySelector('#img_category_knowledge .selected')?.getAttribute('data-value');

								// call rewriteContent() function that's in chatgpt.js
								rewriteContent({ discipline: selectedDiscipline, knowledge: selectedKnowledge, category: selectedCategory, section: selectedSection });
								


							});
		
							const details = document.createElement('details');
							details.classList.add('sectionTab');
							details.classList.add('open');
		
							const summary = document.createElement('summary');
							summary.classList.add('sectionTitle');
		
							const secSpan = document.createElement('span');
							secSpan.textContent = item.section;
		
							summary.appendChild(secSpan);
							details.appendChild(summary);
		
							const content = document.createElement('div');
							content.classList.add('content');
							const contentParagraph = document.createElement('p');
							contentParagraph.textContent = item.content || 'No content available';

							// if content is empty, add a button to request content
							if (!item.content) {
								const requestButton = document.createElement('button');
								requestButton.textContent = 'Request Content';
								requestButton.addEventListener('click', () => {
									// Ask for their ChatGPT API key
									const apiKey = prompt('Please enter your ChatGPT API key:');
									if (apiKey) {
										// Call the rewriteContent function with the provided API key
										rewriteContent({ 
											discipline: selectedDiscipline, 
											knowledge: selectedKnowledge, 
											category: category, 
											section: item.section, 
											apiKey: apiKey 
										});
									}
								});
								content.appendChild(requestButton);
							}


							content.appendChild(contentParagraph);
							details.appendChild(content);
							section.appendChild(details);
		
							panel.appendChild(section);
						});
		
						panelWrapper.appendChild(panel);
						categoryIndex++;
					}
		
					contentContainer.appendChild(panelWrapper);
		
					// Tab switching logic
					document.querySelectorAll('.radio').forEach((radio, index) => {
						radio.addEventListener('change', () => {
							document.querySelectorAll('.panel').forEach((panel, panelIndex) => {
								panel.style.display = panelIndex === index ? 'grid' : 'none';
							});
						});
					});
				})
				.catch(error => {
					console.error('Error fetching or processing data:', error);
				});
		}
	});
document.addEventListener('DOMContentLoaded', () => {
    setupDropdown('img_category_discipline');
    setupDropdown('img_category_knowledge');
});

function anotherFunction(discipline, knowledge, category, section) {
    // console.log(`Processing category: ${category}, section: ${section}`);
    console.log(`Processing discipline: ${discipline}, knowledge: ${knowledge}, category: ${category}, section: ${section}`);
    // Your logic here
}

function setupDropdown(dropdownId) {
    const dropdown = document.querySelector(`#${dropdownId} .options`);
    if (!dropdown) {
        console.error(`Dropdown options element not found for ID: ${dropdownId}`);
        return;
    }

    dropdown.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('option')) {
            const selectedValue = target.getAttribute('data-value');
            const selectedText = target.textContent;

            const selectedSpan = document.querySelector(`#${dropdownId} .selected`);
            if (selectedSpan) {
                selectedSpan.textContent = selectedText;
                selectedSpan.setAttribute('data-value', selectedValue);
                console.log(`${dropdownId} selected:`, selectedValue);
            }

            // handleSelectionChange();
        }
    });
}



// get 

function getData(discipline, knowledge, category, section, content) {
    return fetch('data.json') // Fetch the JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data: ${response.statusText}`);
            }
            return response.json(); // Parse the JSON file
        })
        .then(data => {
            // Filter the data based on the provided parameters
            const filteredData = data.filter(item => {
                return (
                    (!discipline || item.discipline === discipline) &&
                    (!knowledge || item.knowledge === knowledge) &&
                    (!category || item.category === category) &&
                    (!section || item.section === section) &&
                    (!content || item.content === content)
                );
            });

            return filteredData; // Return the filtered data
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            return []; // Return an empty array on error
        });
}