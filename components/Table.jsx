import React from "react";


export default function Table({ data, session, forPublished, forDrafts, forTrash }) {

  const homePage = () => {
    let check = false;
    if(document.location.pathname.includes('admin')) {
      check = true;
      console.log("home page", check)
    }
    return check;
  }

  const articlesPage = () => {
    let check = false;
    if(document.location.pathname.includes('articles')) {
      check = true;
      console.log("articles page", check)
    }
    return check;
  }

  const draftsPage = () => {
    let check = false;
    if(document.location.pathname.includes('drafts')) {
      check = true;
      console.log("drafts page", check)
    }
    return check;
  }

  const trashPage = () => {
    let check = false;
    if(document.location.pathname.includes('trash')){
      check = true;
      console.log("trash page", check, document.location.pathname)
    }
    return check;
  }

  const articles = new Array()
  if (homePage()) {
    data?.articles.map((article) => {
      if (!article.isDeleted)
        articles.push(article)
    })
  }  
  if (articlesPage()) {
    data?.articles.map((article) => {
      if (article.status != "draft" && !article.isDeleted) {
        articles.push(article)
      }
    })
  }
  if (draftsPage()) {
    data?.articles.map((article) => {
      if (article.status == "draft" && !article.isDeleted) {
        articles.push(article)
      }
    })
  }
  if (trashPage()) {
    data?.articles.map((article) => {
      if (article.isDeleted) {
        articles.push(article)
      }
    })
  }

  return (
    <div>
      <table className="table table-fixed border-separate space-y-6 text-sm">
        <thead className="bg-white text-left sticky top-0">
          <tr className="font-bold">
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Categories</th>
            <th className="p-3">Tags</th>
            <th className="p-3">Comments</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            return <tr className="bg-white" key={article._id} >
              <td className="px-4 pt-1 pb-4">{article.title}</td>
              <td className="px-4 pt-1 pb-4">{article.writer}</td>
              <td className="px-4 pt-1 pb-4">{article.category}</td>
              <td className="px-4 pt-1 pb-4 text-padeepBlue">{article.tags.toString()}</td>
              <td className="px-4 pt-1 pb-4">
                {article.comments ? article.comments : <div className="text-center">-</div>}
              </td>
              <td className="px-4 pt-1 pb-4">{article.updatedAt}</td>
              <td className="px-4 pt-1 pb-4">
                {article.status == "draft" ? ( 
                  <div className="flex items-center space-x-2"> 
                    <div className="w-3 h-3 bg-yellowwallow rounded-full"/>
                    <h1>{article.status}</h1>
                  </div>  )
                : article.status == "forApproval" ? ( 
                  <div className="flex items-center space-x-2"> 
                    <div className="w-3 h-3 bg-redtagging rounded-full"/>
                    <h1>pending</h1>
                  </div> )
                : article.status == "approved" ? ( 
                  <div className="flex items-center space-x-2"> 
                    <div className="w-3 h-3 bg-orange rounded-full"/>
                    <h1>{article.status}</h1> 
                  </div> )
                : article.status == "published" && ( 
                  <div className="flex items-center space-x-2"> 
                    <div className="w-3 h-3 bg-degreen rounded-full"/>
                    <h1>{article.status}</h1> 
                  </div> )
                }
              </td>
            </tr>
              
            // {console.log("for published", forPublished)
            // console.log("for drafts", forDrafts)}
            // if (!article.isDeleted) {
            //   {console.log("article not deleted")}
            //   if (forPublished) {
            //     if (article.status != "draft") {
            //       return <tr className="bg-white" key={article._id} >
            //         <td className="px-4 pt-1 pb-4">{article.title}</td>
            //         <td className="px-4 pt-1 pb-4">{article.writer}</td>
            //         <td className="px-4 pt-1 pb-4">{article.category}</td>
            //         <td className="px-4 pt-1 pb-4 text-padeepBlue">
            //           {/* {article.tags.map((tag) => (
            //             <div>{tag} {", "}</div>
            //           ))} */}
            //           {article.tags}
            //         </td>
            //         <td className="px-4 pt-1 pb-4">
            //           {article.comments ? article.comments : <div className="text-center">-</div>}
            //         </td>
            //         <td className="px-4 pt-1 pb-4">{article.updatedAt}</td>
            //         <td className="px-4 pt-1 pb-4">
            //           {article.status == "forApproval"
            //             ? ( 
            //               <div className="flex items-center space-x-2"> 
            //                 <div className="w-3 h-3 bg-redtagging rounded-full"/>
            //                 <h1>pending</h1>
            //               </div> )
            //             : article.status == "approved" 
            //             ? ( 
            //               <div className="flex items-center space-x-2"> 
            //                 <div className="w-3 h-3 bg-orange rounded-full"/>
            //                 <h1>{article.status}</h1> 
            //               </div> )
            //             : article.status == "published" && ( 
            //               <div className="flex items-center space-x-2"> 
            //                 <div className="w-3 h-3 bg-degreen rounded-full"/>
            //                 <h1>{article.status}</h1> 
            //               </div> )
            //           }
            //         </td>
            //       </tr>
            //     }
            //   } else if (forDrafts) {
            //     if (article.status == "draft") {
            //       return <tr className="bg-white" key={article._id} >
            //         <td className="px-4 pt-1 pb-4">{article.title}</td>
            //         <td className="px-4 pt-1 pb-4">{article.writer}</td>
            //         <td className="px-4 pt-1 pb-4">{article.category}</td>
            //         <td className="px-4 pt-1 pb-4 text-padeepBlue">{article.tags.toString()}</td>
            //         <td className="px-4 pt-1 pb-4">
            //           {article.comments ? article.comments : <div className="text-center">-</div>}
            //         </td>
            //         <td className="px-4 pt-1 pb-4">{article.updatedAt}</td>
            //         <td className="px-4 pt-1 pb-4">
            //           <div className="flex items-center space-x-2"> 
            //             <div className="w-3 h-3 bg-yellowwallow rounded-full"/>
            //             <h1>{article.status}</h1>
            //           </div> 
            //         </td>
            //       </tr>
            //     }
            //   } else {
            //     // if (article.status != "published")
            //     return <tr className="bg-white" key={article._id} >
            //         <td className="px-4 pt-1 pb-4">{article.title}</td>
            //         <td className="px-4 pt-1 pb-4">{article.writer}</td>
            //         <td className="px-4 pt-1 pb-4">{article.category}</td>
            //         <td className="px-4 pt-1 pb-4 text-padeepBlue">{article.tags.toString()}</td>
            //         <td className="px-4 pt-1 pb-4">
            //           {article.comments ? article.comments : <div className="text-center">-</div>}
            //         </td>
            //         <td className="px-4 pt-1 pb-4">{article.updatedAt}</td>
            //         <td className="px-4 pt-1 pb-4">
            //         {article.status == "draft" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-yellowwallow rounded-full"/>
            //               <h1>{article.status}</h1>
            //             </div>  )
            //           : article.status == "forApproval" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-redtagging rounded-full"/>
            //               <h1>pending</h1>
            //             </div> )
            //           : article.status == "approved" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-orange rounded-full"/>
            //               <h1>{article.status}</h1> 
            //             </div> )
            //           : article.status == "published" && ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-degreen rounded-full"/>
            //               <h1>{article.status}</h1> 
            //             </div> )
            //           }
            //         </td>
            //       </tr>
            //   }
            // }
            // if (article.isDeleted) {
            //   {console.log("deleted na", article.isDeleted)}
            //   if (forTrash) {
            //     {console.log("ok naman", forPublished, forDrafts)}
            //     return <tr className="bg-white" key={article._id} >
            //         <td className="px-4 pt-1 pb-4">{article.title}</td>
            //         <td className="px-4 pt-1 pb-4">{article.writer}</td>
            //         <td className="px-4 pt-1 pb-4">{article.category}</td>
            //         <td className="px-4 pt-1 pb-4 text-padeepBlue">{article.tags.toString()}</td>
            //         <td className="px-4 pt-1 pb-4">
            //           {article.comments ? article.comments : <div className="text-center">-</div>}
            //         </td>
            //         <td className="px-4 pt-1 pb-4">{article.updatedAt}</td>
            //         <td className="px-4 pt-1 pb-4">
            //         {article.status == "draft" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-yellowwallow rounded-full"/>
            //               <h1>{article.status}</h1>
            //             </div>  )
            //           : article.status == "forApproval" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-redtagging rounded-full"/>
            //               <h1>pending</h1>
            //             </div> )
            //           : article.status == "approved" ? ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-orange rounded-full"/>
            //               <h1>{article.status}</h1> 
            //             </div> )
            //           : article.status == "published" && ( 
            //             <div className="flex items-center space-x-2"> 
            //               <div className="w-3 h-3 bg-degreen rounded-full"/>
            //               <h1>{article.status}</h1> 
            //             </div> )
            //           }
            //         </td>
            //       </tr>
            //   }
            // }
            // forPublished = false
            // forDrafts = false
            // forTrash = false
          })}
        </tbody>
      </table>
    </div>
  )
}
