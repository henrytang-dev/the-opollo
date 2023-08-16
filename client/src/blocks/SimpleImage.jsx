import './block.css'
// creating a block tool requires at least two methods, render and save
// render method will create a UI for block to be appended when our tool is selected from toolbox
// save will extract the block's data from that ui
class SimpleImage {

    // configures paste substitutions for tags, files, and aptterns
    // for SimpleImage we need to substitute <img> tags and handle files with image/* MIME-type and handle URLS
    static get pasteConfig() { // this will allow us to work with simple pasting directly into paragraphs rather than needing to use the block
        return {
            tags: ['IMG'], // handle pasteed tags
            files: { // for copy and pasting images and whatnot
                mimeTypes: ['image/*'],
                extensions: ['gif', 'jpg', 'png'] // specifying extentions
            },
            patterns: { // adding ability to create image blocks by pasting an image URL to the empty paragraph
                image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i
            }
        }
    }

    // mechanism for showing saved data; here we will use a constructor to pass data and save it at the property
    constructor ({data, api}) {
        this.api = api
        // this.data = data;
        this.data = { // we want to store image settings here
            url: data.url || '', // will set url to data.url if it exists (truey) or will set to empty if not
            caption: data.caption || '',
            withBorder: data.withBorder !== undefined ? data.withBorder : false,
            withBackground: data.withBackground !== undefined ? data.withBackground : false,
            stretched: data.stretched !== undefined ? data.stretched : false,
        };
        // to improve the view when user pastes url it shows image view
        // by creating this as part of the instance, we are able to access later
        this.wrapper = undefined;
        this.settings = [
            // {
            //   name: 'withBorder',
            //   icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
            // },
            // {
            //   name: 'stretched',
            //   icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
            // },
            // {
            //   name: 'withBackground',
            //   icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`
            // }
          ];
    }

    static get toolbox() {
        return {
          title: 'Image', // when hoverin gover the toolbox icon
          icon: '<svg viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>image-picture</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -99.000000)" fill="#000000"> <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 L368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 L368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 L388,99 Z" id="image-picture" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>'
        };
      }
    
    render() {
        // accesses the wrapper prop of the instance
        this.wrapper = document.createElement('div');        
        this.wrapper.classList.add('simple-image') // lets us add a css class for styling

        // this will allow us to render saved stuff
        const input = document.createElement('input')
        
        // rendering image from saved data to include image and caption
        if (this.data && this.data.url){
            this._createImage(this.data.url, this.data.caption);
            return this.wrapper;
        }
        // // boolean will be evaluated true for any non-empty, non-zero object or array
        // input.value = this.data && this.data.url ? this.data.url : '';
        
        input.placeholder = 'Paste an image URL' // adds placeholder for if empty
        // adding eventlistener to load the url input
        input.addEventListener('paste', (e) => {
            this._createImage(e.clipboardData.getData('text'))
        })

        this.wrapper.appendChild(input); // lets us add input element to the wrapper's div element
        
        return this.wrapper;
    }

    // can we use the method with only one of the parameters
    // underscore is for signifying private method for eadability
    _createImage(url, captionText) { // in this method we will show image and caption elements
        const image = document.createElement('img');
        const caption = document.createElement('input');

        image.src = url; // these are just attributes of the html element
        caption.placeholder = 'Caption...';
        caption.value = captionText || ''; // for loading captionText if it is already there; if not, then will use ''

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(image);
        this.wrapper.appendChild(caption);

        this._acceptTuneView();
    }

    // on saving, Editor.js will pass Block's content to the save method which will implement the logic of which data we should save by our tool; block content is the element returned by render with actual state
    // blockContent is element returned by render
    save(blockContent) {

        const image = blockContent.querySelector('img');
        const caption = blockContent.querySelector('input')

        return Object.assign(this.data, { // saves this info to the data object
            url: image.src !== null ? image.src : '',
            caption: caption.value

        })
        
        // below: we used the input field's value to save to data but now we must use the image source url
        // const input = blockContent.querySelector('input')

        // return {
        //     url: input.value
        // }
    }

    // can create a validate method that accepts the saved Block's data returned by save method and checks for correctness; for example, if there were empty blocks without any user filled data then it will skip the block
    // this validate method specifically checks url of this SimpleImage tool
    validate(savedData) {
        if(!savedData.url.trim()) {
            return false;
        }
        return true;
    }

    // for adding features to the action menu that for example lets you move it up and down
    renderSettings() {
          const wrapper = document.createElement('div');
      
          this.settings.forEach( tune => {
            let button = document.createElement('div');
      
            button.classList.add(this.api.styles.settingsButton);
            button.classList.toggle(this.api.styles.settingsButtonActive, this.data[tune.name]); // if force is false, then token will only be removed, if true, then token will only be added; this.data[tune.name] dynamically accesses property of current object so will deal with saved data
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
                button.classList.toggle(this.api.styles.settingsButtonActive); // toggles style to opposite of whatever it currently is
              })          
            });
      
          return wrapper;
    }

    // click listener to toggle active css modifier and trigger callback
    // has to do with changing the state and passing to data
    _toggleTune(tune) {
        this.data[tune] = !this.data[tune] // setting boolean value to opposite on click this method is called as callback
        this._acceptTuneView() // want to call this on initial image render but also here when a setting is changed
    }

    // for changing the ui view
    // adds specified class corresponding with activated tunes
    _acceptTuneView() {
        this.settings.forEach( (tune) => {
            // on click, the this.data[tune.name] becomes true and so force is true so tune.name is added
            this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]) // square bracket is for dynamically accessing a json object property
            if (tune.name === 'stretched') {
                this.api.blocks.stretchBlock(this.api.blocks.getCurrentBlockIndex(), !!this.data.stretched);
            }
        })
    }

    // handler for tag event
    onPaste(event) {
        switch (event.type) {
            case 'tag':
                const imgTag = event.detail.data;

                this._createImage(imgTag.src);
                break;
            case 'file': // dragging and dropping pasted image files into editor
                const file = event.detail.file;
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                    this._createImage(loadEvent.target.result);
                }

                reader.readAsDataURL(file);
                break;
            case 'pattern':
                const src = event.detail.data;

                this._createImage(src);
                break;
        }
    }
}

// now our tool is ready to be added to the editor configuration object EditorJS in eApp.jsx
export default SimpleImage