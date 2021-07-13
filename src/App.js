import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import marked from 'marked'

export const App = () => {
  const inputFile = useRef(null)
  const [htmlObjects, setHtmlObjects] = useState([])
  const history = useHistory()

  const useUploadFiles = (event) => {
    const { files } = event.target

    Object.values(files).forEach((file) =>
      getFileContent(file).then((result) =>
        setHtmlObjects((prev) => [
          ...prev,
          { name: parseName(file.name), html: result },
        ])
      )
    )
  }

  const parseName = (name) =>
    name
      .split('.')
      .slice(0, -1)
      .join('.')
      .toLowerCase()
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .join('-')

  const getFileContent = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (reader.readyState === 2) {
          return res(marked(reader.result))
        }
      }

      reader.readAsText(file)
    })

  const onButtonClick = () => inputFile.current.click()

  return (
    <div>
      <div className="button" onClick={onButtonClick}>
        Upload
      </div>
      <div id="content">
        {htmlObjects.map((htmlObject, i) => (
          <div
            onClick={() =>
              history.push(`blog/${htmlObject.name}`, { html: htmlObject.html })
            }
            key={i}
          >
            {htmlObject.name}
          </div>
        ))}
      </div>
      <input
        style={{ display: 'none' }}
        accept=".md"
        ref={inputFile}
        onChange={useUploadFiles}
        type="file"
        multiple
      />
    </div>
  )
}
