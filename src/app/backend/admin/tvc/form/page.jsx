"use client";

import { useEffect, useState } from "react";
import { useCategoryForm } from "./contexts/CategoryFormContext";
import { useSearchParams } from "next/navigation";
import { spaceToHyphen } from "@/utils/transformName";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

export default function Page(){
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id');
    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image, setImage,date, setDate,fetchData
    } = useCategoryForm();
    useEffect(() => {
        if(updateCategoryId){
            fetchData(updateCategoryId);
        }
    }, [updateCategoryId]);

    return <main className="w-100">        
        <div className="d-flex w-100 justify-content-between add-categories align-items-center mb-3">
            <h3 className="category-form-title align-items-center">
                {updateCategoryId && <span className="update-text">Update/Delete</span>}
                {!updateCategoryId && <span className="creater-text">Create</span>}
                <div>Media &rarr; TVC and Corporate Film</div>
            </h3>
            <Link href={'/backend/admin/tvc/'}>
                <button className="btn position-relative">Back</button>
            </Link>
        </div>
        <form className="category-form"
            onSubmit={(e) => {
                e.preventDefault();
                if(updateCategoryId){
                    handleUpdate();
                } else {
                    handleCreate();
                }
            }}
        >
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-group">
                <label className="form-label"><strong>Event Name</strong> <span>*</span></label>
                <input type="text" className="form-control" placeholder="Event Name"
                onChange={(e) => {
                    handleData('name', e.target.value)
                }}
                value={data?.name}
                required />
                {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="form-group">
                <label className="form-label"><strong>Event Slug</strong> <span>*</span></label>
                <input type="text" className="form-control" disabled={updateCategoryId} placeholder="Event Slug"
                onChange={(e) => {
                    let slugName = (e.target.value).replace(/[^\w a-zA-Z0-9]/g, '').toLowerCase();
                    handleData('slug', spaceToHyphen(slugName));
                }}
                value={data?.id}
                 required />
            </div>
            <div className="form-group">
                <label className="form-label"><strong>Event Image</strong></label>
                <div className="product-image-wrap">
                    <div className="product-image">
                        {data?.iconURL && <div className="icon-img"><img src={data?.iconURL} className="cat-img" alt="" /></div>}
                        {image && <div className="icon-new-img"><img src={URL.createObjectURL(image)} className="cat-img" alt="" /></div>}             
                    </div>
                    <div className="product-control">
                        <input type="file" accept="image/*" className="form-control" placeholder="Event Image"
                        onChange={(e) => {
                            setImage(e.target.files[0]); 
                        }}
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label"><strong>TVC Film Link (youtube link)</strong> <span>*</span></label>
                <input type="text" className="form-control" placeholder="Event Link"
                onChange={(e) => {
                  handleData('filmLink', e.target.value)
                }}
                value={data?.filmLink}
                 required />
            </div>
            { error && <p className="error">{error}</p> }
            <div className="d-flex two-by-two">
            {!isDone &&
                <button 
                    type="submit" 
                    disabled={isLoading || isDone}
                    className="btn d-block">
                    {isLoading ? "Loading..." : data?.iconURL ? "Update" : "Create"}
                </button>
            }             
            { updateCategoryId && !isDone &&
                <button 
                    onClick={(e) =>{
                        e.preventDefault();
                        // TODO delete
                        handleDelete(updateCategoryId);
                    }}
                    disabled={isLoading || isDone}
                    className="btn d-block">
                    {isLoading ? "Loading..." : "Delete"}
                </button>
            }
            </div>
            {isDone && <p className="isDone">Successfully {updateCategoryId ? "Update" : "Created"} !</p>}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
                <ExportedImage src="/TVC-carousel.webp" className="w-100 h-auto" width={774} height={440} alt="TVC"/>
            </div>
        </div>
        </form>
    </main>
}