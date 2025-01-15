import Emails from "@/components/CommonUi/Emails";
import Notes from "@/components/CommonUi/Notes";
import Opportunities from "@/components/CommonUi/Opportunities";
import Quotes from "@/components/CommonUi/Quotes";
import Tasks from "@/components/CommonUi/Tasks";
import {
  clearCompany,
  loadSingleCompany,
} from "@/redux/rtk/features/CRM/company/companySlice";
import { cn } from "@/utils/functions";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";
import CompanyProfile from "./CompanyProfile";
import Contacts from "@/components/CommonUi/Contacts";
import Attachments from "@/components/CommonUi/Attachments";

export default function DetailsCompany() {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { company, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  useEffect(() => {
    dispatch(loadSingleCompany(id));
    return () => {
      clearCompany();
    };
  }, [dispatch, id]);
  const bodyRef = useRef(null);
  const emailRef = useRef(null);
  const noteRef = useRef(null);
  const opportunityRef = useRef(null);
  const attachmentRef = useRef(null);
  const quoteRef = useRef(null);
  const taskRef = useRef(null);
  const contactRef = useRef(null);

  const handleEmailClick = () => {
    const emailElement = emailRef.current;
    const bodyElement = bodyRef.current;
    const offset = emailElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };

  const handleOpportunityClick = () => {
    const opportunityElement = opportunityRef.current;
    const bodyElement = bodyRef.current;
    const offset = opportunityElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  const handleNoteClick = () => {
    const noteElement = noteRef.current;
    const bodyElement = bodyRef.current;
    const offset = noteElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  const handleTaskClick = () => {
    const taskElement = taskRef.current;
    const bodyElement = bodyRef.current;
    const offset = taskElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  const handleQuoteClick = () => {
    const quoteElement = quoteRef.current;
    const bodyElement = bodyRef.current;
    const offset = quoteElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  const handleAttachmentClick = () => {
    const attachmentElement = attachmentRef.current;
    const bodyElement = bodyRef.current;
    const offset = attachmentElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  const handleContactClick = () => {
    const contactElement = contactRef.current;
    const bodyElement = bodyRef.current;
    const offset = contactElement.offsetTop - bodyElement.offsetTop;
    bodyElement.scrollTop = offset;
  };
  return (
    <>
      <div className='relative  w-full h-[calc(100vh-52.8px)] overflow-hidden flex flex-row'>
        <div
          className={`hidden md:flex dark:bg-transparent bg-[#2A2D3E] dark:border-gray-50 border-primary hover:bg-primary  border-2 text-white absolute top-[10px] left-[225px] w-[30px] h-[30px] leading-[30px] rounded-full justify-center items-center z-30 duration-300  ${
            !collapsed
              ? "top-[10px] md:left-[185px] 2xl:left-[225px]"
              : "top-[10px] left-[4px]"
          }`}
        >
          {collapsed ? (
            <RightOutlined
              onClick={() => setCollapsed(!collapsed)}
              className='text-[16px] cursor-pointer'
            />
          ) : (
            <LeftOutlined
              onClick={() => setCollapsed(!collapsed)}
              className='text-[16px] cursor-pointer'
            />
          )}
        </div>
        <div
          className={cn(
            "hidden md:block left-0 top-0 z-10  duration-300 h-screen  w-[200px] 2xl:w-[240px] bg-sideNavBg  text-white select-none",
            { "w-[20px] 2xl:w-[20px]": collapsed }
          )}
        >
          {!collapsed && (
            <div className='flex items-start flex-col gap-1 select-none'>
              <div
                onClick={handleOpportunityClick}
                className='flex gap-3 items-center  mt-12 px-5 py-2 font-semibold'
              >
                Opportunities
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.opportunity?.length}
                </span>
              </div>

              <div
                onClick={handleTaskClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Tasks
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.crmTask?.length}
                </span>
              </div>
              <div
                onClick={handleContactClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Contacts
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.contact?.length}
                </span>
              </div>

              <div
                onClick={handleNoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Notes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.note?.length}
                </span>
              </div>
              <div
                onClick={handleAttachmentClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Attachments
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.attachment?.length}
                </span>
              </div>
              <div
                onClick={handleEmailClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Emails
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.emails?.length}
                </span>
              </div>
              <div
                onClick={handleQuoteClick}
                className='flex gap-3 items-center  px-5 py-2 font-semibold'
              >
                Quotes
                <span className='px-1 bg-teal-700 text-white rounded-full'>
                  {company?.quote?.length}
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          ref={bodyRef}
          className={cn(
            `flex flex-col w-full 2xl:w-[calc(100vw-240px)] md:w-[calc(100vw-200px)] duration-300 p-4 scroll-smooth overflow-y-auto`,
            {
              "md:w-[calc(100vw-20px)] 2xl:w-[calc(100vw-20px)]": collapsed,
            }
          )}
        >
          <CompanyProfile data={company} loading={companyLoading} />
          <CompanyInfo data={company} loading={companyLoading} />
          <div className='flex flex-col gap-4 mt-4'>
            <div ref={opportunityRef}>
              <Opportunities
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>
            <div ref={taskRef}>
              <Tasks
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>

            <div ref={contactRef}>
              <Contacts
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>
            <div ref={noteRef}>
              <Notes
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>
            <div ref={attachmentRef}>
              <Attachments
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>
            <div ref={emailRef}>
              <Emails
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>
            <div ref={quoteRef}>
              <Quotes
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSingleCompany}
              />
            </div>

            
          </div>
           
            {/*
           
          
            <div ref={quoteRef}>
              <Quotes
                data={company}
                loading={companyLoading}
                name={"companyId"}
                singleLoadThunk={loadSinglCompany}
              />
            </div> */}
        </div>
      </div>
    </>
  );
}
