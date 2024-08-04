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

