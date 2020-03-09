import React, { useState, useMemo, useCallback } from 'react'; //Estudar useCallback
import { Editor, createEditor } from 'slate'; //, Transforms
import isHotkey from 'is-hotkey';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './components/Toolbar';
import Element from './components/Element';
import Leaf from './components/Leaf';

import './global.css';
import { Container } from './App.style';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+\'': 'code' 
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

function App() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const [ value, setValue ] = useState([
    {
      type: 'paragraph',
      children: [
        {text: 'A single line paragraph'},
        {text: '\n\nS.O: Mint 19.3', bold:true}
      ],
    }
  ]);

  function isMarkActive(editor, format){
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  function toggleMark(editor, format){
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }

  return (
    <Container>
      <main>
        <Slate editor={ editor } value={ value } 
          onChange={ value => setValue(value) } 
        >
          <Toolbar editor={ editor }/>
          <div className='divisor'></div>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
            onKeyDown={event => {
              for (const hotkey in HOTKEYS){
                if (isHotkey(hotkey, event)){
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}/>
        </Slate>
      </main>
    </Container>
  );
}

export default App;
