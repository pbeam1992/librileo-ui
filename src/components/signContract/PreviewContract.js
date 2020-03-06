import React, {useContext} from "react";

// Context
import ContractContext from '../../context/contract/contractContext';

const PreviewContract = props => {

    const contractContext = useContext(ContractContext);
    const {previewPath} = contractContext;

    return (
        <React.Fragment>
            {previewPath && <iframe title={'preview'} src={previewPath} className='iframe-preview' style={{height: 600}}/>}
        </React.Fragment>
    )
};


export default PreviewContract;