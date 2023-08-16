import * as Dom from './utils/dom';
import Caret from './utils/caret';


import './block.css';
import icon from './nested-checklist.svg';


export default class NestedList {
  
  constructor({ data, config, api, readOnly }) {

    this.nodes = {
      wrapper: null,
    };

    this.api = api;
    this.readOnly = readOnly;
    this.config = config;

    this.settings = [
      {
        name: 'none',
        title: this.api.i18n.t('None'),
        icon: '<svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><path d="M 5.819 4.607 L 15.181 4.607 C 16.004 4.607 16.518 5.498 16.107 6.211 C 15.916 6.541 15.563 6.745 15.181 6.745 L 5.82 6.745 C 4.997 6.745 4.483 5.854 4.894 5.142 C 5.085 4.811 5.438 4.607 5.82 4.607 L 5.819 4.607 Z M 5.819 0 L 15.181 0 C 16.004 0 16.518 0.891 16.107 1.604 C 15.916 1.934 15.563 2.138 15.181 2.138 L 5.82 2.138 C 4.997 2.138 4.483 1.247 4.894 0.535 C 5.085 0.204 5.438 0 5.82 0 L 5.819 0 Z M 5.819 9.357 L 15.181 9.357 C 16.004 9.357 16.518 10.248 16.107 10.96 C 15.916 11.291 15.563 11.495 15.181 11.495 L 5.82 11.495 C 4.997 11.47 4.511 10.564 4.944 9.864 C 5.132 9.559 5.462 9.369 5.82 9.358 L 5.819 9.357 Z"></path></svg>',
        default: false,
      },
      {
        name: 'unordered',
        title: this.api.i18n.t('Unordered'),
        icon: '<svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"> <path d="M5.625 4.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm0-4.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm0 9.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm-4.5-5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zm0-4.85a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zm0 9.85a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25z"/></svg>',
        default: false,
      },
      {
        name: 'ordered',
        title: this.api.i18n.t('Ordered'),
        icon: '<svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><path d="M5.819 4.607h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 1 1 0-2.138zm0-4.607h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 1 1 0-2.138zm0 9.357h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 0 1 0-2.137zM1.468 4.155V1.33c-.554.404-.926.606-1.118.606a.338.338 0 0 1-.244-.104A.327.327 0 0 1 0 1.59c0-.107.035-.184.105-.234.07-.05.192-.114.369-.192.264-.118.475-.243.633-.373.158-.13.298-.276.42-.438a3.94 3.94 0 0 1 .238-.298C1.802.019 1.872 0 1.975 0c.115 0 .208.042.277.127.07.085.105.202.105.351v3.556c0 .416-.15.624-.448.624a.421.421 0 0 1-.32-.127c-.08-.085-.121-.21-.121-.376zm-.283 6.664h1.572c.156 0 .275.03.358.091a.294.294 0 0 1 .123.25.323.323 0 0 1-.098.238c-.065.065-.164.097-.296.097H.629a.494.494 0 0 1-.353-.119.372.372 0 0 1-.126-.28c0-.068.027-.16.081-.273a.977.977 0 0 1 .178-.268c.267-.264.507-.49.722-.678.215-.188.368-.312.46-.371.165-.11.302-.222.412-.334.109-.112.192-.226.25-.344a.786.786 0 0 0 .085-.345.6.6 0 0 0-.341-.553.75.75 0 0 0-.345-.08c-.263 0-.47.11-.62.329-.02.029-.054.107-.101.235a.966.966 0 0 1-.16.295c-.059.069-.145.103-.26.103a.348.348 0 0 1-.25-.094.34.34 0 0 1-.099-.258c0-.132.031-.27.093-.413.063-.143.155-.273.279-.39.123-.116.28-.21.47-.282.189-.072.411-.107.666-.107.307 0 .569.045.786.137a1.182 1.182 0 0 1 .618.623 1.18 1.18 0 0 1-.096 1.083 2.03 2.03 0 0 1-.378.457c-.128.11-.344.282-.646.517-.302.235-.509.417-.621.547a1.637 1.637 0 0 0-.148.187z"/></svg>',
        default: true,
      }
    ];


    this.defaultListStyle = 'ordered';

    const initialData = {
      style: this.defaultListStyle,
      items: [],
    };

    this.data = data && Object.keys(data).length ? data : initialData;

    this.caret = new Caret();
  }

