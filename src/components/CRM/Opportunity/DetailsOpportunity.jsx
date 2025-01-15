import Attachments from "@/components/CommonUi/Attachments";
import Emails from "@/components/CommonUi/Emails";
import Notes from "@/components/CommonUi/Notes";
import Quotes from "@/components/CommonUi/Quotes";
import Tasks from "@/components/CommonUi/Tasks";
import {
  clearOpportunity,
  loadSingleOpportunity,
} from "@/redux/rtk/features/CRM/opportunity/opportunitySlice";
import { loadAllOpportunityStage } from "@/redux/rtk/features/CRM/opportunityStage/opportunityStageSlice";
import { cn } from "@/utils/functions";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsInfo from "../Contact/DetailsInfo";
import OpportunityProfile from "./OpportunityProfile";
import StageChanger from "./StageChanger";

export default function DetailsCompany() {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { opportunity, loading: opportunityLoading } = useSelector(
    (state) => state.opportunity,
  );
  const { list: opportunityStage } = useSelector(
    (state) => state.opportunityStage,
  );

  useEffect(() => {
    dispatch(loadSingleOpportunity(id));
    dispatch(loadAllOpportunityStage());
    return () => {
      clearOpportunity();
    };
  }, [dispatch, id]);
  const bodyRef = useRef(null);
  const emailRef = useRef(null);
  const noteRef = useRef(null);
  const attachmentRef = useRef(null);
  const quoteRef = useRef(null);
  const taskRef = useRef(null);

  const handleEmailClick = () => {
    const emailElement = emailRef.current;
    const bodyElement = bodyRef.current;
    const offset = emailElement.offsetTop - bodyElement.offsetTop;
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
  return (
    <>
      <div className="relative  w-full h-[calc(100vh-52.8px)] overflow-hidden flex flex-row">
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
              className="text-[16px] cursor-pointer"
            />
          ) : (
            <LeftOutlined
              onClick={() => setCollapsed(!collapsed)}
              className="text-[16px] cursor-pointer"
            />
          )}
        </div>
        <div
          className={cn(
            "hidden md:block left-0 top-0 z-10  duration-300 h-screen  w-[200px] 2xl:w-[240px] bg-sideNavBg  text-white select-none",
            { "w-[20px] 2xl:w-[20px]": collapsed },
          )}
        >
          {!collapsed && (
            <div className="flex items-start flex-col gap-1 select-none">
              <div
                onClick={handleTaskClick}
                className="flex gap-3 items-center mt-12  px-5 py-2 font-semibold"
              >
                Tasks
                <span className="px-1 bg-teal-700 text-white rounded-full">
                  {opportunity?.crmTask?.length}
                </span>
              </div>

              <div
                onClick={handleNoteClick}
                className="flex gap-3 items-center  px-5 py-2 font-semibold"
              >
                Notes
                <span className="px-1 bg-teal-700 text-white rounded-full">
                  {opportunity?.note?.length}
                </span>
              </div>
              <div
                onClick={handleAttachmentClick}
                className="flex gap-3 items-center  px-5 py-2 font-semibold"
              >
                Attachments
                <span className="px-1 bg-teal-700 text-white rounded-full">
                  {opportunity?.attachment?.length}
                </span>
              </div>
              <div
                onClick={handleEmailClick}
                className="flex gap-3 items-center  px-5 py-2 font-semibold"
              >
                Emails
                <span className="px-1 bg-teal-700 text-white rounded-full">
                  {opportunity?.emails?.length}
                </span>
              </div>
              <div
                onClick={handleQuoteClick}
                className="flex gap-3 items-center  px-5 py-2 font-semibold"
              >
                Quotes
                <span className="px-1 bg-teal-700 text-white rounded-full">
                  {opportunity?.quote?.length}
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          ref={bodyRef}
          className={cn(
            `flex flex-col w-full 2xl:w-[calc(100vw-240px)] md:w-[calc(100vw-200px)] duration-300 p-4
            scroll-smooth overflow-y-auto`,
            {
              "md:w-[calc(100vw-20px)] 2xl:w-[calc(100vw-20px)]": collapsed,
            },
          )}
        >
          <StageChanger
            opportunityStage={opportunityStage}
            currentStage={opportunity}
          />
          <OpportunityProfile data={opportunity} loading={opportunityLoading} />
          <DetailsInfo data={opportunity} loading={opportunityLoading} />
          <div className="flex flex-col gap-4 mt-4">
            <div ref={taskRef}>
              <Tasks
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={noteRef} className="">
              <Notes
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={attachmentRef}>
              <Attachments
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>

            <div ref={emailRef}>
              <Emails
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
            <div ref={quoteRef}>
              <Quotes
                data={opportunity}
                loading={opportunityLoading}
                name={"opportunityId"}
                singleLoadThunk={loadSingleOpportunity}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
