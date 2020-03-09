import React from 'react';
import { Editor } from 'slate'; //, Transforms

import { Container } from './styles';

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  LooksOne,
  LooksTwo,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted
} from '@material-ui/icons';

function Toolbar(props) {
  const editor = props.editor
  function isMarkActive(editor, format){
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  function toggleMark(format) {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
  // onClick={toggleMark('bold')}/>
  return (
    <Container>
      <span > <FormatBold/> </span>
      <span> <FormatItalic/> </span>
      <span> <FormatUnderlined/> </span>
      <span> <Code/> </span>
      <span> <LooksOne/> </span>
      <span> <LooksTwo/> </span>
      <span> <FormatQuote/> </span>
      <span> <FormatListNumbered/> </span>
      <span> <FormatListBulleted/> </span>
    </Container>
  );
}

export default Toolbar;
