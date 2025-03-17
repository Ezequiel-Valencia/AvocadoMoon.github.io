<script lang="ts">
    import { Checkbox } from "flowbite-svelte";
import { BackendRequestBuilder } from "../../common/backend-requests";

    let submissionReceived = false
    $: addSecret = false

    async function handleGuestSubmission(e: SubmitEvent){
        let username = document.querySelector<HTMLInputElement>("#username")!.textContent
        let note = document.querySelector<HTMLTextAreaElement>("#note")!.textContent

        
        let jsonVersionOfVote = JSON.stringify({username: username, note: note})
        let responsePromise = new BackendRequestBuilder().setEndpoint("/guestSubmission")
        .setMethod("POST").isSendingJSON(true)
        .setBody(jsonVersionOfVote).sendUnAuthenticatedRequest()
    
        let response = await responsePromise
        if (response.ok){
            submissionReceived = true
        } else{
            window.alert("Error with submission.")
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
                <input placeholder="Your Name" style="border-radius: 6px;" name="username" type="text" id="username">
                <br>
                <br>
                <textarea maxlength="250" placeholder="Your message (max 250 characters)." 
                style="border-radius: 6px; width:30vw;" name="note"></textarea>
                <br>
                <br>
                {#if addSecret}
                    <textarea maxlength="50" placeholder="Secret message (max 50 characters)." 
                    style="border-radius: 6px; width:30vw;" name="note"></textarea>
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
    
</style>

