import React, {useMemo} from 'react';
import './index.css';
import {useDropzone} from 'react-dropzone';
import {
    withRouter
  } from 'react-router-dom'


/* POUR LE CSS, SOURCE  = REACT-DROPZONE */
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Import(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone();

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const files = acceptedFiles.map(fichierSelectionne => (
    <li key={fichierSelectionne.name}>
      <b>Fichier sélectionné :</b> {fichierSelectionne.name} ({fichierSelectionne.size} bytes)
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} accept=".json" />
        <p>Dropzone : vous pouvez glisser un fichier JSON ou cliquer dans cette zone afin d'ouvrir le sélecteur.</p>
      </div>
      <ul>{files}</ul>
    </div>
  );
}


export default withRouter(Import);
