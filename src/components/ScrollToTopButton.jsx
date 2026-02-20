import React from "react";
import { useState, useEffect } from "react";

export default function ScrollToTopButton(){
     const [isVisible, setIsVisible] = useState(false);

     
      const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    return(
        <h1>teri maa ki</h1>
    )
}