import React, {FunctionComponent} from 'react';

type ImgProps = {
    src: string,
    type: string
}

export const Image: FunctionComponent<ImgProps> = ({src, type}) =>
    <img className={`img-responsive w-100 type_is_${type}`}
         src={src}
         style={
        {

        }
    }/>