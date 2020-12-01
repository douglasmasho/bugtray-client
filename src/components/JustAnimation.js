import React, {useEffect, useRef} from 'react';
import LoadingAnim from "../animations/loading.json";
import lottie from "lottie-web";

const JustAnmimation = () => {
    const animContainerLoading = useRef(),
    animRefLoading = useRef(null);

    useEffect(()=>{
        animRefLoading.current = lottie.loadAnimation({
            container: animContainerLoading.current,
            animationData: LoadingAnim,
            loop: true,
        });
        animRefLoading.current.goToAndPlay(11, true);

    },[])
    return ( 
        <div ref={animContainerLoading}>
        </div>
     );
}
 
export default JustAnmimation;