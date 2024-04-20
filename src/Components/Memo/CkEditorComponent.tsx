import Editor from './build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import { useState } from 'react';

const CKEditorComponent = () => {
    const [text, setText] = useState<string>('');

    const customUploadAdapter = (loader:any) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then( (file:any) => {
                    data.append("name", file.name);
                    data.append("file", file);

                    axios.post('http://jungsonghun.iptime.org:7223/memo/imgupload', data)
                        .then((res:any) => {
                            if(res.data.success){
                                resolve({default: `${res.data.url}`});
                            } 
                        })
                        .catch((err)=>reject(err));
                    })
                })
            }
        }
    }

    function uploadPlugin (editor:any){
        editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
            return customUploadAdapter(loader);
        }
    }

    return(
        <div className='flex flex-row h-full w-[80%]'>
            <CKEditor
                editor={ Editor }
                config={{
                    extraPlugins: [uploadPlugin],
                    placeholder: "내용을 입력하세요.",
                    image: {toolbar: ['imageTextAlternative']},
                    removePlugins: ['MediaEmbed','Link','CodeBlock'],
                }}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setText(data);
                    // console.log( { event, editor, data } );
                } }
                // onReady={ editor => {console.log( 'Editor is ready to use!', editor );}}
                // onBlur={ ( event, editor ) => {console.log( 'Blur.', editor );}}
                // onFocus={ ( event, editor ) => {console.log( 'Focus.', editor );}}
            />

            {/* <div dangerouslySetInnerHTML={{__html : text}} className='w-1/2'/> */}
            {/* <div className='w-1/2'>{text}</div>  */}

        </div>
    );
}

export default CKEditorComponent;