import React, { useEffect, useState } from "react";
import axios from "axios";
const fileDownload = require('js-file-download');

const base_url = "http://localhost:3000"

function App() {
  const [files, setFiles] = useState([])

  const getFiles = () => {
    axios.get(`${base_url}/list_files`).then((response) => setFiles(response.data))
  }

  const getFile = (file_name) => {
    axios({
      url: `${base_url}/get_file/${file_name}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      fileDownload(response.data, file_name);
    });
  }

  useEffect(() => {
    getFiles();
  }, [])

  return (
    <div className="App">
      <div>
        <p>Method 1</p>
        <ul>
          {files.map(file => <li key={file.file_name}><button onClick={() => getFile(file.file_name)}>{file.file_name}</button></li>)}
        </ul>
      </div>

      <div>
        <p>Method 2</p>
        <ul>
          {files.map(file => <li key={file.file_name}><a href={`${base_url}/get_file/${file.file_name}`} download>{file.file_name}</a></li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
