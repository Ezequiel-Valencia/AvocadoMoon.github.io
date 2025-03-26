<script lang="ts">
  import { GeoCacheApi, type GeoCacheSubmission, type SendSubmissionRequest } from "../../backend-api";

    let submissionReceived = false
    let geo = new GeoCacheApi()
    $: addSecret = false
    $: grabbingLocation = false

    let latitude: number
    let longitude: number

    async function handleGuestSubmission(e: SubmitEvent){
        let username = document.querySelector<HTMLInputElement>("#username")!.value!
        let note = document.querySelector<HTMLTextAreaElement>("#note")!.value!
        let secretNode = document.querySelector<HTMLInputElement>("#secret")
        
        let submission: GeoCacheSubmission = {name: username, note: note, secret: secretNode != null ? secretNode.value : "", 
        longitude: longitude + "", latitude: latitude + ""}
        
        try{
            console.log(submission)
            await geo.sendSubmission({geoCacheSubmission: submission})
            addSecret = false;
            window.location.reload()
        } catch(e: any){
            window.alert("Error attempting to submit message")
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
    {#if submissionReceived}
        <p>Submitted</p>
    {:else}
        <form on:submit={handleGuestSubmission}>
            <label>
                Formal Submission
                <br>
                <br>
                <input required placeholder="Your Name" style="border-radius: 6px;" name="username" type="text" id="username">
                <br>
                <br>
                {#if grabbingLocation}
                    <p>Grabbing Your Location</p>
                    <div class="loader"></div> 
                {:else}
                    <input defaultValue={latitude == undefined ? "" : latitude} placeholder="Latitude (optional)" style="border-radius: 6px;" name="latitude" type="text" id="latitude">
                    <input defaultValue={longitude == undefined ? "" : longitude} placeholder="Longitude (optional)" style="border-radius: 6px;" name="longitude" type="text" id="longitude">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button on:click={usersLocation} type="button" style='font-size:small'>
                        <i class='fas fa-map-marker-alt'></i>
                    </button>
                {/if}
                <br>
                <br>
                <textarea required maxlength="250" placeholder="Your message (max 250 characters)." 
                style="border-radius: 6px; width:30vw;" name="note" id="note"></textarea>
                <br>
                <br>
                {#if addSecret}
                    <textarea maxlength="50" placeholder="Secret message (max 50 characters)." 
                    style="border-radius: 6px; width:30vw;" name="secret" id="secret"></textarea>
                    <br>
                    <br>
                {/if}
                <div style="width: 30vw; text-align:center; margin:auto;" class="flex items-center">
                    <input on:change={() => {addSecret = !addSecret}} style="border: solid black 1px;" id="checked-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add Secret?</label>
                </div>
                <button>Submit Message</button>
            </label>
        </form>
    {/if}
</section>


<style lang="scss">
    form{
        text-align: center;
        margin: auto;
        padding-top: 10vh;
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

