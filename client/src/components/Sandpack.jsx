import { useState, useRef, useEffect } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackConsole,
    FileTabs,
    useActiveCode,
    useSandpack,
    SandpackFileExplorer,
    useSandpackNavigation,
    useSandpackConsole,
    UnstyledOpenInCodeSandboxButton
  } from "@codesandbox/sandpack-react";

const Sandpack = ({loadFiles, onDataChange}) => {

  const [selectedTab, setSelectedTab] = useState('preview')
  const [currFiles, setCurrFiles] = useState({'/index.js': `export default () => return "";`})
  const [count, setCount] = useState(1)
  const { sandpack } = useSandpack()
  const { updateCode } = useActiveCode()
  const { files } = sandpack
  const { refresh } = useSandpackNavigation()
        
  useEffect(() => {
    loadFiles({...currFiles})
    onDataChange({'/App.js': files['/App.js'].code, '/package.json': files['/package.json'].code, '/index.js': files['/index.js'].code, '/styles.css': files['/styles.css'].code, '/public/index.html': files['/public/index.html'].code})
  }, [])

  useEffect(() => {
    loadFiles({...currFiles})
    onDataChange({ '/App.js': files['/App.js'].code, '/index.js': {code: files['/index.js'].code, hidden: true}, '/package.json': {code: files['/package.json'].code, hidden: true}, '/styles.css': {code: files['/styles.css'].code, hidden: true}, '/public/index.html': {code: files['/public/index.html'].code, hidden: true}})
  }, [files])

  function handleFile () {
    setCurrFiles({...currFiles, [`/src/index${count}.js`]: `export default () => return ""`}) // will let us dynamically load content with [] in json
    setCount(count + 1)
    loadFiles({...currFiles})
    onDataChange({...currFiles})
  }

  const updateData = () => {
    onDataChange({'/index.js': files['/index.js'].code, '/App.js': files['/App.js'].code, '/package.json': files['/package.json'].code, '/styles.css': files['/styles.css'].code, '/public/index.html': files['/public/index.html'].code})
  }

  const handlePreviewClick = () => {
      setSelectedTab('preview')
  }
  const handleConsoleClick = () => {
      setSelectedTab('console')
  }

  const defaultEditorOptions = { // using a json object to hold certain parameters that we would want to destructure and use as props to components
    showNavigator: false,
    showInlineErrors: true,
    showLineNumbers: true,
    editorHeight: 300
  };

  const [open, setOpen] = useState(false)

  function handleClick() {
    const newStatus = !open
    setOpen(newStatus)
  }

  return (
    <SandpackLayout>
      <SandpackFileExplorer 
        onClick={handleClick}
        style={{
          height: defaultEditorOptions.editorHeight + 40, 
          display: open === true ? 'flex': 'none',
          position: 'absolute',
          zIndex: 1,
          width: '20%',
          }}/>
      <div style={{width: '49.9%'}}>
          <div className='flex h-10'>
            <FileTabs style={{
              width: '90%'
            }}/>
            <button onClick={handleClick} className="relative z-[2] w-[10%] bg-white h-[98%] border-bottom-gray">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="File / Folders">
                  <path id="Vector" d="M3 11V19.4C3 19.9601 3 20.2396 3.10899 20.4535C3.20487 20.6417 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.03901 21 4.59797 21L15.4014 21C15.9603 21 16.2408 21 16.4545 20.8911C16.6427 20.7952 16.7948 20.6421 16.8906 20.4539C16.9996 20.24 16.9996 19.96 16.9996 19.3999L17.0011 15.0006M3 11H10M3 11L3 10.6001C3 10.0401 3 9.75979 3.10899 9.5459C3.20486 9.35774 3.35774 9.20486 3.5459 9.10898C3.75977 9.00001 4.03975 9.00001 4.59961 9.00001L7 9M10 11H15.4C15.96 11 16.242 11 16.456 11.109C16.6441 11.2049 16.7948 11.3577 16.8906 11.5459C16.9996 11.7598 16.9996 12.0398 16.9996 12.5999L17.0011 15.0006M10 11L8.9248 9.61768C8.74861 9.39115 8.66017 9.27743 8.5498 9.1958C8.45201 9.12347 8.34303 9.06979 8.2259 9.037C8.09373 9.00001 7.9488 9.00001 7.66191 9.00001L7 9M7 5H19.4C19.9601 5 20.242 5 20.4559 5.10899C20.6441 5.20487 20.7948 5.35774 20.8906 5.5459C20.9996 5.75981 20.9996 6.03984 20.9996 6.59989V13.3999C20.9996 13.96 20.9996 14.24 20.8906 14.4539C20.7948 14.6421 20.6432 14.7952 20.4551 14.8911C20.2414 15 19.9613 15 19.4023 15L17.0011 15.0006M7 5V9M7 5L7 4.6001C7 4.04014 7 3.75979 7.10899 3.5459C7.20486 3.35774 7.35774 3.20487 7.5459 3.10899C7.75981 3 8.03956 3 8.59961 3H11.6615C11.9487 3 12.0913 3 12.2236 3.03701C12.3407 3.0698 12.452 3.12347 12.5498 3.1958C12.6602 3.27743 12.7486 3.39115 12.9248 3.61768L13.9999 4.99998" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
            </button>
          </div>
          <SandpackCodeEditor closableTabs showRunButton showLineNumbers showTabs={false}
          style={{
              height: defaultEditorOptions.editorHeight,
          }} onChange={updateCode}/>
      </div>
          {/* <div className='flex'>
              <FileTabs
              style={{
                  width: '80%'
              }}/>
              <button className='w-[20%] h-10 bg-white' onClick={handleFile}>+</button>
          </div> */}
      <div className="w-[49.9%]">
        <div className="flex justify-between items-center h-10 bg-white border-solid-[#efefef] border-[0.9px]">
          <div className="flex justify-center items-center gap-4 ml-4">
            <button onClick={handlePreviewClick} className={`${selectedTab === 'preview' ? 'text-[#4872D9]' : 'black'}`}>Preview</button>
            <button onClick={handleConsoleClick} className={`${selectedTab === 'console' ? 'text-[#4872D9]' : 'black'}`}>Console</button>
          </div>
          <div className="flex justify-center gap-3 items-center mr-6">
            {/* <button className="border-[1px] w-[24px] h-[24px] border-[gray] items-center rounded-md flex justify-center">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button> */}
            <UnstyledOpenInCodeSandboxButton>
              <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                <g>
                    <g>
                        <path d="M360.923,302.912h-16.328c-6.765,0-12.249,5.485-12.249,12.249c0,6.764,5.484,12.249,12.249,12.249h16.328 c6.765,0,12.249-5.485,12.249-12.249S367.688,302.912,360.923,302.912z"/>
                    </g>
                </g>
                <g>
                  <g>
                      <path d="M499.751,302.912H475.18v-27.817c0-6.764-5.484-12.249-12.249-12.249h-43.896l-40.27-31.461l54.183-54.191
                          c6.118,4.329,13.306,6.502,20.497,6.502c9.096,0,18.193-3.461,25.117-10.386l11.085-11.085c2.297-2.297,3.588-5.413,3.588-8.661
                          c0-3.248-1.291-6.363-3.588-8.661l-41.732-41.732c-2.297-2.297-5.413-3.588-8.661-3.588c-0.001,0-0.002,0-0.004,0
                          c-3.25,0.001-6.366,1.293-8.662,3.593l-11.069,11.08c-12.402,12.402-13.689,31.764-3.889,45.612l-56.315,56.323l-9.015-7.043
                          c-55.521-43.382-133.077-43.382-188.599-0.001l-68.749,53.7H49.056c-6.765,0-12.249,5.485-12.249,12.249v27.817H12.249
                          C5.484,302.912,0,308.397,0,315.161s5.484,12.249,12.249,12.249h24.559v72.758c0,6.764,5.484,12.249,12.249,12.249h413.875
                          c6.765,0,12.249-5.485,12.249-12.249V327.41h24.571c6.765,0,12.249-5.485,12.249-12.249S506.516,302.912,499.751,302.912z
                          M436.847,131.572l2.412-2.415l24.405,24.406l-2.424,2.424c-4.298,4.298-11.291,4.299-15.59,0l-8.806-8.819
                          C432.544,142.869,432.544,135.875,436.847,131.572z M176.783,228.452c46.642-36.441,111.792-36.444,158.435,0l44.025,34.395
                          H132.749L176.783,228.452z M61.305,387.919V327.41h244.498c6.765,0,12.249-5.485,12.249-12.249s-5.484-12.249-12.249-12.249
                          H61.305v-15.568H97.17h317.648h35.865v15.568H403.39c-6.765,0-12.249,5.485-12.249,12.249s5.484,12.249,12.249,12.249h47.293
                          v60.509H61.305z"/>
                  </g>
                </g>
              </svg>
            </UnstyledOpenInCodeSandboxButton>
            <button onClick={() => refresh()}>
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 19.75C9.91421 19.75 10.25 19.4142 10.25 19C10.25 18.5858 9.91421 18.25 9.5 18.25V19.75ZM11 5V5.75C11.3033 5.75 11.5768 5.56727 11.6929 5.28701C11.809 5.00676 11.7448 4.68417 11.5303 4.46967L11 5ZM9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L9.53033 2.46967ZM1.25 12C1.25 12.4142 1.58579 12.75 2 12.75C2.41421 12.75 2.75 12.4142 2.75 12H1.25ZM3.86991 15.5709C3.63293 15.2312 3.16541 15.1479 2.82569 15.3849C2.48596 15.6219 2.40267 16.0894 2.63965 16.4291L3.86991 15.5709ZM9.5 18.25H9.00028V19.75H9.5V18.25ZM9 5.75H11V4.25H9V5.75ZM11.5303 4.46967L9.53033 2.46967L8.46967 3.53033L10.4697 5.53033L11.5303 4.46967ZM2.75 12C2.75 8.54822 5.54822 5.75 9 5.75V4.25C4.71979 4.25 1.25 7.71979 1.25 12H2.75ZM2.63965 16.4291C4.03893 18.435 6.36604 19.75 9.00028 19.75V18.25C6.87703 18.25 5.00068 17.1919 3.86991 15.5709L2.63965 16.4291Z" fill="#1C274C"/>
                <path d="M13 19V18.25C12.6967 18.25 12.4232 18.4327 12.3071 18.713C12.191 18.9932 12.2552 19.3158 12.4697 19.5303L13 19ZM14.4697 21.5303C14.7626 21.8232 15.2374 21.8232 15.5303 21.5303C15.8232 21.2374 15.8232 20.7626 15.5303 20.4697L14.4697 21.5303ZM14.5 4.25C14.0858 4.25 13.75 4.58579 13.75 5C13.75 5.41421 14.0858 5.75 14.5 5.75V4.25ZM22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12H22.75ZM20.1302 8.42907C20.3671 8.76881 20.8347 8.85211 21.1744 8.61514C21.5141 8.37817 21.5974 7.91066 21.3604 7.57093L20.1302 8.42907ZM15 18.25H13V19.75H15V18.25ZM12.4697 19.5303L14.4697 21.5303L15.5303 20.4697L13.5303 18.4697L12.4697 19.5303ZM14.5 5.75H15V4.25H14.5V5.75ZM21.25 12C21.25 15.4518 18.4518 18.25 15 18.25V19.75C19.2802 19.75 22.75 16.2802 22.75 12H21.25ZM21.3604 7.57093C19.9613 5.56497 17.6342 4.25 15 4.25V5.75C17.1232 5.75 18.9995 6.80806 20.1302 8.42907L21.3604 7.57093Z" fill="#1C274C"/>
              </svg>
            </button>
            {/* <button className="border-[1px] w-[24px] h-[24px] border-[gray] items-center rounded-md flex justify-center">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8L16 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 8L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button> */}
          </div>
        </div>
        <SandpackConsole
          showHeader
          resetOnPreviewRestart={true}
          showSyntaxError={true}
          style={{
            height: defaultEditorOptions.editorHeight,
            display: selectedTab === 'console' ? 'flex' : 'none',
          }}
        />
        <SandpackPreview
          showNavigator={defaultEditorOptions.showNavigator}
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
          style={{ // can set styles of react components just like this; accepts a java script object (inner brackets); outer brackets is for dynamic reading
            height: defaultEditorOptions.editorHeight,
            display: selectedTab === 'preview' ? 'flex' : 'none',
          }}
        />
      </div>
    </SandpackLayout>
  )
}

export default Sandpack
