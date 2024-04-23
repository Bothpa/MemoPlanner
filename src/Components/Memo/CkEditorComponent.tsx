import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GetMemoApi } from '../../Hooks/GetMemoApi';
import { PutMemoApi } from '../../Hooks/PutMemoApi';
import { useNavigate } from 'react-router-dom';
import ImageButton from '../Button/ImageButton';

const CKEditorComponent = () => {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const [text, setText] = useState<string>('');
    const memoId:number = (Number(url.searchParams.get('memoId')));
    const textRef = useRef(text);
    
    // 메모데이터 불러오기
    useEffect(() => {
        const getMemo = async(id:number) => {
            const Memo = await GetMemoApi(id);
            if(Memo)
            {
                setText(Memo.content);
            }else
            {
                alert("error")
                navigate(-1);
            }
        }
        if(memoId)
        {
            getMemo(memoId);
        }
    },[]);

    //text 최신값 갱신
    useEffect(() => {
        textRef.current = text;
    }, [text]);

    //페이지 이동,종료시 메모 저장하기
    useEffect(() => {
        const PutMemoEvent = async() => {
            if(!memoId || text != ''){
                return;
            }
            console.log("수정요청")
            await PutMemoApi(memoId,textRef.current);
        }

        const handleBeforeUnload = async(e: BeforeUnloadEvent) => {
            e.preventDefault();
            await PutMemoEvent();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            const PutMemoEvent2 = async() => {
                await PutMemoEvent();
            };
            PutMemoEvent2();
        };
    }, []);

    //이미지 업로드
    const customUploadAdapter = (loader:any) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then( (file:any) => {
                    // data.append("name", file.name);
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
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row items-center pl-3 h-[5%] w-full'>
                <ImageButton img="ArrowLeft" func={()=>navigate(-1)}/>
            </div>
            <div className='h-[95%] w-full'>
                <CKEditor
                    editor={ Editor }
                    data={text}
                    config={{
                        extraPlugins: [uploadPlugin],
                        placeholder: "내용을 입력하세요.",
                        image: {toolbar: ['imageTextAlternative']},
                        removePlugins: ['MediaEmbed','Link','CodeBlock','Code'],
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
            </div>
        </div>
    );
}

export default CKEditorComponent;