import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsInfo from "./DetailsInfo";
import TaskProfile from "./TaskProfile";
import {
  clearTask,
  loadSingleTask,
} from "@/redux/rtk/features/CRM/task/taskSlice";

export default function TaskDetails({ data }) {
  let { id } = useParams();
  id = id || data?.id;
  const dispatch = useDispatch();
  const { task, loading: taskLoading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(loadSingleTask(id));
    return () => {
      clearTask();
    };
  }, [dispatch, id]);
  return (
    <div className="relative  w-full h-[calc(100vh-52.8px)] overflow-hidden flex flex-row">
      <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-8">
        <TaskProfile data={task} loading={taskLoading} />
        <DetailsInfo data={task} loading={taskLoading} />
      </div>
    </div>
  );
}
