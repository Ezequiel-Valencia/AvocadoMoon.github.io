<script lang="ts">
    import { percentLoaded } from "./experiences";
</script>



<section id="loading-section" style="position: absolute; height:100vh; width:100vw;">
    <div style="text-align: center; justify-content:center; margin:auto;">
        <h1 style="text-align: center; color:white;">Galaxy is loading, please wait.</h1>
        <div style="width: 25vw;" id="progress-bar">
            <div style="width: {$percentLoaded}%; background-color:purple;" id="progress-bar-filling">
                {$percentLoaded}%
            </div>
        </div>
        <div style="color:white;">
            <h1>Skip Galaxy Loading</h1>
        </div>
    </div>
</section>





<style lang="scss">
    #loading-section{
        background-color:black; 
        left:0; 
        top:0;
        justify-items: center;
        align-items: center;
        display: flex;
    }

    #progress-bar{
        border-radius: 5px;
        border-style: solid;
        border-color: white;
        justify-self: center;
        
    }

    #progress-bar-filling{
        height: 100%;
        padding-top: 2%;
        padding-bottom: 2%;
    }

</style>



