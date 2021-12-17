import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getSession, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";
import Header from "@/components/HeaderAdmin";
import Table from "@/components/Table";

import { 
  ClipboardListIcon, 
  ClipboardCheckIcon, 
  DotsCircleHorizontalIcon,
  PencilAltIcon,
  UserCircleIcon,
  TrashIcon,
  PlusSmIcon
} from "@heroicons/react/solid";


//TO DO
//User Dropdown
//Create component
//Table may sariling scrollbar
//Sidebar content (make navbar sticky/cannot scroll)
//loading effect
//responsive

export default function Dashboard(props) {
  const { data: session } = useSession();
  const router = useRouter();

  let mineDraft = 0        //Yellow
  let mineForApproval = 0  //Red
  let mineApproved = 0     //Green
  let minePublished = 0
  let mineDeleted = 0
  let draft = 0        //Yellow
  let forApproval = 0  //Red
  let approved = 0     //Green
  let published = 0

  const getArticles = () => axios.get('/api/articles').then((res) => res.data);
  
  const { data } = useQuery(
    ["articles"],
    getArticles
  );
  
  return (
    <div className="relative min-h-screen flex">
      <div className="bg-padeepBlue w-64 grid grid-rows-3">
        <div className="pt-6">
          <Logo />
        </div>
        <div className="row-span-2">
          <div className="flex justify-center pt-14">
            <Sidebar />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="bg-padeepBlue flex-1 p-3">
        {/* white container */}
        <div className="rounded-l-lg bg-[#e6e6e6] h-full p-7">
          {/* Header */}
          <div className="pb-12">
            {/* <div className="flex justify-end"> */}
            <Header />
          </div>

          <div className="grid grid-cols-8 gap-7">
            {data?.articles.map((article) => {
              if(article.writer == session?.user.name) {
                if(article.status === 'draft')
                  mineDraft++
                if(article.status === 'forApproval')
                  mineForApproval++
                if(article.status === 'approved')
                  mineApproved++
                if(article.status === 'published')
                  minePublished++
                if(article.status === 'deleted')
                  mineDeleted++
              }
            })}

            {/* <div>
              <b>Draft {' '} {mineDraft}</b>
            </div>
            <div>
              <b>For Approval {' '} {mineForApproval}</b>
            </div>
            <div>
              <b>Approved {' '} {mineApproved}</b>
            </div>
            <div>
              <b>Published {' '} {minePublished}</b>
            </div> */}

            {data?.articles.map((article) => {
              if(article.status === 'draft')
                draft++
                if(article.status === 'forApproval')
                forApproval++
                if(article.status === 'approved')
                approved++
                if(article.status === 'published')
                published++
            })}
             
            {/* stats */}
            <div className="font-helvetica bg-[#ffffff] col-span-6 rounded-2xl">
              <div className="p-3">
                <div className="flex items-center grid grid-cols-6">
                  <div>
                    <div className="stats font-mono">
                      {data?.articles ? data?.articles.length : 0}
                    </div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 rounded-l-xl">
                      <ClipboardListIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">All</div> 
                    </div>
                  </div>
  
                  <div>
                    <div className="stats font-mono">{published ? published : 0}</div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 ">
                      <ClipboardCheckIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">Published</div> 
                    </div>
                  </div>
    
                  <div>
                    <div className="stats font-mono">{forApproval ? forApproval : 0}</div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 ">
                      <DotsCircleHorizontalIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">Pending</div> 
                    </div>
                  </div>
    
                  <div>
                    <div className="stats font-mono">{mineDraft ? mineDraft : 0}</div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 ">
                      <PencilAltIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">Drafts</div> 
                    </div>
                  </div>
    
                  <div>
                    <div className="stats font-mono">{minePublished ? minePublished : 0}</div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 ">
                      <UserCircleIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">Mine</div> 
                    </div>
                  </div>
    
                  <div>
                    <div className="stats font-mono">{mineDeleted ? mineDeleted : 0}</div>
                    <div className="flex items-center justify-center bg-yellowwallow space-x-2 py-2 px-5 rounded-r-xl">
                      <TrashIcon className="pointer-events-none w-4 h-4"/>
                      <div className="font-bold">Trash</div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* create component */}
            <div className="w-full bg-[#ffffff] col-span-2 rounded-2xl">
              <div className="p-3 space-y-3">
                <div className="text-right font-bold">
                  <span className="font-helvetiva text-xl block">
                    Good day, bhie!
                  </span>
                  <div>
                    <div>
                      Feeling motivated to inspire 
                    </div>
                    <span className="block">
                      Bernadette and Jonathan today?
                    </span>
                  </div>
                </div>

                <div>
                  <button className="w-full bg-redtagging text-white py-2 px-5 rounded-xl hover:opacity-75 transition duration-700 ease-in-out">
                    <div>create article +</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* table */}
          <div className="bg-white rounded-2xl mt-7">
            <Table/>
            {/* {data?.articles.map((article) => {
              {console.log(article)}
              <div>
                <div>{article.writer}</div>
                <div>{article.category}</div>
                <div>{article.category}</div>
                <div>{article.category}</div>
                <div>{article.updatedAt}</div>
                <div>{article.status}</div>
              </div>
            })} */}
          </div>

        </div>
        {/* white container */}
      </div>
      {/* main*/}
    </div>
  )
}



export async function getServerSideProps(context) {
  
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  } 
    
  return {
    props: { }
  }
}
    