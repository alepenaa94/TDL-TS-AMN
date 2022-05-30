import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const AboutPage: React.FunctionComponent<IPage> = props => {
    useEffect(()=> {
        console.log(`Loading ${props.name}`)
    },[])
    return (
        <div>
            This is the ABOUT page!!
        </div>
    )
}

export default AboutPage;