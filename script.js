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

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Get the container where the content will be inserted
        const contentContainer = document.getElementById('content-container');
		// add wrapper class to content container
		contentContainer.classList.add('wrapper');

        // Set up event listeners on the dropdowns to filter and display content
        document.querySelector('#img_category_discipline').addEventListener('click', renderContent);
        document.querySelector('#img_category_knowledge').addEventListener('click', renderContent);

        function renderContent() {
            // Get the selected values for discipline and knowledge
            const selectedDiscipline = document.querySelector('#img_category_discipline .selected').getAttribute('data-value');
            const selectedKnowledge = document.querySelector('#img_category_knowledge .selected').getAttribute('data-value');

            // Clear existing content
            contentContainer.innerHTML = '';

            // Filter the data based on the selected discipline and knowledge
            const filteredData = data.filter(item =>
                item.discipline === selectedDiscipline && item.knowledge === selectedKnowledge
            );

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

            // Input elements for tab functionality
            let categoryIndex = 1; // Index for categories
            for (const category in groupedData) {
                const radioInput = document.createElement('input');
                radioInput.classList.add('radio');
                radioInput.type = 'radio';
                radioInput.name = 'group';
                radioInput.id = `sec${categoryIndex}`;
                if (categoryIndex === 0) radioInput.checked = true;

                tabWrapper.appendChild(radioInput);

                // Tab labels
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
				panel.id = `panel${categoryIndex}`; // Match panel ID with radio button ID
				if (categoryIndex === 1) panel.style.display = 'grid'; // Show the first panel by default

				// <h2 class="category" id="c1">Category</h2>
				const categoryTitle = document.createElement('h2');
				categoryTitle.classList.add('category');
				categoryTitle.id = `c${categoryIndex}`;
				const catSpan = document.createElement('span');
				catSpan.textContent = category;
				categoryTitle.appendChild(catSpan);
				panel.appendChild(categoryTitle);


				// Create sections for the panel
				groupedData[category].forEach((item, sectionIndex) => {
					const section = document.createElement('div');
					section.classList.add('section');
					section.id = `sec${sectionIndex + 1}`;
					// section.style.gridColumn = sectionIndex + 1;

					const details = document.createElement('details');
					details.classList.add('sectionTab');

					const summary = document.createElement('summary');
					summary.classList.add('sectionTitle');

					const secSpan = document.createElement('span');
					secSpan.textContent = item.section;


					if (item.section === 'Replacing You') {
						const scrib = document.createElement('div');
						scrib.classList.add('scrib');
					
						const svg = document.createElement('svg');
						svg.classList.add('scribble');
						
						fetch('scribble.svg') // Fetch the SVG file 
						.then(response => response.text())
						.then(svgContent => {
							// Create a container for the SVG and set the innerHTML to the SVG content
							const svgContainer = document.createElement('div');
							svgContainer.innerHTML = svgContent;

							// Append the SVG to the scrib div
							scrib.appendChild(svgContainer.firstChild);
							
							const assistSpan = document.createElement('span');
							assistSpan.classList.add('assist');
							assistSpan.textContent = 'Assisting';
						
							secSpan.style.position = 'absolute';
							secSpan.style.transform = 'translateY(30px)';

							// Append the scrib div to the summary
							summary.appendChild(scrib);
							summary.appendChild(secSpan);
							summary.appendChild(assistSpan);
							details.appendChild(summary);
						})
						.catch(err => console.error('Error loading SVG:', err));
					}
					 else {
						summary.appendChild(secSpan);
						details.appendChild(summary);
					}

					const content = document.createElement('div');
					content.classList.add('content');
					const contentParagraph = document.createElement('p');
					// if empty, add a message
					if (item.content === '') {
						item.content = 'Content has not been generated for this section yet, apologies.';
					}
					contentParagraph.textContent = item.content;

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
					
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

document.addEventListener('DOMContentLoaded', () => {
    setupDropdown('img_category_discipline');
    setupDropdown('img_category_knowledge');
});

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

            // renderContent();
        }
    });
}


