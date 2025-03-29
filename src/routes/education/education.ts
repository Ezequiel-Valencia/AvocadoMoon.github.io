
import { safeLocalStorage, convertToBoolean } from "../../common/myLocalStorage";
import { writable } from "svelte/store";
import { csWorkTechnologies } from "../../globals";


export function createBookCheckout() {
    const key = 'bookCheckoutBool';
    safeLocalStorage?.setItem(key, 'false')
    const bool = convertToBoolean(safeLocalStorage?.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    return {
        subscribe,
        read: () => {let v = safeLocalStorage.getItem(key); return v == null ? false : convertToBoolean(v)},
        toggleBookStatus: () => update((bool) => { safeLocalStorage?.setItem(key, String(!bool)); return !bool })
    }
}

export const technology_learned = [
    {
        icon: csWorkTechnologies.HTML.icon,
        iconName: csWorkTechnologies.HTML.name,
        projects: ["This Website", "Auto Grading Site"]
    },
    {
        icon: csWorkTechnologies.SpringBoot.icon,
        iconName: csWorkTechnologies.SpringBoot.name,
        projects: ["This Website"]
    },
    {
        icon: csWorkTechnologies.CSS.icon,
        iconName: csWorkTechnologies.CSS.name,
        projects: ["This Website", "Auto Grading Site"]
    },
    {
        icon: csWorkTechnologies.TypeScript.icon,
        iconName: csWorkTechnologies.TypeScript.name,
        projects: ["This Website", "Auto Grading Site", "Best Buy Bot"]
    },
    {
        icon: csWorkTechnologies.Svelte.icon,
        iconName: csWorkTechnologies.Svelte.name,
        projects: ["This Website"]
    },
    {
        icon: csWorkTechnologies.SQL.icon,
        iconName: csWorkTechnologies.SQL.name,
        projects: ["VCell", "Event Bot", "CTGrassRoots", "Three-mix"]
    },
    {
        icon: csWorkTechnologies.Python.icon,
        iconName: csWorkTechnologies.Python.name,
        projects: ["Event Bot", "Auto Grading Site", "Encrypted Cat Exchange"]
    },
    {
        icon: csWorkTechnologies.Java.icon,
        iconName: csWorkTechnologies.Java.name,
        projects: ["VCell Fiji", "VCell", "Cancer Cell Analyzer"]
    },
    {
        icon: csWorkTechnologies.Quarkus.icon,
        iconName: csWorkTechnologies.Quarkus.name,
        projects: ["VCell"]
    },
    {
        icon: csWorkTechnologies.GraphQL.icon,
        iconName: csWorkTechnologies.GraphQL.name,
        projects: ["Event Bot"]
    },
    {
        icon: csWorkTechnologies.Docker.icon,
        iconName: csWorkTechnologies.Docker.name,
        projects: ["Homelab", "VCell", "Event Bot", "Three-mix", "CTGrassRoots"]
    },
    {
        icon: csWorkTechnologies.K8.icon,
        iconName: csWorkTechnologies.K8.name,
        projects: ["Homelab", "VCell"]
    },
    {
        icon: csWorkTechnologies.Ansible.icon,
        iconName: csWorkTechnologies.Ansible.name,
        projects: ["Homelab", "CTGrassRoots"]
    },
    {
        icon: csWorkTechnologies.Terraform.icon,
        iconName: csWorkTechnologies.Terraform.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Istio.icon,
        iconName: csWorkTechnologies.Istio.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Grafana.icon,
        iconName: csWorkTechnologies.Grafana.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Loki.icon,
        iconName: csWorkTechnologies.Loki.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Prometheus.icon,
        iconName: csWorkTechnologies.Prometheus.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Ubiquity.icon,
        iconName: csWorkTechnologies.Ubiquity.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.TrueNas.icon,
        iconName: csWorkTechnologies.TrueNas.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Fiji.icon,
        iconName: csWorkTechnologies.Fiji.name,
        projects: ["VCell Fiji", "Cancer Cell Analyzer"]
    },
    {
        icon: csWorkTechnologies.OpenID.icon,
        iconName: csWorkTechnologies.OpenID.name,
        projects: ["VCell"]
    },
    {
        icon: csWorkTechnologies.Proxmox.icon,
        iconName: csWorkTechnologies.Proxmox.name,
        projects: ["Homelab"]
    },
    {
        icon: csWorkTechnologies.Go.icon,
        iconName: csWorkTechnologies.Go.name,
        projects: ["Three-mix"]
    },
    {
        icon: csWorkTechnologies.Django.icon,
        iconName: csWorkTechnologies.Django.name,
        projects: ["Auto Grader"]
    }
    
]



