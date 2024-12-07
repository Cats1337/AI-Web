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


var util = {
	f: {
		addStyle: function (elem, prop, val, vendors) {
			var i, ii, property, value
			if (!util.f.isElem(elem)) {
				elem = document.getElementById(elem)
			}
			if (!util.f.isArray(prop)) {
				prop = [prop]
				val = [val]
			}
			for (i = 0; i < prop.length; i += 1) {
				var thisProp = String(prop[i]),
					thisVal = String(val[i])
				if (typeof vendors !== "undefined") {
					if (!util.f.isArray(vendors)) {
						vendors.toLowerCase() == "all" ? vendors = ["webkit", "moz", "ms", "o"] : vendors = [vendors]
					}
					for (ii = 0; ii < vendors.length; ii += 1) {
						elem.style[vendors[i] + thisProp] = thisVal
					}
				}
				thisProp = thisProp.charAt(0).toLowerCase() + thisProp.slice(1)
				elem.style[thisProp] = thisVal
			}
		},
		cssLoaded: function (event) {
			var child = util.f.gettrg(event)
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
			var child, children = document.getElementsByClassName("field"), i
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
			field.classList.remove("focused")
			var child, children = field.childNodes, i, ii, nested_child, nested_children
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("deselect")) {
						child.parentNode.removeChild(child)
					} else if (child.tagName == "SPAN") {
						if (!field.dataset.value) {
							util.f.addStyle(child, ["fontSize", "Top"], ["16px", "32px"])
						}
					} else if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child)) {
								if (nested_child.tagName == "SPAN") {
									if (!field.dataset.value) {
										util.f.addStyle(nested_child, ["opacity", "transform"], [0, "translateY(24px)"])
									}
								} else if (nested_child.tagName == "UL") {
										util.f.addStyle(nested_child, ["height", "opacity"], [0, 0])
								}
							}
						}
					}
				}
			}
		},
		focus: function (field) {
			field.classList.add("focused")
			var bool = false, child, children = field.childNodes, i, ii, iii, nested_child, nested_children, nested_nested_child, nested_nested_children, size = 0
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				util.f.isElem(child) && child.classList.contains("deselect") ? bool = true : null
			}
			if (!bool) {
				child = document.createElement("div")
				child.className = "deselect"
				child.addEventListener("click", form.f.select.toggle)
				field.insertBefore(child, children[0])
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child) && child.classList.contains("psuedo_select")) {
					nested_children = child.childNodes
					for (ii = 0; ii < nested_children.length; ii += 1) {
						nested_child = nested_children[ii]
						if (util.f.isElem(nested_child) && nested_child.tagName == "UL") {
							size = 0
							nested_nested_children = nested_child.childNodes
							for (iii = 0; iii < nested_nested_children.length; iii += 1) {
								nested_nested_child = nested_nested_children[iii]
								if (util.f.isElem(nested_nested_child) && nested_nested_child.tagName == "LI") {
									size += util.f.getSize(nested_nested_child, "height")
									console.log("size: " + size)
								}
							}
							util.f.addStyle(nested_child, ["height", "opacity"], [size + "px", 1])
						}
					}
				}
			}
		},
		selection: function (child, parent) {
			var children = parent.childNodes, i, ii, nested_child, nested_children, time = 0, value
			if (util.f.isElem(child) && util.f.isElem(parent)) {
				parent.dataset.value = child.dataset.value
				value = child.innerHTML
			}
			for (i = 0; i < children.length; i += 1) {
				child = children[i]
				if (util.f.isElem(child)) {
					if (child.classList.contains("psuedo_select")) {
						nested_children = child.childNodes
						for (ii = 0; ii < nested_children.length; ii += 1) {
							nested_child = nested_children[ii]
							if (util.f.isElem(nested_child) && nested_child.classList.contains("selected")) {
								if (nested_child.innerHTML)  {
									time = 1E2
									util.f.addStyle(nested_child, ["opacity", "transform"], [0, "translateY(24px)"], "all")
								}
								setTimeout(function (c, v) {
									c.innerHTML = v
									util.f.addStyle(c, ["opacity", "transform", "transitionDuration"], [1, "translateY(0px)", ".1s"], "all")
								}, time, nested_child, value)
							}
						}
					} else if (child.tagName == "SPAN") {
						util.f.addStyle(child, ["fontSize", "top"], ["12px", "8px"])
                        util.f.addStyle(child, ["color"], ["#666666"])
				   }
			   }
			}
		},
		toggle: function (event) {
			util.f.events.stop(event)
			var child = util.f.gettrg(event), children, i, parent
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


// <!-- Content to be generated(pulled) dynamically based on Category and Desc -->
// File to pull from:
// /data.json
// {
//     "content": [ 
//       {
//         "sectionID": "sec1",
//         "category": "What AI Actually Is",
//         "descriptions": [
//           {
//             "descID": "c1t1",
//             "desc_title": "Explanation 1",
//             "desc_words": [
//               "Artificial Intelligence isn’t as intelligent as we say it is; it’s essentially a vast, organized collection of knowledge, bound by rules and shaped by data."
//             ]
//           },
//           {
//             "descID": "c1t2",
//             "desc_title": "Explanation 2",
//             "desc_words": [
//               "lorem ipsum"
//             ]
//           },
//           {
//             "descID": "c1t3",
//             "desc_title": "Explanation 3",
//             "desc_words": [
//               "lorem ipsum"
//             ]
//           }
//         ]
//       }

function loadContent() {
	fetch('data.json')
		.then(response => response.json())
		.then(data => {
			let output = '<h2>Content</h2>';
			data.content.forEach(function (content) {
				output += `
				<div class="card">
					<h3>${content.category}</h3>
					<ul>
					${content.descriptions.map(function (desc) {
						return `
							<li>
								<h4>${desc.desc_title}</h4>
								<p>${desc.desc_words}</p>
							</li>
						`;
					}).join('')}
					</ul>
				</div>
				`;
			});
			document.getElementById('content').innerHTML = output;
		});
}