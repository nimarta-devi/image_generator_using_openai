import {useState} from 'react';
import {Configuration, OpenAIApi} from 'openai';
import './App.css';

function App() {

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: <PASTE YOUR API KEY HERE>,
  })

  const openai = new OpenAIApi(configuration);

  const generateImage = async ()=>{
    setLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256"
    })
    setLoading(false);
    setResult(response.data.data[0].url)
  };

  return (
    <div className="App">
      <h1>React AI Image Generator </h1>
      <div>
        <textarea
          className='text-input'
          placeholder='Enter a prompt'
          onChange={(e)=>setPrompt(e.target.value)}
          row="5"
          cols="50"
        />
      </div>
      <div>
        <button
          className='button'
          onClick={generateImage}
          style={{margin: 20, padding: 8, border: "white"}}
        >
          Generate
        </button>
      </div>
      {
        loading ? (
        <img 
          alt="Image Generation in progress... Please wait" 
          src={"https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"}
          style={{height: 100, width:150}}
        />) : (<></>)
      }
      <div>
        {
          result.length > 0 ?
          (<img style={{borderRadius: 10}} className="result-image" src={result} alt="Generated Image"/>) :
          (<></>)
        }
      </div>
      <p className='footer'>
        powered by OpenAI
      </p>
    </div>
  );
}

export default App;