  render() {
    this.nodes.wrapper = this.makeListWrapper(this.data.style, [ this.CSS.baseBlock ]);

    // fill with data
    if (this.data.items.length) {
      this.appendItems(this.data.items, this.nodes.wrapper);
    } else {
      this.appendItems([ {
        content: '',
        items: [],
        checked : null
      } ], this.nodes.wrapper);
    }

    if (!this.readOnly) {
      // detect keydown on the last item to escape List
      this.nodes.wrapper.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'Enter':
            this.enterPressed(event);
            break;
          case 'Backspace':
            this.backspace(event);
            break;
          case 'Tab':
            if (event.shiftKey) {
              this.shiftTab(event);
            } else {
              this.addTab(event);
            }
            break;
        }
      }, false);
    }

    return this.nodes.wrapper;
  }

  renderSettings() {
    const wrapper = Dom.make('div', [ this.CSS.settingsWrapper ], {});

    this.settings.forEach((item) => {
      const itemEl = Dom.make('div', this.CSS.settingsButton, {
        innerHTML: item.icon,
      });

      itemEl.addEventListener('click', () => {
        this.listStyle = item.name;

        const buttons = itemEl.parentNode.querySelectorAll('.' + this.CSS.settingsButton);

        Array.from(buttons).forEach((button) =>
          button.classList.remove(this.CSS.settingsButtonActive)
        );

        itemEl.classList.toggle(this.CSS.settingsButtonActive);
      });

      this.api.tooltip.onHover(itemEl, item.title, {
        placement: 'top',
        hidingDelay: 500,
      });

      if (this.data.style === item.name) {
        itemEl.classList.add(this.CSS.settingsButtonActive);
      }

      wrapper.appendChild(itemEl);
    });

    return wrapper;
  }

  appendItems(items, parentItem) {
    items.forEach((item) => {
      const itemEl = this.createItem(item.content, item.items, item.checked);

      parentItem.appendChild(itemEl);
    });
  };

  createItem(content, items = [], checked) {
    // console.log("Creating Item")
    const itemWrapper = Dom.make('li', this.CSS.item);
    const itemBody = Dom.make('div', this.CSS.itemBody);
    const itemCheckedContentWrapper = Dom.make('div', this.CSS.itemCheckedContentWrapper);

    const itemChecked = Dom.make('div', this.CSS.itemChecked);
    if(checked === true){
      itemChecked.classList.add(`itemChecked_true`)
    }
    if(checked === false){
      itemChecked.classList.add(`itemChecked_false`)
    }
    if( (checked === null) || (checked === undefined) ){
      itemChecked.classList.add(`itemChecked_null`)
    }

    if( !((checked == null) || (checked === undefined)) ){
      // if it is not null / undefined
  
    }

    itemChecked.addEventListener("click", (el) => {
      if (!this.readOnly) {
        if(itemChecked.classList.contains('itemChecked_true')){
          itemChecked.classList.remove('itemChecked_true')
          itemChecked.classList.add('itemChecked_false')
          return
        }
        if(itemChecked.classList.contains('itemChecked_false')){
          itemChecked.classList.remove('itemChecked_false')
          itemChecked.classList.add('itemChecked_null')
          return
        }
        if(itemChecked.classList.contains('itemChecked_null')){
          itemChecked.classList.remove('itemChecked_null')
          itemChecked.classList.remove('itemChecked_null_hover') // edge case
          itemChecked.classList.add('itemChecked_true')
          return
        }
      }
    });

    itemChecked.addEventListener("mouseenter", (el) => {
      if (!this.readOnly) {
        if(itemChecked.classList.contains('itemChecked_null')){
          itemChecked.classList.add('itemChecked_null_hover')
        }
      }
    })
    itemChecked.addEventListener("mouseleave", (el) => {
      if (!this.readOnly) {
          itemChecked.classList.remove('itemChecked_null_hover')
      }
    })

    const itemContent = Dom.make('div', this.CSS.itemContent, {
      innerHTML: content,
      contentEditable: !this.readOnly,
    });


    itemCheckedContentWrapper.appendChild(itemChecked);
    itemCheckedContentWrapper.appendChild(itemContent);
    itemBody.appendChild(itemCheckedContentWrapper);
    itemWrapper.appendChild(itemBody);

    if (items && items.length > 0) {
      this.addChildrenList(itemWrapper, items);
    }

    return itemWrapper;
  }

  save() {

    const getItems = (parent) => {
      const children = Array.from(parent.querySelectorAll(`:scope > .${this.CSS.item}`));

      return children.map(el => {
        const subItemsWrapper = el.querySelector(`.${this.CSS.itemChildren}`);
        const content = this.getItemContent(el);
        const checkedClassEl = el.querySelector(`.${this.CSS.itemChecked}`);

        let checked = undefined
        if(checkedClassEl.classList.contains("itemChecked_true")){
          checked = true;
        }
        if(checkedClassEl.classList.contains("itemChecked_false")){
          checked = false
        }
        if(checkedClassEl.classList.contains("itemChecked_null")){
          checked = null
        }

        const subItems = subItemsWrapper ? getItems(subItemsWrapper) : [];
        // console.log(content, " : ", checked)

        return {
          content,
          checked : checked,
          items: subItems,

        };
      });
    };

    return {
      style: this.data.style,
      items: getItems(this.nodes.wrapper)
    };
  }

  addChildrenList(parentItem, items) {
    const itemBody = parentItem.querySelector(`.${this.CSS.itemBody}`);
    const sublistWrapper = this.makeListWrapper(undefined, [ this.CSS.itemChildren ]);

    this.appendItems(items, sublistWrapper);

    itemBody.appendChild(sublistWrapper);
  }

  makeListWrapper(style = this.listStyle, classes = []) {
    const tag = 'ul'; // doesnt matter really, overridden with css

    if(style == "unordered"){
      classes.push(this.CSS.wrapperUnordered);
    }
    if(style == "ordered"){
      classes.push(this.CSS.wrapperOrdered);
    }
    if(style == "none"){
      classes.push(this.CSS.wrapperNone);
    }

    return Dom.make(tag, [this.CSS.wrapper, ...classes]);
  }

  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: 'cdx-nested-list',
      wrapperOrdered: 'cdx-nested-list--ordered',
      wrapperUnordered: 'cdx-nested-list--unordered',
      wrapperNone: 'cdx-nested-list--none',
      item: 'cdx-nested-list__item',
      itemBody: 'cdx-nested-list__item-body',
      itemCheckedContentWrapper: 'cdx-nested-list__item-checkedContentWrapper',
      itemContent: 'cdx-nested-list__item-content',
      itemChecked: 'cdx-nested-list__item-checked',
      itemCheckedIndicator: 'cdx-nested-list__item-checkedIndicator',
      itemChildren: 'cdx-nested-list__item-children',
      settingsWrapper: 'cdx-nested-list__settings',
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
    };
  }

  get listStyle() {
    return this.data.style || this.defaultListStyle;
  }

  set listStyle(style) {

    const lists = Array.from(this.nodes.wrapper.querySelectorAll(`.${this.CSS.wrapper}`));

    lists.push(this.nodes.wrapper);

    lists.forEach(list => {
      list.classList.remove(this.CSS.wrapperUnordered,this.CSS.wrapperOrdered,this.CSS.wrapperNone);
      if(style == "unordered"){
        list.classList.add(this.CSS.wrapperUnordered);
      }
      if(style == "ordered"){
        list.classList.add(this.CSS.wrapperOrdered);
      }
      if(style == "none"){
        list.classList.add(this.CSS.wrapperNone);
      }
      
    });

    this.data.style = style;
  }


  get currentItem() {
    let currentNode = window.getSelection().anchorNode;

    if (currentNode.nodeType !== Node.ELEMENT_NODE) {
      currentNode = currentNode.parentNode;
    }

    return currentNode.closest(`.${this.CSS.item}`);
  }

  enterPressed(event) {
    const currentItem = this.currentItem;

    event.stopPropagation();

    event.preventDefault();

    const isEmpty = this.getItemContent(currentItem).trim().length === 0;
    const isFirstLevelItem = currentItem.parentNode === this.nodes.wrapper;
    const isLastItem = currentItem.nextElementSibling === null;

    if (isFirstLevelItem && isLastItem && isEmpty) {
      this.getOutOfList();

      return;
    } else if (isLastItem && isEmpty) {
      this.unshiftItem();

      return;
    }

    const endingFragment = Caret.extractFragmentFromCaretPositionTillTheEnd();
    const endingHTML = Dom.fragmentToString(endingFragment);
    const itemChildren = currentItem.querySelector(`.${this.CSS.itemChildren}`);

    const itemEl = this.createItem(endingHTML, undefined);

    const childrenExist = itemChildren && Array.from(itemChildren.querySelectorAll(`.${this.CSS.item}`)).length > 0;

    if (childrenExist) {
      itemChildren.prepend(itemEl);
    } else {
      currentItem.after(itemEl);
    }

    this.focusItem(itemEl);
  }

  unshiftItem() {
    const currentItem = this.currentItem;
    const parentItem = currentItem.parentNode.closest(`.${this.CSS.item}`);

    if (!parentItem) {
      return;
    }

    this.caret.save();

    parentItem.after(currentItem);

    this.caret.restore();

    const prevParentChildrenList = parentItem.querySelector(`.${this.CSS.itemChildren}`);
    const isPrevParentChildrenEmpty = prevParentChildrenList.children.length === 0;

    if (isPrevParentChildrenEmpty) {
      prevParentChildrenList.remove();
    }
  }

  getItemContent(item) {
    const contentNode = item.querySelector(`.${this.CSS.itemContent}`);

    if (Dom.isEmpty(contentNode)) {
      return '';
    }

    return contentNode.innerHTML;
  }

  focusItem(item, atStart = true) {
    const itemContent = item.querySelector(`.${this.CSS.itemContent}`);

    Caret.focus(itemContent, atStart);
  }

  getOutOfList() {
    this.currentItem.remove();

    this.api.blocks.insert();
    this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex());
  }

  backspace(event) {

    if (!Caret.isAtStart()) {
      return;
    }

    event.preventDefault();

    const currentItem = this.currentItem;
    const previousItem = currentItem.previousSibling;
    const parentItem = currentItem.parentNode.closest(`.${this.CSS.item}`);

    if (!previousItem && !parentItem) {
      return;
    }

    event.stopPropagation();

    let targetItem;

    if (previousItem) {
      const childrenOfPreviousItem = previousItem.querySelectorAll(`.${this.CSS.item}`);

      targetItem = Array.from(childrenOfPreviousItem).pop() || previousItem;
    } else {
      targetItem = parentItem;
    }

    const endingFragment = Caret.extractFragmentFromCaretPositionTillTheEnd();
    const endingHTML = Dom.fragmentToString(endingFragment);

    const targetItemContent = targetItem.querySelector(`.${this.CSS.itemContent}`);

    Caret.focus(targetItemContent, false);

    this.caret.save();

    targetItemContent.insertAdjacentHTML('beforeend', endingHTML);

    let currentItemSublistItems = currentItem.querySelectorAll(`.${this.CSS.itemChildren} > .${this.CSS.item}`);

    currentItemSublistItems = Array.from(currentItemSublistItems);

    currentItemSublistItems = currentItemSublistItems.filter(node => node.parentNode.closest(`.${this.CSS.item}`) === currentItem);

    currentItemSublistItems.reverse().forEach(item => {

      if (!previousItem) {

        currentItem.after(item);
      } else {

        targetItem.after(item);
      }
    });

    currentItem.remove();

    this.caret.restore();
  }

  addTab(event) {

    event.stopPropagation();

    event.preventDefault();

    const currentItem = this.currentItem;
    const prevItem = currentItem.previousSibling;
    const isFirstChild = !prevItem;

    if (isFirstChild) {
      return;
    }

    const prevItemChildrenList = prevItem.querySelector(`.${this.CSS.itemChildren}`);

    this.caret.save();

    if (prevItemChildrenList) {
      prevItemChildrenList.appendChild(currentItem);
    } else {

      const sublistWrapper = this.makeListWrapper(undefined, [ this.CSS.itemChildren ]);
      const prevItemBody = prevItem.querySelector(`.${this.CSS.itemBody}`);

      sublistWrapper.appendChild(currentItem);
      prevItemBody.appendChild(sublistWrapper);
    }

    this.caret.restore();
  }

  shiftTab(event) {

    event.stopPropagation();

    event.preventDefault();

    this.unshiftItem();
  }

  static joinRecursive(data) {
    return data.items
      .map((item) => `${item.content} ${NestedList.joinRecursive(item)}`)
      .join('');
  }

  static get conversionConfig() {
    return {
      export: (data) => {
        return NestedList.joinRecursive(data);
      },
      import: (content) => {
        return {
          items: [{
            content,
            items: []
          }],
          style: 'unordered'
        };
      }
    };
  }

     static get toolbox() {
      return {
          icon: icon,
          title: 'Checklist',
      };
    }


}