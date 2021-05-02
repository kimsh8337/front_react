import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import axios from 'axios';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    minHeight: '10vh'
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
    minHeight: '10vh'
  },
}));


const Feature = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [imgUrl, setImgUrl] = useState([]);
    const [mimgUrl, setMimgUrl] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);


    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    useEffect(()=>{
        const url = []
        const murl = []

        axios.get('https://node.wingeat.com/test-api/features')
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                url.push("https://image.wingeat.com/"+res.data[i].image)
                murl.push("https://image.wingeat.com/"+res.data[i].mobileImage)
            }
            setImgUrl(url)
            setMimgUrl(murl)
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    return (
        <div className={classes.root}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                className="d-none d-sm-block"
                >
                    {imgUrl.map((url, index) => (
                        <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={url} alt={url} />
                        ) : null}
                        </div>
                    ))}
            </AutoPlaySwipeableViews>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                className="d-block d-sm-none d-md-none"
                >
                    {mimgUrl.map((url, index) => (
                        <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={url} alt={url} />
                        ) : null}
                        </div>
                    ))}
            </AutoPlaySwipeableViews>
      </div>
    );
  }
  export default Feature;
  