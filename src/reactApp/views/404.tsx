import React, {useEffect, useState} from "react";

const Error404: React.FC = (props) => {
    const [testData, setTestData] = useState("");

    useEffect(()=>{
        window.electronAPI.getProjects().then((resp)=>console.log("RESP",resp)).catch((err)=>console.log("ERR", err))
    },[])


    return (
        <div style={{ height: "100%" }}>
            {testData}
          <p>404 ERROR</p>
        </div>
    );
};

export default Error404;
