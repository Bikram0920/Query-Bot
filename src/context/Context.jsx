import { createContext, useState } from "react";
import run from "../config/geminiApi";

export const Context = createContext();

const ContextProvider = (props) =>{

  const [input,setInput] = useState("");
  const [recentPrompt,setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }

  const delayPara = (index,nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    },75*index)
  }

  const onSent = async (prompt) =>{
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let result;
    if (prompt !== undefined) {
      result = await run(prompt);
      setRecentPrompt(prompt);
    }
    else{
      setPreviousPrompts(prev => [...prev,input])
      setRecentPrompt(input);
      result = await run(input);
    }

    

    let formattedResponse = result.replace(/\n\n/g, '\n');
    let resultArray = formattedResponse.split("**");
    let newResponse = "";
    for(let i = 0; i < resultArray.length; i++){
      if(i === 0 || i%2 !== 1){
        newResponse += resultArray[i]
      }
      else{
        newResponse += "<b>"+resultArray[i]+"</b>"
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>")
    let newResponseArray = newResponse2.split(" ");

    for(let i = 0; i < newResponseArray.length; i++){
      const nextWord = newResponseArray[i];
      delayPara(i,nextWord+" ")
    }
    setLoading(false);
    setInput("");
  }

  // onSent("What is react js?");

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;