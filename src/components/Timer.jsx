import { useEffect, useState } from "react";

export const Timer = ({isActive}) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let timer
        if (isActive) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [isActive])


    const format = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    };

    return (
        <div className="time">
            {format(time)}⌛
        </div>
    );
};
