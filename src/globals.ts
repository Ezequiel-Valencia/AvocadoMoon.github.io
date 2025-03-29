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

export const resumeURL = "https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub"

export const csWorkTechnologies = {
	///////////////
	// Languages //
	///////////////

	HTML: {
		icon: "/icons/HTML.png",
		name: "HTML",
		description: "Hyper Text Markup Language used as the basis for websites."
	},
	CSS: {
		icon: "/icons/CSS.svg",
		name: "CSS",
		description: "Cascading Style Sheets: What gives websites their visual flair."
	},
	TypeScript: {
		icon: "/icons/typescript.svg",
		name: "TypeScript",
		description: "Typed version of javascript. Makes websites responsive to user input."
	},
	Python: {
		icon: "/icons/python.png",
		name: "Python",
		description: "The do it all duck typed language. Amazing for scripting."
	},
	Java: {
		icon: "/icons/java.svg",
		name: "Java",
		description: "Industry standard statically typed language."
	},
	Go: {
		icon: "/icons/golang.png",
		name: "Go",
		description: "If C and Python had a baby. Still learning it, but seems to be amazing for backend development especially in the speed department."
	},
	Ansible: {
		icon: "/icons/ansible.png",
		name: "Ansible",
		description: "Remote code execution language focused on idempotencey (no matter how many times a script is executed the same results occur). Super useful, and is written on top of python."
	},
	Terraform: {
		icon: "/icons/terraform.svg",
		name: "Terraform",
		description: "Resource declaration language that is idempotent. Makes managing external resources significantly easier via IaC."
	},
	K8: {
		icon: "/icons/k8.png",
		name: "Kubernetes",
		description: "Containerized application manager, network controller, and high availability manager. The tools such as Lens take K8 and make it absolutely stellar!"
	},
	SQL: {
		icon: "/icons/sql.png",
		name: "SQL",
		description: "Structured Query Language which saves me from having to write a thread safe 'Writer' and 'Reader'."
	},
	C: {
		icon: "/icons/C.png",
		name: "C",
		description: "Low level language that I love making very small gadgets in. Nightmare difficulty for large projects though."
	},
	Coq: {
		icon: "/icons/coq.png",
		name: "Coq",
		description: "Formal proof management system."
	},
	S3: {
		icon: "/icons/s3.png",
		name: "S3",
		description: "Cold storage object stores are such cool concepts."
	},

	///////////////
	// DevOps/IT //
	///////////////
	
	Docker: {
		icon: "/icons/docker.png",
		name: "Docker",
		description: "Industry standard for containerizing software applications. Absolutely love it!"
	},
	Istio: {
		icon: "/icons/istio.png",
		name: "Istio",
		description: "One of many service mesh implementations. My favorite so far increasing observability, security, and reliability. Plus it has cool graphs :)."
	}, 
	Consul: {
		icon: "/icons/consul.svg",
		name: "Consul",
		description: "The previous service mesh I was using, but was difficult to use with VPN's. Also no cool graphs :(."
	},
	Grafana: {
		icon: "/icons/grafana.png",
		name: "Grafana",
		description: "Dashboard for all metrics and logs."
	},
	Loki: {
		icon: "/icons/loki.png",
		name: "Loki",
		description: "Log processing, indexing, and storage software that works well with Grafana."
	},
	Prometheus: {
		icon: "/icons/prometheus.png",
		name: "Prometheus",
		description: "Easy to use metrics monitoring system."
	},
	Proxmox: {
		icon: "/icons/proxmox.png",
		name: "Proxmox",
		description: "Type 1 hypervisor which makes one beefy computer into many semi-beefy VM's. Absolutely love this hypervisor."
	},
	TrueNas: {
		icon: "/icons/truenas.svg",
		name: "TrueNAS",
		description: "NAS solution which has a crazy internal K8 instance (absolutely wild)."
	},
	Ubiquity: {
		icon: "/icons/ubiquiti.svg",
		name: "Ubiquiti",
		description: "The Apple of networking products. They are so extremely polished."
	},
	Linux: {
		icon: "/icons/linux.png",
		name: "Linux",
		description: "My favorite kernel other than carmel."
	},



	Fiji: {
		icon: "/icons/fiji.png",
		name: "Fiji",
		description: "Swiss army knife for microscopy. Made two professional plugins for the application so far."
	},

	OpenID: {
		icon: "/icons/openID.png",
		name: "OpenID",
		description: "Authentication and authorization management service which makes the process easier and significantly more secure."
	},
	LaTeX: {
		icon: "/icons/latex.svg",
		name: "LaTeX",
		description: "The best professional research paper writing tool. It's citations and math capabilities are insane."
	},
	GoogleScholar: {
		icon: "/icons/google scholar.png",
		name: "Google Scholar",
		description: "Favorite publication search engine."
	},
	

	////////////////
	// Frameworks //
	////////////////
	

	Svelte: {
		icon: "/icons/svelte.png",
		name: "Svelte",
		description: "Front-end framework used to hasten development speed."
	},
	Quarkus: {
		icon: "/icons/quarkus.svg",
		name: "Quarkus",
		description: "Backend framework for Java, accelerating the development of HTTP related API's."
	},
	Django: {
		icon: "/icons/django.svg",
		name: "Django",
		description: "A Python backend framework. Enjoyed it the only time I used it."
	},
	GraphQL: {
		icon: "/icons/graphql.png",
		name: "GraphQL",
		description: "Unique API implementation that uses a 'Grab Only What You Need' philosophy. Speed-ups come added complexity of API use."
	},
}