// Fetch the data from JSON and set up the page content

// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//         // Get the container where the content will be inserted
//         const contentContainer = document.getElementById('content-container');

//         // Set up event listeners on the dropdowns to filter and display content
//         document.querySelector('#img_category_discipline').addEventListener('click', renderContent);
//         document.querySelector('#img_category_knowledge').addEventListener('click', renderContent);

//         function renderContent() {
//             // Get the selected values for discipline and knowledge
//             const selectedDiscipline = document.querySelector('#img_category_discipline .selected').getAttribute('data-value');
//             const selectedKnowledge = document.querySelector('#img_category_knowledge .selected').getAttribute('data-value');

//             // Clear existing content
//             contentContainer.innerHTML = '';

//             // Filter the data based on the selected discipline and knowledge
//             const filteredData = data.filter(item => 
//                 item.discipline === selectedDiscipline && item.knowledge === selectedKnowledge
//             );

//             // Group filtered data by category and section
//             const groupedData = {};
//             filteredData.forEach(item => {
//                 if (!groupedData[item.category]) {
//                     groupedData[item.category] = [];
//                 }
//                 groupedData[item.category].push(item);
//             });

//             // Iterate over each category to create sections and display content
//             let categoryIndex = 0; // Index for each category
//             for (const category in groupedData) {
//                 // Create the container div for each explainer
//                 const explainer = document.createElement('div');
//                 explainer.classList.add('explainer');
//                 explainer.id = `explainer-${category} sec${categoryIndex + 1}`; // Unique ID for each explainer

//                 // Create the category title element
//                 const categoryTitle = document.createElement('h2');
//                 categoryTitle.classList.add('category');
//                 categoryTitle.id = `category-${category} c${categoryIndex + 1}`;
//                 const catSpan = document.createElement('span');
//                 catSpan.textContent = category;
//                 categoryTitle.appendChild(catSpan);
//                 explainer.appendChild(categoryTitle);

//                 // Create up to 3 sections for each category
//                 groupedData[category].slice(0, 3).forEach((item, sectionIndex) => {
//                     // Create section div
//                     const section = document.createElement('div');
//                     section.classList.add('section');

//                     // Create details for sectionTab
//                     const details = document.createElement('details');
//                     details.classList.add('sectionTab');

//                     // Create summary for sectionTitle
//                     const summary = document.createElement('summary');
//                     summary.classList.add('sectionTitle');
//                     const secSpan = document.createElement('span');
//                     secSpan.textContent = item.section; // Set the section title

//                     summary.appendChild(secSpan);
//                     details.appendChild(summary);

//                     // Create content section
//                     const content = document.createElement('div');
//                     content.classList.add('content');
//                     const contentParagraph = document.createElement('p');
//                     contentParagraph.textContent = item.content; // Add content

//                     content.appendChild(contentParagraph);
//                     details.appendChild(content);
//                     section.appendChild(details);

//                     // Set a unique ID for each section
//                     details.id = `sec${sectionIndex + 1}`;

//                     // Append section to explainer
//                     explainer.appendChild(section);
//                 });

//                 // Append the explainer to the content container
//                 contentContainer.appendChild(explainer);

//                 categoryIndex++;
//             }
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });

// document.addEventListener('DOMContentLoaded', () => {
//     setupDropdown('img_category_discipline');
//     setupDropdown('img_category_knowledge');
// });

// function setupDropdown(dropdownId) {
//     // Get the dropdown list
//     const dropdown = document.querySelector(`#${dropdownId} .options`);
//     if (!dropdown) {
//         console.error(`Dropdown options element not found for ID: ${dropdownId}`);
//         return;
//     }

