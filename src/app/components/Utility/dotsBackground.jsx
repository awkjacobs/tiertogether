import { cn } from "@lib/utils"
import "./dotsBackground.css"

export default function DotsBackground({ className }) {
    return (
        <div className={cn("relative z-0 h-full w-full", className)}>
            <div className="box op90 color2 sm anim1 pos1"></div>
            <div className="box op60 xl anim2 pos2"></div>
            <div className="box op30 md anim3 pos3"></div>
            <div className="box op60 lg anim4 pos4"></div>
            <div className="box op90 xl anim5 pos5"></div>
            <div className="box op60 md anim6 pos6"></div>
            <div className="box op30 xl anim7 pos7"></div>
            <div className="box op60 color2 lg anim8 pos8"></div>
            <div className="box op30 color2 sm anim8 pos9"></div>
            <div className="box op90 xl anim2 pos10"></div>
            <div className="box op60 md anim2 pos11"></div>
            <div className="box op30 lg anim1 pos12"></div>
            <div className="box op90 xl anim5 pos13"></div>
            <div className="box op60 color2 md anim6 pos14"></div>
            <div className="box op30 xl anim1 pos15"></div>
            <div className="box op90 lg anim5 pos16"></div>

            <div className="gap left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 bg-black md:h-[60rem] md:w-[60rem]"></div>
            <div className="texture"></div>
        </div>
    )
}
