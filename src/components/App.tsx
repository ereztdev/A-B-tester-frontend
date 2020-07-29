import * as React from 'react';
import '../styles/main.scss';
import Test from "~/components/TestComponent";
import {useEffect, useState} from "react";
// import {Simulate} from "react-dom/test-utils";
// import click = Simulate.click;

const App: React.FC = () => {
    //our state
    const [chosenTest, setChosenTest] = useState('');
    const [trafficSent, setTrafficSent] = useState(false);
    const [testsAreOperable, setTestsAreOperable] = useState(true);

    useEffect(() => {
        const clickedOverlay = document.querySelector(`.TW_${chosenTest} .overlay`);
        const allOverlay = document.querySelectorAll(`.overlay`);
        const fullScreenOverlay = document.querySelector('.fullscreenOverlay');

        if (allOverlay && testsAreOperable)
            allOverlay.forEach(overlay => overlay.classList.remove('overlay_picked'))
        if (clickedOverlay && testsAreOperable)
            clickedOverlay.classList.add('overlay_picked');

        if (chosenTest !== '') {
            document.title = `Hello ${chosenTest}`;
        }
        if (trafficSent){
            console.log(fullScreenOverlay);
        }

    }, [chosenTest])

    return <div className={`main--wrapper`}>
        <div style={trafficSent ? {display:'block'} : {display:'none'}} className={`fullscreenOverlay`}/>
        <div className="container">
           { <div className="row crazyText">
               {/*<h1 className={`text-center`}>A/B TESTING</h1>*/}
               {/* {chosenTest !== ''  && <h2 className={`text-center`}>You've Chosen {chosenTest}</h2>}*/}
                <h4 className={`text-center`}
                    style={
                        {fontWeight: 900,
                            visibility:(chosenTest === '' && !trafficSent)? 'hidden': 'visible'
                        }
                    }
                >You've Chosen {chosenTest}
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
                            // setChosenTest('');
                            setTestsAreOperable(false);
                        }}
                        className={`btn btn-primary btn-sm my-5 sendTraffic`}
                >Send<br className='d-sm-none'/>🌼<br className='d-sm-none' /> Traffic</button>
            </div>
        </div>
    </div>
};
export default App;