//     // Attach event listener to the dropdown options
//     dropdown.addEventListener('click', event => {
//         const target = event.target;
//         if (target.classList.contains('option')) {
//             // Get the selected value and text
//             const selectedValue = target.getAttribute('data-value');
//             const selectedText = target.textContent;

//             // Update the selected value
//             const selectedSpan = document.querySelector(`#${dropdownId} .selected`);
//             if (selectedSpan) {
//                 selectedSpan.textContent = selectedText;
//                 selectedSpan.setAttribute('data-value', selectedValue);

//                 console.log(`${dropdownId} selected:`, selectedValue);
//             }

//             // Trigger content render
//             renderContent();
//         }
//     });
// }

// function renderContent() {
//     const selectedDiscipline = document.querySelector('#img_category_discipline .selected').getAttribute('data-value');
//     const selectedKnowledge = document.querySelector('#img_category_knowledge .selected').getAttribute('data-value');

//     console.log(`Discipline: ${selectedDiscipline}, Knowledge: ${selectedKnowledge}`);

//     // Add your logic to dynamically render content based on selections
// }




// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//         // Get the container where the content will be inserted
//         const contentContainer = document.getElementById('content-container');

//         // Define the categories of interest
//         const categories = ['What AI Actually Is', 'How AI Works', 'How AI Detectors Work', 'Effects of Using AI', 'AI Detector Issues'];
// 		const sections = ['Explanation', 'Comparison', 'Analogy', 'Input → Output', 'Human-like Learning', 'Learning and Biases', 'Inside Mechanics', 'Limitations and Flaws', 'Confirmation Bias',  'Replacing You',  'Applications',  'Misconceptions',  'Accuracy Concerns',  'Wrongful Assumptions',  'Ethical Implications']


//         // Group data by category
//         const groupedData = {};
//         data.forEach(item => {
//             if (categories.includes(item.category)) {
//                 if (!groupedData[item.category]) {
//                     groupedData[item.category] = [];
//                 }
//                 groupedData[item.category].push(item);
//             }
//         });

//         // Log grouped data to check which categories have data
//         console.log('Grouped Data:', groupedData);

//         // Iterate over each category to create an explainer
//         categories.forEach((category, index) => {
//             if (groupedData[category]) {
//                 // Create the container div for each explainer
//                 const explainer = document.createElement('div');
//                 explainer.classList.add('explainer');
//                 explainer.id = `sec${index + 1}`; // Unique ID for each explainer

//                 // Create the category title element
//                 const categoryTitle = document.createElement('h2');
//                 categoryTitle.classList.add('category');
//                 categoryTitle.id = `c${index + 1}`;
//                 const catSpan = document.createElement('span');
//                 catSpan.textContent = category;
//                 categoryTitle.appendChild(catSpan);
//                 explainer.appendChild(categoryTitle);

//                 // Create up to 3 sections for each category
//                 groupedData[category].slice(0, 3).forEach((item, sectionIndex) => {
//                     // Create section div
//                     const section = document.createElement('div');
//                     section.classList.add('section');

//                     // Create details for sectionTab
//                     const details = document.createElement('details');
//                     details.classList.add('sectionTab');

//                     // Create summary for sectionTitle
//                     const summary = document.createElement('summary');
//                     summary.classList.add('sectionTitle');
//                     const secSpan = document.createElement('span');
//                     secSpan.textContent = item.section; // Set the section title

//                     summary.appendChild(secSpan);
//                     details.appendChild(summary);

//                     // Create content section
//                     const content = document.createElement('div');
//                     content.classList.add('content');
//                     const contentParagraph = document.createElement('p');
//                     contentParagraph.textContent = item.content; // Add content

//                     content.appendChild(contentParagraph);
//                     details.appendChild(content);
//                     section.appendChild(details);

//                     // Append section to explainer
//                     explainer.appendChild(section);
//                 });

//                 // Append the explainer to the content container
//                 contentContainer.appendChild(explainer);
//             } else {
//                 console.log(`No data found for category: ${category}`);
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
