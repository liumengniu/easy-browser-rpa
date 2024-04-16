import './App.less';
import {useEffect} from "react";

function App() {
  useEffect(()=>{
  }, [])
  
  return (
    <div className="App">
      <webview id="webview" src={"https://ant-design.antgroup.com/components/overview-cn/"} />
    </div>
  );
}

export default App;
