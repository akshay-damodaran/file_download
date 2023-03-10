const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const base_path = "/Users/akshay/Projects/file_download/"
const file1_path = "/Users/akshay/Projects/file_download/sample_img.png"
const file2_path = "/Users/akshay/Projects/file_download/sample_pdf.pdf"

app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello World!')
});

app.get('/list_files', (_, res) => {
  res.json([
    {
      file_name: "sample_img.png",
      file_path: file1_path
    },
    {
      file_name: "sample_pdf.pdf",
      file_path: file2_path
    }
  ])
})

app.get('/get_file/:file_name', (req, res) => {
  file_name = req.params.file_name
  res.download(base_path + file_name, file_name)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
