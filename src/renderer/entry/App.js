import './App.less';
import {useEffect} from "react";

function App() {
	useEffect(() => {
		let webIns = document.getElementById('webview');
		webIns.addEventListener('dom-ready', () => {
			webIns.openDevTools();
			// webIns.executeJavaScript(webviewScripts.getScript(_.toNumber(data?.systemId), data?.account, data?.password));
		});
	}, [])
  
  return (
    <div className="App">
      <webview id="webview" src={"https://www.xiaohongshu.com/explore"} />
    </div>
  );
}

export default App;
