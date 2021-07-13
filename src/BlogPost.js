import { useLocation, useHistory } from 'react-router-dom'

export const BlogPost = () => {
  const { state } = useLocation()
  const history = useHistory()

  if (!state || !state.html) history.goBack()

  return (
    <>
      <button onClick={() => history.goBack()}>reset</button>
      <div dangerouslySetInnerHTML={{ __html: state.html }} />
    </>
  )
}
