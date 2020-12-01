import React, {useEffect, useRef} from 'react';
import LoadingAnim from "../animations/loading.json";
import lottie from "lottie-web";
import btLogo  from "../assets/btlogo.svg";


const Loading = () => {
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
        <div className="loading">
            <div className="center-hrz--col loading--container">
                <img src={btLogo} alt="" className="loading--logo"/>
                <div ref={animContainerLoading}></div>
            </div>

        </div>
     );
}
 
export default Loading;