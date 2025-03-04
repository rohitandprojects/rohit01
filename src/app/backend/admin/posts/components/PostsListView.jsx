"use client";

import { usePosts } from "@/app/lib/firebase/post/read";
import { hyphenToSpace } from "@/utils/transformName";
//import { useCategories } from "@/app/lib/firebase/category/read";
import Link from "next/link";


export default function PostsListView({matchCateName}){
    // console.log('matchCateName: '+ matchCateName)
    const { data, error, isLoading } = usePosts();
    
    if (isLoading){
        return <p className="loading">Loading...</p>
    }
    if (error){
        return <p className="loading error">Loading...</p>
    }
    if (!data){
        return <p className="loading error">Data not found!</p>
    }
    return <table className="table">
            <thead>
            <tr>
                <th>Sr.</th>
                <th>Product</th>
                <th>Product Title</th>
                <th>Slug(URL)</th>
                <th>Category</th>
                <th>Slogan</th>
                <th className="icon-th">Icons</th>
                <th className="packaging">Packaging</th>
                <th className="ingredients">Ingredients</th>
                <th className="expiry">Expiry</th>
                <th className="last-title-and-description">Last Title</th>
                <th className="pro-link">Link</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
        {
            data?.map((item, key) => {
                return <tr data-key={item?.id} key={item?.id}>
                    <td>{key + 1}</td>
                    <td>
                        <div className="product-imgs"><img src={item?.productURL} width="300" height="300" alt={item?.name}/></div>
                        <div className="w-100 timestamp-div">
                            <p>Created Date</p>
                            <p>{item?.timestamp.toDate().toLocaleDateString('en-US', {day:'2-digit', month:'2-digit', year:'numeric'})}</p>
                            <p>{item?.timestamp.toDate().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',second:'2-digit'})}</p>
                        </div>
                    </td>
                    <td>{item?.name}</td>
                    <td>{item?.slug}</td>
                    <td className="catename-slug">
                        {matchCateName?.map((cateName, key) => {
                            return <>{(cateName?.id == item?.categoryId) && <p key={cateName?.id}><span>Name:</span><strong>{cateName?.name}</strong></p>}</>
                        })}
                        <p><span>id:</span>{item?.categoryId}</p>
                    </td>
                    <td><div className="slogan-wrap"><h5>{item?.slogan1}</h5><h5>{item?.slogan2}</h5> {item?.content && <div dangerouslySetInnerHTML={{__html: item?.content}} className="font10"></div>}</div></td>
                    <td className="icon-th">
                        {(item?.redIconOneURL?.length || item?.redIconTwoURL?.length || item?.redIconThreeURL?.length || item?.redIconFourURL?.length) &&
                        <div className="icon-wrap">
                            {item?.redIconOneURL?.length && <div className="icon-th"><img src={item?.redIconOneURL} width="50" height="50" alt=""/><p>{item?.redIconOneText}</p></div>}
                            {item?.redIconTwoURL?.length && <div className="icon-th"><img src={item?.redIconTwoURL} width="50" height="50" alt=""/><p>{item?.redIconTwoText}</p></div>}
                            {item?.redIconThreeURL?.length && <div className="icon-th"><img src={item?.redIconThreeURL} width="50" height="50" alt=""/><p>{item?.redIconThreeText}</p></div>}
                            {item?.redIconFourURL?.length && <div className="icon-th"><img src={item?.redIconFourURL} width="50" height="50" alt=""/><p>{item?.redIconFourText}</p></div>}
                        </div>
                        }
                    </td>
                    <td className="packaging">
                        {(item?.pouch?.length || item?.box?.length || item?.jar?.length || item?.container?.length) &&
                        <div className="packaging-wrap">
                            <div className="packaging-row">
                                {item?.pouch && item?.pouch.length > 0 && item?.pouch.map((imgSrc,index) => {
                                    const title = hyphenToSpace(imgSrc?.split('.')[0]) || 'pounch ' + index;
                                return <div className="packaging-card" data-key={item?.id+imgSrc+index} key={item?.id+imgSrc+index}><div className="sku-icon"><img src={`/images/sku/${imgSrc}`} alt={title}/></div><h4>{title}</h4></div>
                                })}
                            </div>
                            <div className="packaging-row">
                                {item?.box && item?.box.length > 0 && item?.box.map((imgSrc,index) => {
                                    const title = hyphenToSpace(imgSrc?.split('.')[0]) || 'box ' + index;
                                return <div className="packaging-card" data-key={item?.id+imgSrc+index} key={item?.id+imgSrc+index}><div className="sku-icon"><img src={`/images/sku/${imgSrc}`} alt={title}/></div><h4>{title}</h4></div>
                                })}
                            </div>
                            <div className="packaging-row">
                                {item?.jar && item?.jar.length > 0 && item?.jar.map((imgSrc,index) => {
                                    const title = hyphenToSpace(imgSrc?.split('.')[0]) || 'jar ' + index;
                                return <div className="packaging-card" data-key={item?.id+imgSrc+index} key={item?.id+imgSrc+index}><div className="sku-icon"><img src={`/images/sku/${imgSrc}`} alt={title}/></div><h4>{title}</h4></div>
                                })}
                            </div>
                            <div className="packaging-row">
                                {item?.smallJar && item?.smallJar.length > 0 && item?.smallJar.map((imgSrc,index) => {
                                    const title = hyphenToSpace(imgSrc?.split('.')[0]) || 'small Jar ' + index;
                                return <div className="packaging-card" data-key={item?.id+imgSrc+index} key={item?.id+imgSrc+index}><div className="sku-icon"><img src={`/images/sku/${imgSrc}`} alt={title}/></div><h4>{title}</h4></div>
                                })}
                            </div>
                            <div className="packaging-row packaging-container">
                                {item?.container && item?.container.length > 0 && item?.container.map((imgSrc,index) => {
                                    const title = hyphenToSpace(imgSrc?.split('.')[0]) || 'container ' + index;
                                return <div className="packaging-card" data-key={item?.id+imgSrc+index} key={item?.id+imgSrc+index}><div className="sku-icon"><img src={`/images/sku/${imgSrc}`} alt={title}/></div><h4>{title}</h4></div>
                                })}
                            </div>
                        </div>
                        }
                    </td>
                    <td className="ingredients">
                        {item?.content2 && <div dangerouslySetInnerHTML={{__html: item?.content2}} className="font10"></div>}
                    </td>
                    <td className="expiry">
                    {item?.expiry && <h5>{item?.expiry} Months</h5>}
                    </td>
                    <td className="last-title-and-description"><div className="last-title-width">
                        <h5 className="btmToTp">{item?.SpiceItUpTitle}</h5>
                        {item?.content3 && <div dangerouslySetInnerHTML={{__html: item?.content3}} className="font10"></div>}</div>
                    </td>
                    <th className="pro-link">
                        {item?.buyNow && <Link href={item?.buyNow} target="_blank">buy now</Link>}
                    </th>
                    <td><Link href={`/backend/admin/posts/form?id=${item?.id}`} className="btn">EDIT</Link></td>
                </tr>
            })
        } 
        </tbody>
        </table>
}