import React, { useState } from 'react';
import { HiddenRadioButtonInput, RadioButtonWrapper, TestCustomRadio } from '../RadioButtons/RadioButtons'
import { HexBox } from './HexInput';
import { white } from '../../utilities/Colors';
import { pop_bolder } from '../../utilities/Type';
import { ColorSlider } from './ContrastRatio';
import { LumSlider } from './ContrastRatio';
import { CounterBox, CounterWrapper, ArrowButtonUp, ArrowButtonDown} from '../FontCounter/FontCounter'
import { ContrastRatioActivity, ContrastRatioBox, ContrastRatioResult} from './ContrastRatio';
import { withDesign } from "storybook-addon-designs";

const tinycolor = require("tinycolor2")

export default {
  title: "Contrast Ratio",
  decorators: [withDesign],
};


export const ContrastRatioPage = (args) => {

  //Contrast Ratio (Pass or Fail) Result
  const [testResult, setTestResult] = useState('FAIL');

  //Contrast Ratio (Numerical) Result
  const [contRatio, setContRatio] = useState('2.72');

  // Ratio Box Color depending on passed (green) or failed (red) test
  const [Color, setColor] = useState('red');

  //Page Text Color depending on Text Hex Input Box
  const [textColor, setTextColor] = useState('#FE02FC');

  //Page Background Color depending on Background Hex Input Box
  const [backgroundColor, setBackgroundColor] = useState('#413F9F');

  // For Hex Input Box (Text)
  const [textBoxValue, setTextBoxValue] = useState('');
  const [prevTextInputValue, setPrevTextInputValue] = useState('');

  // For Hex Input Box (Background)
  const [backgroundBoxValue, setBackgroundBoxValue] = useState('');
  const [prevBackgroundInputValue, setPrevBackgroundInputValue] = useState('');

  // For Font-Counter
  const [fontCounterValue, setFontCounterValue] = useState(100);
  const [prevFontValue, setPrevFontValue] = useState(0);
  let currentFontValue;
  let fontCountLength = 0;


  const handleHexChange = (e) => {
    let currentValue = e.target.value;
    let boxType = e.target.dataset.type
    let charLength = currentValue.length;

    
    if (charLength < 7 && currentValue.match(/^[a-fA-F0-9]+$/i)) {

      if(boxType === 'text')
      {
        setTextBoxValue(currentValue);
        setPrevTextInputValue(currentValue);
        if(charLength === 6){setTextColor('#' + currentValue);}

          //setTextColor(currentValue)
          console.log("text: " + currentValue, charLength)
      }


      if(boxType === 'background')
      {
        setBackgroundBoxValue(currentValue);
        setPrevBackgroundInputValue(currentValue);
        if(charLength === 6){setBackgroundColor('#' + currentValue);}
        
          //setBackgroundColor(currentValue)
          console.log("background: " + currentValue, charLength)
      }

        if(charLength === 6) {
          setContRatio((tinycolor.readability("#" + textBoxValue, "#" + backgroundBoxValue)).toFixed(2))
        }

        if(charLength === 6 && tinycolor.isReadable("#" + textBoxValue, "#" + backgroundBoxValue,{level:"AA",size:"small"}))
        { 
            setTestResult('AA PASS');
            setColor('green');
          
        } 
        else if (charLength !== 6 || charLength === 6 && !tinycolor.isReadable("#" + textBoxValue, "#" + backgroundBoxValue,{level:"AA",size:"small"}))
        {
          setTestResult('FAIL');
          setColor('red');
        } 

    }
    else if(boxType === 'text') 
    {
      setTextBoxValue('');
      setTestResult('FAIL');
    }
    else if(boxType === 'background')
    {
      setBackgroundBoxValue('');
      setTestResult('FAIL');
    }
  }

       
  const handleFontChange = (e) => {
    currentFontValue = e.target.value;
    fontCountLength = currentFontValue.length;

    if(fontCountLength <= 2) {
      setPrevFontValue(parseInt(currentFontValue));
      setFontCounterValue(parseInt(currentFontValue));
    } else {
      e.target.value = prevFontValue;
      setFontCounterValue(prevFontValue)
    }
  }

  const handleFontClick = (e) => {
    let arrowDirection = e.target.dataset.direction;
    currentFontValue = parseInt(fontCounterValue);

    if(arrowDirection === 'up') {
      if(currentFontValue < 100) {
        currentFontValue += 1;
        setFontCounterValue(currentFontValue);
      }
    }
    else {
      if(currentFontValue > 0) {
        currentFontValue -= 1;
        setFontCounterValue(currentFontValue);
      }
    }
  }


  return (
<>
  <ContrastRatioActivity style={{backgroundColor: backgroundColor}}>

  <div style={{display: 'inherit', flexDirection: 'row', justifyContent: 'space-between', height: '100px', maxHeight: '100px' }}>
      
      <p style={{color: textColor, fontSize:fontCounterValue, margin: '0'}}>Aa</p>

      <div>
        <ContrastRatioBox style={{backgroundColor: Color}}>
          <p style={{fontSize:'13px', paddingLeft:'20px', margin:'11px 0 0 0'}}>Contrast Ratio</p>
          <p style={{fontSize:'18px', padding:'10px 0 0 40px', margin:'0'}}>{contRatio}:1</p>
        </ContrastRatioBox>
      
        <ContrastRatioResult style={{color: Color }}>{testResult}</ContrastRatioResult>
      </div>  

  </div>

  <div style={{color: textColor, display: 'inherit', flexDirection: 'row', justifyContent: 'flex-start', maxWidth: '600px'}}>

    <p>The W3C color contrast guidelines are graded via a AA or AAA standard.  AA is best practice and requires a minimum 3:1 ratio for large-sized text and 4.5:1 ratio for regular sized text.  Adjusting font size, color, or luminance of the text or background can help you reach an acceptible color contrast ratio to meet AA standards.</p>

  </div>

  <div style={{display: 'inherit', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      
      <div>
        
        <RadioButtonWrapper {...args} style={{color: textColor}}>
          <HiddenRadioButtonInput type='radio' {...args} />
          <TestCustomRadio {...args} />
          Text
        </RadioButtonWrapper>

        <span style={{ position: "relative", left: "15px", zIndex: "2", color: 'white', font: pop_bolder }}>#</span>
        <HexBox style={{padding: '15px'}} onChange={handleHexChange} className='hexBox' type='text' maxLength='6' value={textBoxValue} data-type='text' {...args}></HexBox>
      </div>


        <CounterWrapper>
          <CounterBox onChange={handleFontChange} type='number' value={fontCounterValue} ></CounterBox>
          <ArrowButtonUp data-direction='up' onClick={handleFontClick} />
          <ArrowButtonDown data-direction='down' onClick={handleFontClick} />
        </CounterWrapper>

      <div>
        <RadioButtonWrapper {...args} style={{color: textColor}} >
          <HiddenRadioButtonInput type='radio' {...args} />
          <TestCustomRadio {...args} />
          Background
        </RadioButtonWrapper>

      
        <span style={{ position: "relative", left: "15px", zIndex: "2",color: 'white', font: pop_bolder }}>#</span>
        <HexBox style={{padding: '15px'}} onChange={handleHexChange} data-type='background' className='hexBox' type='text' maxLength='6' value={backgroundBoxValue} {...args}></HexBox>
      </div>
  </div>

  <div style={{display: 'inherit', backgroundColor: 'transparent', flexDirection: 'row'}}>

      <ColorSlider type='range' className='slider'></ColorSlider>

  </div>

  <div style={{display: 'inherit', backgroundColor: 'transparent', flexDirection: 'row'}}>

    <LumSlider className='lumosity' type='range' ></LumSlider>

  </div>

  </ContrastRatioActivity>
</>
  )
}

ContrastRatioPage.args = {
  checked: false
}

