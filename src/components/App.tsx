import * as React from 'react';
import '../styles/main.scss';
import Test from "~/components/TestComponent";
import {useEffect, useState} from "react";
import axios from 'axios';
// import {Simulate} from "react-dom/test-utils";
// import click = Simulate.click;

const App: React.FC = () => {
    //our state
    const [chosenTest, setChosenTest] = useState('');
    const [trafficSent, setTrafficSent] = useState(false);
    const [testsAreOperable, setTestsAreOperable] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showSuccess, setShowSuccess] = useState('');

    const clickedOverlay = document.querySelector(`.TW_${chosenTest} .overlay`);
    const allOverlay = document.querySelectorAll(`.overlay`);

    const fetchData = async () => {
        return axios(
            /*'https://hn.algolia.com/api/v1/search?query=widerfunnel',*/
            'http://localhost:3000/api'
        );
    };
    useEffect(() => {
        if (allOverlay && testsAreOperable)
            allOverlay.forEach(overlay => overlay.classList.remove('overlay_picked'))
        if (clickedOverlay && testsAreOperable)
            clickedOverlay.classList.add('overlay_picked');
        if (chosenTest !== '') {
            document.title = `Let's Test ${chosenTest}`;
        }
    }, [chosenTest]);

    return <div className={`main--wrapper`}>
        <div style={showOverlay ? {display: 'block'} : {display: 'none'}} className={`fullscreenOverlay`}/>
        <div style={showSuccess ? {display: 'block'} : {display: 'none'}} className={`fullscreenSuccess`}>
            <div className='textCaption'>
                <h1 className='text-center'>SUCCESS! 🤘</h1>
                <h2 className='text-center'>{showSuccess}</h2>
            </div>
        </div>
        <div className="container">
            {<div className="row crazyText">
                <img src='https://fontmeme.com/permalink/200729/a47a1659269e3dac26d2ec665771c574.png'/>
                {/*<h1 className={`text-center`}>A/B TESTING</h1>*/}
                {/* {chosenTest !== ''  && <h2 className={`text-center`}>You've Chosen {chosenTest}</h2>}*/}
                <h4 className={`text-center`}
                    style={
                        {
                            fontWeight: 900,
                            visibility: (chosenTest === '' && !trafficSent) ? 'hidden' : 'visible'
                        }
                    }
                >You've Chosen Test {chosenTest}
                </h4>
                <p className={`text-center`}>compare different UI states in order to receive
                    the largest CR for that page
                </p>
            </div>}
            <div className="row">
                <div onClick={() => {
                    !trafficSent ? setChosenTest('A') : false
                }} className="col-md-6 my-3">
                    <Test type={`A`}/>
                </div>
                <div onClick={() => {
                    !trafficSent ? setChosenTest('B') : false
                }} className="col-md-6 my-3">
                    <Test type={`B`}/>
                </div>
            </div>
            <div className="row">
                <button disabled={chosenTest === '' || trafficSent}
                        onClick={() => {
                            setTrafficSent(true);
                            setShowOverlay(true);
                            setTestsAreOperable(false);
                            fetchData().then((resolve) => {
                                setShowOverlay(false);
                                if (resolve.status === 200) {
                                    setShowSuccess(resolve.data.message);
                                    setTimeout(function () {
                                        window.location.reload(false);

                                    },2200);
                                }
                            });
                        }}
                        className={`btn btn-primary btn-sm my-5 sendTraffic`}
                >Send<br className='d-sm-none'/>🌼<br className='d-sm-none'/> Traffic
                </button>
            </div>
        </div>
    </div>
};
export default App;