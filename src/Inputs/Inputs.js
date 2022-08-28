import React, { useState } from "react";
import ActionLink from "../Draw/ActionLink";
import './Inputs.css';

const Inputs = () =>{

    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    const [showActionLink, setShowActionLink] = useState(false);

    const handleOnClick = (e) =>{
        console.log('width ->', width);
        console.log('height ->', height);
        e.preventDefault();
        setShowActionLink(true);
    }

    return (
        <>
            { !showActionLink &&
                <div>
                    <label>Enter The width: </label>
                    <input name="width" type={"number"} defaultValue={width} onChange={ (e) => (setWidth(e.target.value))}/>
                    <br />
                    <label>Enter The height: </label>
                    <input name="height" type={"number"} defaultValue={width} onChange={ (e) => (setHeight(e.target.value))}/>
                    <br />
                    <input name="submit" onClick={handleOnClick} type={"submit"} defaultValue={400} />
                </div>
            }
            <div>
                {showActionLink && <ActionLink props={{width, height}} />}
            </div>
        </>
    )
}

export default Inputs;