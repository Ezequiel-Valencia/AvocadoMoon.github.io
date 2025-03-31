<script lang="ts">
  import type { Writable } from "svelte/store";
  import { GeoCacheApi, ResponseError, type GeoCacheSubmission, type SendSubmissionRequest } from "../../backend-api";

    let geo = new GeoCacheApi()
    $: addSecret = false
    $: addLocation = false
    $: grabbingLocation = false
    $: submittedMessage = false;
    $: username = ""

    let latitude: number
    let longitude: number

    export let freshSetOfSubmissions: Writable<boolean>;

    async function handleGuestSubmission(e: SubmitEvent){
        username = document.querySelector<HTMLInputElement>("#username")!.value!
        let note = document.querySelector<HTMLTextAreaElement>("#note")!.value!
        let secretNode = document.querySelector<HTMLInputElement>("#secret")
        let locationNameNode = document.querySelector<HTMLInputElement>("#location-name")
        let latitudeNode = document.querySelector<HTMLInputElement>("#latitude")
        let longitudeNode = document.querySelector<HTMLInputElement>("#longitude")

        let secret = secretNode != null ? secretNode.value : ""
        let locationName = locationNameNode != null ? locationNameNode.value : ""
        if (latitudeNode != null){
            latitude = parseFloat(latitudeNode.value)
        }
        if (longitudeNode != null){
            longitude = parseFloat(longitudeNode.value)
        }
        
        let submission: GeoCacheSubmission = {name: username, note: note, secret: secret, 
        longitude: longitude, latitude: latitude, locationName: locationName}
        
        try{
            await geo.sendSubmission({geoCacheSubmission: submission})
            addSecret = false;
            freshSetOfSubmissions.set(false)
            submittedMessage = true
        } catch(e: any){
            if (e instanceof ResponseError){
                window.alert("Error attempting to submit message: " + await e.response.text())
            }
            console.error(e)
        }
    }

    function usersLocation(){
        if (navigator.geolocation) {
            grabbingLocation = true
            navigator.geolocation.getCurrentPosition((geo) =>{
                console.log(geo.coords)
                grabbingLocation = false
                latitude = geo.coords.latitude
                longitude = geo.coords.longitude
            }, () => {grabbingLocation = false})
        } 
    }

</script>

<section>
    {#if !submittedMessage}
    <!-- Can put extra inputs as "Honey Pots" for bots.
    If that honey pot input is given you know a bot is submitting all fields. -->
    <form onsubmit={handleGuestSubmission}>
        <label>
            Your Geocache Entry
            <br>
            <br>
            <input required minlength="3" placeholder="Your Name" name="username" type="text" id="username">
            <br>
            <br>
            <textarea required minlength="3" maxlength="250" placeholder="Your message (max 250 characters)." 
            style="border-radius: 6px; width:30vw;" name="note" id="note"></textarea>
            <br>
            <br>
            {#if addLocation}
                {#if grabbingLocation}
                    <p>Grabbing Your Location</p>
                    <div class="loader"></div> 
                {:else}
                    <div style="width: 30vw; text-align:center; margin:auto; display:inline;">
                        <input maxlength="50" minlength="3" required style="width:30vw;" placeholder="Location Name" name="location-name" type="text" id="location-name">
                        <br>
                        <div style="width:30vw; display:inline-block;">
                            <input required defaultValue={latitude == undefined ? "" : latitude} placeholder="Latitude" name="latitude" type="number" step="any" id="latitude">
                            <input required defaultValue={longitude == undefined ? "" : longitude} placeholder="Longitude" name="longitude" type="number" step="any" id="longitude">
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button onclick={usersLocation} type="button" style='font-size:small'>
                                <i class='fas fa-map-marker-alt'></i>
                            </button>
                        </div>
                    </div>
                {/if}
                <br>
                <br>
            {/if}
            {#if addSecret}
                <textarea maxlength="50" minlength="3" placeholder="Secret message (max 50 characters)." 
                style="border-radius: 6px; width:30vw;" name="secret" id="secret"></textarea>
                <br>
                <br>
            {/if}
            <div style="width: 30vw; text-align:center; margin:auto;" class="flex items-center">
                <button type="button" onclick={() => {addSecret = !addSecret}}>{addSecret ? "Remove" : "Add"} Secret?</button>
                <button style="margin-left: 20px;" type="button" onclick={() => {addLocation = !addLocation}}>{addLocation ? "Remove" : "Add"} Location?</button>
                <!-- <input on:change={() => {addSecret = !addSecret}} style="border: solid black 1px; border-radius: 1px;" id="checked-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"> -->
                <!-- <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add Secret?</label> -->
            </div>
            <br>
            <button>Submit Message</button>
        </label>
    </form>
    {:else}
    <section>
        <br>
        <div>
            <h2>Message Saved in GeoCache</h2>
            <p>Thank you for your entry {username}.</p>
        </div>
    </section>
    {/if}
    
</section>


<style lang="scss">
    form{
        text-align: center;
        margin: auto;
        padding-top: 5vh;
    }

    input {
        border-radius: 6px;
    }

    button{
        padding: .5%;
        padding-left: 1%;
        padding-right: 1%;
        background-color: white;
        border-color: black;
        border-style: solid;
    }
    button:hover{
        background-color: black;
        color: white;
        cursor: pointer;
    }
    
    .loader {
        border: 10px solid #f3f3f3; /* Light grey */
        border-top: 10px solid #000000; /* Blue */
        border-radius: 50%;
        width: 2vh;
        height: 2vh;
        animation: spin 2s linear infinite;
        text-align: center;
        margin:auto;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
</style>

