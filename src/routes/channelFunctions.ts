import { channels } from "./channelObject.js";

export class ChannelFunctions {
    hoverSound = 1;
    clickSound = 2;
    musicClip = 3;
    backgroundMusic = 4;

    staticImage(event: PointerEvent, id: number) {
        channels[id].currentImage = channels[id].coverImage;
        channels[id].hover = false;
    }

    async playgif(event: PointerEvent, id: number) {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        channels[id].hover = true;
        await sleep(1000);
        channels[id].hover ? channels[id].currentImage = channels[id].gifImage : null;
    }

    playMusic(id: number, bg: HTMLAudioElement, song: HTMLAudioElement, background: boolean) {
        if (background){
            song.pause();
            bg.volume = 0.2
            bg.play()
        } else{
            bg.pause();
            song.currentTime = 0;
            song.volume = channels[id].volumeLevel;
            song.play();
        }
    }

    redirect(id: number) {
        if (channels[id].redirect == '') return;
        if (channels[id].redirect == '/ctgrassroots') window.open("https://ctgrassroots.org");
        else{
          location.href = channels[id].redirect;
        }
    }


    // https://developer.mozilla.org/en-US/docs/Web/CSS/animation

};
