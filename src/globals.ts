export enum importSCSSOptions{
	about_me,
	personal_projects,
	web_ring,
	cat_encryption
}


export function clickedOff(elementID: string ,event: MouseEvent): boolean {
	let object: any = document.getElementById(elementID);
	// object is not target, and object does not contain target, thus they clicked off
	return object !== event.target && !object?.contains(event.target);
} 

export const csWorkTechnologies = {
	///////////////
	// Languages //
	///////////////

	HTML: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/640px-HTML5_logo_and_wordmark.svg.png",
		name: "HTML",
		description: "Hyper Text Markup Language used as the basis for websites."
	},
	CSS: {
		icon: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/css3-512.png",
		name: "CSS",
		description: "Cascading Style Sheets: What gives websites their visual flair."
	},
	TypeScript: {
		icon: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
		name: "TypeScript",
		description: "Typed version of javascript. Makes websites responsive to user input."
	},
	Python: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png",
		name: "Python",
		description: "The do it all duck typed language. Amazing for scripting."
	},
	Java: {
		icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
		name: "Java",
		description: "Industry standard statically typed language."
	},
	Go: {
		icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/go-programming-language-icon.png",
		name: "Go",
		description: "If C and Python had a baby. Still learning it, but seems to be amazing for backend development especially in the speed department."
	},
	Ansible: {
		icon: "https://tobisyurt.net/assets/images/ansible-logo.png",
		name: "Ansible",
		description: "Remote code execution language focused on idempotencey (no matter how many times a script is executed the same results occur). Super useful, and is written on top of python."
	},
	K8: {
		icon: "https://cdn2.iconfinder.com/data/icons/mixd/512/20_kubernetes-512.png",
		name: "Kubernetes",
		description: "Containerized application manager, network controller, and high availability manager. The tools such as Lens take K8 and make it absolutely stellar!"
	},
	SQL: {
		icon: "https://cdn-icons-png.flaticon.com/512/4299/4299956.png",
		name: "SQL",
		description: "Structured Query Language which saves me from having to write a thread safe 'Writer' and 'Reader' for text."
	},
	C: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
		name: "C",
		description: "Low level language that I love making very small gadgets in. Nightmare difficulty for large projects though."
	},
	Coq: {
		icon: "https://static.macupdate.com/products/14843/m/coq-logo.png?v=1568296682",
		name: "Coq",
		description: "Formal proof management system."
	},
	S3: {
		icon: "https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-1694x2048-ygs8j98c.png",
		name: "S3",
		description: "Cold storage object stores are such cool concepts."
	},

	///////////////
	// DevOps/IT //
	///////////////
	
	Docker: {
		icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png",
		name: "Docker",
		description: "Industry standard for containerizing software applications. Absolutely love it!"
	},
	Istio: {
		icon: "https://seeklogo.com/images/I/istio-logo-92FF583709-seeklogo.com.png",
		name: "Istio",
		description: "One of many service mesh implementations. My favorite so far increasing observability, security, and reliability. Plus it has cool graphs :)."
	}, 
	Consul: {
		icon: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/refs/heads/main/svg/consul.svg",
		name: "Consul",
		description: "The previous service mesh I was using, but was difficult to use with VPN's. Also no cool graphs :(."
	},
	Grafana: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Grafana_icon.svg/351px-Grafana_icon.svg.png?20230113182558",
		name: "Grafana",
		description: "Dashboard for all metrics and logs."
	},
	Loki: {
		icon: "https://grafana.com/media/docs/loki/logo-grafana-loki.png",
		name: "Loki",
		description: "Log processing, indexing, and storage software that works well with Grafana."
	},
	Prometheus: {
		icon: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/refs/heads/main/svg/prometheus.svg",
		name: "Prometheus",
		description: "Easy to use metrics monitoring system."
	},
	Proxmox: {
		icon: "https://camo.githubusercontent.com/fdffb57ca7bf0ba2900bab738df7bf002dee35f15e55f2029a97de1d2bdc1e07/68747470733a2f2f7777772e70726f786d6f782e636f6d2f696d616765732f70726f786d6f782f50726f786d6f782d6c6f676f2d737461636b65642d38343070782e706e67",
		name: "Proxmox",
		description: "Type 1 hypervisor which makes one beefy computer into many semi-beefy VM's. Absolutely love this hypervisor."
	},
	TrueNas: {
		icon: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/refs/heads/main/svg/truenas.svg",
		name: "TrueNAS",
		description: "NAS solution which has a crazy internal K8 instance (absolutely wild)."
	},
	Ubiquity: {
		icon: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/refs/heads/main/svg/ubiquiti.svg",
		name: "Ubiquity",
		description: "The Apple of networking products. They are so extremely polished."
	},
	Linux: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/265px-Tux.svg.png",
		name: "Linux",
		description: "My favorite kernel other than carmel."
	},



	Fiji: {
		icon: "https://global.discourse-cdn.com/flex015/uploads/imagej/original/3X/f/4/f41e19741763edf6f79e98aaf9259c614ddec98d.png",
		name: "Fiji",
		description: "Swiss army knife for microscopy. Made two professional plugins for the application so far."
	},

	OpenID: {
		icon: "https://www.scottbrady91.com/img/logos/openid-icon.png",
		name: "OpenID",
		description: "Authentication and authorization management service which makes the process easier and significantly more secure."
	},
	LaTeX: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/1280px-LaTeX_logo.svg.png",
		name: "LaTeX",
		description: "The best professional research paper writing tool. It's citations and math capabilities are insane."
	},
	GoogleScholar: {
		icon: "https://img.icons8.com/ios7/512/FFFFFF/google-scholar--v2.png",
		name: "Google Scholar",
		description: "Favorite publication search engine."
	},
	

	////////////////
	// Frameworks //
	////////////////
	

	Svelte: {
		icon: "https://raw.githubusercontent.com/sveltejs/svelte/29052aba7d0b78316d3a52aef1d7ddd54fe6ca84/site/static/images/svelte-android-chrome-512.png",
		name: "Svelte",
		description: "Front-end framework used to hasten development speed."
	},
	Quarkus: {
		icon: "https://tools.jboss.org/features/images/quarkus_icon_rgb_256px_default.png",
		name: "Quarkus",
		description: "Backend framework for Java, accelerating the development of HTTP related API's."
	},
	Django: {
		icon: "https://cdn.icon-icons.com/icons2/2415/PNG/512/django_line_logo_icon_146560.png",
		name: "Django",
		description: "A Python backend framework. Enjoyed it the only time I used it."
	},
	GraphQL: {
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png",
		name: "GraphQL",
		description: "Unique API implementation that uses a 'Grab Only What You Need' philosophy. Speed-ups come added complexity of API use."
	},
}

