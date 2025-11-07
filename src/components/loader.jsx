import { useRef } from "react";

const Loader = () => {
    const containerRef = useRef(null);

    const replayAnimation = () => {
        const root = containerRef.current;
        if (!root) return;

        // find all elements that have an animate-* class
        const animatedEls = Array.from(root.querySelectorAll("[class*='animate-']"));

        // For each element: remove animate classes, force reflow, re-add on next frame
        animatedEls.forEach((el) => {
            const elem = el;
            const classesToRemove = Array.from(elem.classList).filter((c) =>
                c.startsWith("animate-")
            );
            if (!classesToRemove.length) return;

            // remove animate classes
            elem.classList.remove(...classesToRemove);

            // extra safety: remove inline animation if any
            elem.style.animation = "none";

            // force reflow
            void elem.offsetWidth;

            // re-add classes on next frame so browser treats it as new animation
            requestAnimationFrame(() => {
                // clear the temporary inline rule then add classes
                elem.style.animation = "";
                elem.classList.add(...classesToRemove);
            });
        });
    };


    return (
        <div ref={containerRef}>
            <div className='flex flex-col gap-2 justify-center items-center animate-translate-up'>
                {/* Top rotating star */}
                <div className='flex relative '>
                    <div className='absolute animate-rotate-scale-star'>
                        <div className='bg-white flex w-full h-[50%]'>
                            <div className='bg-black w-full rounded-br-full'></div>
                            <div className='bg-black w-full rounded-bl-full'></div>
                        </div>
                        <div className='bg-white flex w-full h-[50%]'>
                            <div className='bg-black w-full rounded-tr-full'></div>
                            <div className='bg-black w-full rounded-tl-full'></div>
                        </div>
                    </div>
                </div>

                {/* translating semi-star */}
                <div className='flex  border-t w-[200px] h-[100px] relative overflow-hidden animate-fade-reveal-up'>
                    <div className='bg-black w-[100px] rounded-tr-full border-e z-20'></div>
                    <div className='bg-black w-[100px] rounded-tl-full border-s z-20'></div>
                    <div className='w-[300px] h-[300px] bg-white absolute rotate-45 animate-move-diagonal'></div>
                </div>

                {/* text */}
                <div className='text-6xl mt-10 animate-text-opacity items-center flex justify-between gap-10'>
                    <span>E</span>
                    <span>L</span>
                    <span>E</span>
                    <span>V</span>
                    <span>A</span>
                    <span>T</span>
                    <span>E</span>
                </div>
            </div>

            <button
                className="mt-6 bg-[#1a1a1a] px-4 py-2 rounded-md border-1 border-transparent transition-all duration-300 ease-in-out cursor-pointer hover:border-white animate-replay-button-reveal"
                onClick={replayAnimation}
            >
                Replay Animation
            </button>
        </div>
    )
}

export default Loader