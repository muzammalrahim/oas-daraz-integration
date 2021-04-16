import React, { useState, useEffect} from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export function Sliders(){

    return(
        <>
            <div className="card card-custom">
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Sliders</h3>
                    </div>
                </div>                
                <div className="card-body">
                    <div className="row">
                     <button type="button" className="btn btn-info ml-2">Add Slider</button>
                    </div>

                    <form className="form form-label-right mt-10">
                        <div className="row">
                            <div className="form-group col-lg-4">
                                <label>Title</label>
                                    <input type="text" name="title" className="form-control" 
                                    placeholder="Title" />
                            </div>
                            <div className="form-group col-lg-4">
                                <label>Button Title</label>
                                    <input type="text" name="btn_title" className="form-control" 
                                    placeholder="Button Title" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <CKEditor
                            name="description"
                            editor={ClassicEditor}
                            // data={values?.description ? values?.description : ''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                // setFieldValue('description', data);
                            }}
                            />  
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}