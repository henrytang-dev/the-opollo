import ReactDOM from 'react-dom/client'
import Sandpack from "../components/Sandpack";
import { SandpackProvider } from '@codesandbox/sandpack-react';

class Sandbox { // currently for react
    constructor ({data}) {
        this.node = undefined;
        this.data = undefined;
        this.wrapper = undefined;
        this.files = undefined;
        this.template = undefined;
    }

    static get toolbox() {
        return {
          title: 'Code Sandbox',
          icon: '<svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M360.923,302.912h-16.328c-6.765,0-12.249,5.485-12.249,12.249c0,6.764,5.484,12.249,12.249,12.249h16.328 c6.765,0,12.249-5.485,12.249-12.249S367.688,302.912,360.923,302.912z"/></g></g><g><g><path d="M499.751,302.912H475.18v-27.817c0-6.764-5.484-12.249-12.249-12.249h-43.896l-40.27-31.461l54.183-54.191 c6.118,4.329,13.306,6.502,20.497,6.502c9.096,0,18.193-3.461,25.117-10.386l11.085-11.085c2.297-2.297,3.588-5.413,3.588-8.661 c0-3.248-1.291-6.363-3.588-8.661l-41.732-41.732c-2.297-2.297-5.413-3.588-8.661-3.588c-0.001,0-0.002,0-0.004,0 c-3.25,0.001-6.366,1.293-8.662,3.593l-11.069,11.08c-12.402,12.402-13.689,31.764-3.889,45.612l-56.315,56.323l-9.015-7.043 c-55.521-43.382-133.077-43.382-188.599-0.001l-68.749,53.7H49.056c-6.765,0-12.249,5.485-12.249,12.249v27.817H12.249 C5.484,302.912,0,308.397,0,315.161s5.484,12.249,12.249,12.249h24.559v72.758c0,6.764,5.484,12.249,12.249,12.249h413.875 c6.765,0,12.249-5.485,12.249-12.249V327.41h24.571c6.765,0,12.249-5.485,12.249-12.249S506.516,302.912,499.751,302.912z M436.847,131.572l2.412-2.415l24.405,24.406l-2.424,2.424c-4.298,4.298-11.291,4.299-15.59,0l-8.806-8.819 C432.544,142.869,432.544,135.875,436.847,131.572z M176.783,228.452c46.642-36.441,111.792-36.444,158.435,0l44.025,34.395 H132.749L176.783,228.452z M61.305,387.919V327.41h244.498c6.765,0,12.249-5.485,12.249-12.249s-5.484-12.249-12.249-12.249 H61.305v-15.568H97.17h317.648h35.865v15.568H403.39c-6.765,0-12.249,5.485-12.249,12.249s5.484,12.249,12.249,12.249h47.293 v60.509H61.305z"/></g></g></svg>'
        };
      }

    render() {
        const rootNode = document.createElement('div')
        const root = ReactDOM.createRoot(rootNode) // lets us render the component using a root

        const onDataChange = (newData) => {
            this.data =
                newData
        }

        const loadFiles = (file) => {
            this.files = file
        }
        
        root.render((
            <SandpackProvider template="react" files={this.files}>
                <Sandpack loadFiles={loadFiles} onDataChange={onDataChange} />
            </SandpackProvider>
        ))

        return rootNode;
    }

    save(blockContent) { // we need the code inside the sandpack element because we can render that ourselves into the example
        return this.data
    }
}

export default Sandbox


//   updateFile: (path: string, newCode: string) => void;
//   updateCurrentFile: (newCode: string) => void;