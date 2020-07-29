import React from 'react';
import {Image} from "~/components/Image";

type TestProps = {
    type: string,
}
const Test: React.FC<TestProps> = ({type}) => {
    return <>
        <div className={`test--wrapper TW_${type}`}>
            <div className={`overlay`}>
            </div>
            <h1 className={`h1_${type}`}>{type}</h1>
            <Image type={type} src={`https://source.unsplash.com/400x300?sig=${type === 'A' ? 1 : 2}`}/>
        </div>
    </>
}
export default Test;