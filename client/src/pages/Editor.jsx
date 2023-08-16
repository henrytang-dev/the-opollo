import { useEffect, useRef, useState } from 'react'
import List from '@editorjs/list'
import EditorJS from '@editorjs/editorjs'
import SimpleImage from '../blocks/SimpleImage'
// import { SimpleImage } from '@editorjs/simple-image'
import InlineCode from '@editorjs/inline-code'
import Sandbox from '../blocks/Sandbox'
import Quote from '../blocks/Quote'
import Embed from '@editorjs/embed'
import Table from 'editorjs-table'
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist'
import Paragraph from '../blocks/Paragraph'
import axios from 'axios'
import { useParams, useNavigate, Form } from 'react-router-dom'
import './pages.css'
import blogService from '../services/blog-service'
import { withRouter } from '../common/with-router'
import EditorNavbar from '../components/EditorNavbar'
import Header from '../blocks/Header'

function Editor(props) {

  
  const ref = useRef(null)
  let editor = { isReady: false }

  useEffect(() => {
    if (!editor.isReady) {
      editor = new EditorJS({ 
        holder: "editorjs",
    
        tools: {
          paragraph: Paragraph,
          header: Header,
          embed: Embed,
          list: {
            class: List, 
            inlineToolbar: ['link', 'bold']
          },
          // embed: Embed,
          image: SimpleImage,
          // code: editorjsCodeflask,
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M'
          },
          sandbox: Sandbox,
          // quote: Quote,
          // mermaid: MermaidTool, // will need to look into this more
          table: Table,
          // checklist: editorjsNestedChecklist
        },

        data: {
          time: 1689438901806,
          blocks: [
            {
              type: "image",
              data: {
                url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg",
                caption: 'Here is a caption field',
                withBorder: false,
                withBackground: true,
                stretched: false
              }
            }
          ],
          version: "2.27.2"
        },

        onChange: async () => {
          try {
            const data = await editor.save()
            setOutputData(data)
          } catch (e) {
            console.log('Saving failed: ', e)
          }
        }
      })
    }
  }, [])

  const {username} = useParams()

  const [modal, setModal] = useState(false)

  function toggleModal () {
    setModal(!modal)
  }

  const [title, setTitle] = useState("")

  const [outputData, setOutputData] = useState()
  
  const handleReview = () => {
      toggleModal()
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      // console.log(outputData)
      let paragraph = null;
      let image = null;
      // console.log(paragraph)
      for (let k = 0; k < outputData.blocks.length; k++) {
        if (outputData.blocks[k].type === "paragraph") {
          paragraph = outputData.blocks[k].data.text
          break;
        }
      }
      for (let k = 0; k < outputData.blocks.length; k++) {
        if (outputData.blocks[k].type === "image") {
          image = outputData.blocks[k].data.url
          break;
        }
      }
      // console.log(paragraph)
      const object = {
        title: title,
        url: title,
        data: outputData,
        paragraph: paragraph,
        image: image
      }
      // console.log(object)
      await blogService.publish(object)
      props.router.navigate('/')
      window.location.reload()
    } catch (error) {
      console.log('Error: ', error)
    }
  }


  return (
    <>
      <EditorNavbar handleReview={handleReview} />
      <div id="editorjs" className="mt-[120px]"></div>
      {/* onClick={handleButton}d */}
      {/* <button onClick={handleReview} className="" >Review</button> */}
      <div className={`${modal ? 'flex' : 'hidden'} flex container w-screen h-screen justify-center items-center absolute z-[10] top-0 left-0`}>
        <button className="fixed z-[4] top-0 left-0 w-[80px] h-[80px] border-black items-center rounded-md flex justify-center" onClick={toggleModal}>
          <svg width="65px" height="65px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L16 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 8L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="z-[3] modal-container w-screen h-screen fixed flex right-0 top-0 flex-col justify-center items-center">
          <input type="text" className="border-b-2 title h-[5rem] text-7xl text-center outline-none w-[80%]" onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
          <input className="fixed bottom-10 right-10 submit" type="submit" />
        </form>
      </div>
    </>
  )
}

export default withRouter(Editor)
